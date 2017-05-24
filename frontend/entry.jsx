import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/app';

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  ReactDOM.render(<App />, root);
});
