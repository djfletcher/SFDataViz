import ReactDOM from 'react-dom';
import React from 'react';
import configureStore from './store/store';
import App from './components/app';

// var roads = require('../san-francisco_california_roads.geojson');
import {roads} from '../san-francisco_california_roads.js';
roads["features"].slice(0, 3).forEach(road => console.log(road));


import turf from 'turf';

window.inside = turf.inside;

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  const store = configureStore();
  window.store = store;
  ReactDOM.render(<App store={store} />, root);
});
