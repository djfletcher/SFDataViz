import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

class DataMap extends React.Component {
  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGpmbGV0Y2hlciIsImEiOiJjajMzYzFybjkwMDR3MnFvOXZxZ2V1bmZ1In0.2c-Ohy79yPFGOdmEcLOk7w';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-122.447303, 37.753574],
      zoom: 12
    });
  }

  render() {
    return null;
  }
}

export default DataMap;
