import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

class DataMap extends React.Component {
  constructor(props) {
    super(props);
    this.requestData = this.requestData.bind(this);
    this.convertToGeoJSON = this.convertToGeoJSON.bind(this);
    this.pain = this.paint.bind(this);
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGpmbGV0Y2hlciIsImEiOiJjajMzYzFybjkwMDR3MnFvOXZxZ2V1bmZ1In0.2c-Ohy79yPFGOdmEcLOk7w';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-122.447303, 37.768874],
      zoom: 12
    });

    window.map = this.map;
    this.requestData();
  }

  requestData() {
    this.props.requestCrimes();
  }

  convertToGeoJSON(dataset) {
    return dataset.map(datum => {
      let geoJSON = {};
      geoJSON['type'] = 'Feature';
      geoJSON['geometry'] = {
        'type': 'Point',
        'coordinates': [datum.location.longitude, datum.location.latitude]
      },
      geoJSON['properties'] = datum;
      return geoJSON;
    });
  }

  paint(layer, dataset) {

    this.map.addLayer({
      "id": layer,
      "type": "circle",
      "source": {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": dataset
        }
      },
      "paint": {
        'circle-radius': {
          'base': 1.75,
          'stops': [[12, 3], [22, 180]]
        },
        "circle-color": `#e55e5e`
      }
    });
  }

  render() {
    if (this.map && this.props.crimes.length === 5000) {
      let crimes = this.convertToGeoJSON(this.props.crimes);
      this.paint('crime', crimes);
    }
    return null;
  }
}

export default DataMap;
