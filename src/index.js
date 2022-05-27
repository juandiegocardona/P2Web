import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

// i18n internacionalizacion
import { IntlProvider } from 'react-intl';
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";

let language = window.navigator.language || navigator.browserLanguage;
const selectMessages = language.startsWith('en') ? localeEnMessages : localeEsMessages;

ReactDOM.render(
  <IntlProvider locale={language} messages={selectMessages}>
    <App />
  </IntlProvider>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
reportWebVitals();
