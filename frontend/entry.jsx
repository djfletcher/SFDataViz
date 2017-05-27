import ReactDOM from 'react-dom';
import React from 'react';
import configureStore from './store/store';
import App from './components/app';

import {requestEvictions} from './actions/evictions_actions';

window.requestEvictions = requestEvictions;

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  const store = configureStore();
  window.store = store;
  ReactDOM.render(<App store={store} />, root);
});
