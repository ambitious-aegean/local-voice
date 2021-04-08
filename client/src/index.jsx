import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './components/App.jsx';

ReactDOM.render(
  <Auth0Provider
    domain="dev-t4wdjpaw.us.auth0.com"
    clientId="GAk2feXEjayezDcF1TyHggjnRG6DmdZS"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root'),
);
