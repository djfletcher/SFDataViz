import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/app';
import { fetchCrimes } from './util/crimes_api_util';

window.fetchCrimes = fetchCrimes;

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  ReactDOM.render(<App />, root);
});
