This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Get Started
1.  Create your [AWS cloud account](https://console.aws.amazon.com).
1.  Install the AWS NodeJS CLI: `npm i -g @aws-amplify/cli`
1.  Run `amplify configure` to access your account.
1.  Clone this repo.
1.  Run `amplify init` at the root directory of the app to create the backend roles and buckets.
1.  Create a [Facebook developer account](https://developer.facebook.com).
1.  Create a Facebook app, making a note of the App ID and App Secret.
1.  Run `amplify add auth` to configure a User Pool using federated identities (ie, social login), using the App ID and App Secret from the previous step.
1.  Run `amplify push` to instantiate the User Pool and authentication framework in AWS.
1.  Update the Facebook app with a website App URL, of the form `https://yourawsurl.aws.com/oauth2/idpresponse`
1.  Update the Facebook app's App Domain with the domain of the above URL, eg, `https://yourawsurl.aws.com/`
1.  Under Facebook Login Settings, add the URL to the Valid OAuth Redirect URIs, eg, `https://yourawsurl.aws.com/oauth2/idpresponse`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Resources
The foundation for this repo is found in [this](https://aws.amazon.com/blogs/mobile/amplify-framework-simplifies-configuration-for-oauth-flows-the-hosted-ui-and-ar-vr-scenes-for-mobile-and-web-developers/) guide.  Be sure to follow the [instructions](https://aws-amplify.github.io/docs/js/cognito-hosted-ui-federated-identity) which detail the steps needed to a) create the app before adding authentication with `amplify add auth` and b) configure the app in [FB](developer.facebook.com) with the callback URL and app domain.  Failing to complete the latter step will result in the following error:
> Can't Load URL: The domain of this URL isn't included in the app's domains. To be able to load this URL, add all domains and subdomains of your app to the App Domains field in your app settings.

PDF versions of these pages have been added to the docs folder.