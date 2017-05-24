import ReactDOM from 'react-dom';
import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import DataMap from './components/map/map.js';

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  const map = <div id="map"></div>;
  ReactDOM.render(map, root);
  DataMap();
});
