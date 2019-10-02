import React, { Component } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { withOAuth } from 'aws-amplify-react';
import aws_exports from './aws-exports';
import logo from './logo.svg';
import './App.css';

Amplify.configure(aws_exports);

const LogOutButton = ({ url, width, height, given_name, family_name, signOut }) => {
    return (<div>
        <button onClick={signOut}>
            <img src={url} height={height} width={width} alt={`${given_name} ${family_name}`} />
            &nbsp; Log Out {given_name}
        </button>
    </div>);
}

class App extends Component {
    constructor(props) {
        super(props);
        this._initialState = {
            authState: 'loading',
            authData: null,
            authError: null,
        };
        this.state = this._initialState;
        this.checkCurrentAuthenticatedUser();
    }

    componentDidMount() {
        this._isMounted = true;
        console.log('on component mount');
        Hub.listen(/.*/, ({ payload }) => {
            const { event, data } = payload;
            console.log(`${event} event received`);
            if (!data) console.log(`error: received auth event ${event} with no data`)
            switch (event) {
                case 'signIn':
                    this.checkCurrentAuthenticatedUser();
                    break;
                case 'signIn_failure':
                    this.setState({ authState: 'signIn', authData: null, authError: data });
                    break;
                default:
                    break;
            }
        });

    }

    componentWillUnmount() {
        this._isMounted = false;
        Hub.remove(/.*/);
    }

    checkCurrentAuthenticatedUser() {
        console.log('looking for existing session');
        return Auth.currentAuthenticatedUser()
            .then(user => {
                if (!this._isMounted) { return; }
                this.setState({
                    authState: 'signedIn',
                    authData: user,
                })
            })
            .catch(error => {
                if (!this._isMounted) { return; }
                this.signOut();
            });
    }

    signOut() {
        Auth.signOut().then(() => {
            this.setState({ authState: 'signIn', authData: null });
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        const { authState, authData } = this.state;
        let content;
        switch (authState) {
            case 'signedIn':
                try {
                    const picture = JSON.parse(authData.attributes.picture);
                    console.log(`picture: ${JSON.stringify(picture, null, 4)}`)
                    const { given_name, family_name } = authData.attributes;
                    content = <LogOutButton signOut={this.signOut} {...picture.data} given_name={given_name} family_name={family_name} />
                } catch (e) {
                    console.error(`Unable to parse JSON picture data: ${authData.attributes.picture}`)
                }
                break;
            case 'signIn':
                content = <button onClick={this.props.OAuthSignIn}>Sign in with Facebook</button>
                break;
            case 'loading':
            default:
                content = <div>Loading...</div>
                break;
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    {content}
                </header>
            </div>
        )
    }
}

export default withOAuth(App);
