import ReactDOM from 'react-dom';
import React from 'react';
import configureStore from './store/store';
import App from './components/app';

import { requestCrimes } from './actions/crime_actions';
import { fetchCrimes } from './util/crime_api_util';

window.requestCrimes = requestCrimes;
window.fetchCrimes = fetchCrimes;

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  const store = configureStore();
  window.store = store;
  ReactDOM.render(<App store={store} />, root);
});
