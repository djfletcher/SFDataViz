import ReactDOM from 'react-dom';
import React from 'react';
import configureStore from './store/store';
import App from './components/app';

import {requestIntersections} from './actions/intersections_actions';
import turf from 'turf';

window.inside = turf.inside;
window.requestIntersections = requestIntersections;

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  const store = configureStore();
  window.store = store;
  ReactDOM.render(<App store={store} />, root);
});
