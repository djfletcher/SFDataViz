import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import createLayer from './map_layer';

class DataMap extends React.Component {
  constructor(props) {
    super(props);
    this.requestData = this.requestData.bind(this);
    this.addLayer = this.addLayer.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGpmbGV0Y2hlciIsImEiOiJjajMzYzFybjkwMDR3MnFvOXZxZ2V1bmZ1In0.2c-Ohy79yPFGOdmEcLOk7w';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-122.447303, 37.768874],
      zoom: 12,
      maxBounds: [[-123.25544479306004, 37.29184114161481], [-121.182195956104, 38.16689599206103]]
    });

    window.map = this.map;
    this.requestData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.crimes.length === 6000) {
      let layer = createLayer('crime-layer', nextProps.crimes);
      this.addLayer(layer);
    }
  }

  requestData() {
    this.props.requestCrimes();
  }

  addLayer(layer) {
    this.map.addLayer(layer);
  }

  handleToggle(layerId) {
    let el = document.getElementById(layerId);
    let visibility = this.map.getLayoutProperty(layerId, 'visibility');
    if (visibility === 'visible') {
      this.map.setLayoutProperty(layerId, 'visibility', 'none');
      el.className = '';
    } else {
      this.map.setLayoutProperty(layerId, 'visibility', 'visible');
      el.className = 'active';
    }
  }

  render() {
    const toggleableLayers = (
      <ul className="legend">
        <li
          id="crime-layer"
          className="active"
          onClick={ () => this.handleToggle('crime-layer') }>Crime
        </li>
      </ul>
    );
    return toggleableLayers;
  }
}

export default DataMap;
