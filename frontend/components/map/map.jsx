import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

class DataMap extends React.Component {
  constructor(props) {
    super(props);
    this.requestData = this.requestData.bind(this);
    this.convertToGeoJSON = this.convertToGeoJSON.bind(this);
    this.addLayer = this.addLayer.bind(this);
    this.paintLayer = this.paintLayer.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.crimes.length === 6000) {
      let crimes = this.convertToGeoJSON(nextProps.crimes);
      let paintProperties = {
        'circle-radius': {
          'base': 1.75,
          'stops': [[12, 3], [22, 180]]
        },
        "circle-color": `#e55e5e`
        // 'circle-color': {
        //   'property': 'category',
        //   'type': 'categorical',
        //   'default': `#e55e5e`,
        //   'stops': [
        //     ['ARSON', 'blue'],
        //     ['ASSAULT', 'yellow'],
        //     ['BURGLARY', 'green'],
        //     ['DRIVING UNDER THE INFLUENCE', 'orange'],
        //     ['DRUG/NARCOTIC', 'white'],
        //     ['KIDNAPPING', 'black'],
        //     ['LARCENY/THEFT', 'purple'],
        //     ['PROSTITUTION', 'blue'],
        //     ['ROBBERY', 'yellow'],
        //     ['SEX OFFENSES, FORCIBLE', 'green'],
        //     ['SEX OFFENSES, NON FORCIBLE', 'orange'],
        //     ['STOLEN PROPERTY', 'white'],
        //     ['VEHICLE THEFT', 'black'],
        //     ['WEAPON LAWS', 'purple']
        //   ]
        // }
      };
      this.addLayer('crime-layer', crimes);
      this.paintLayer('crime-layer', 'paint', paintProperties);
    }
  }

  requestData() {
    this.props.requestCrimes();
  }

  convertToGeoJSON(dataset) {
    return dataset.map(datum => {
      let { category, date, location } = datum;
      let geoJSON = {};
      geoJSON['type'] = 'Feature';
      geoJSON['geometry'] = {
        'type': 'Point',
        'coordinates': [location.longitude, location.latitude]
      },
      geoJSON['properties'] = { category, date };
      return geoJSON;
    });
  }

  addLayer(layerId, dataset) {
    this.map.addLayer({
      "id": layerId,
      "type": "circle",
      "source": {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": dataset
        }
      },
      "layout": {
        "visibility": "visible"
      }
    });
  }

  paintLayer(layerId, property, value) {
    this.map.setPaintProperty(layerId, property, value);
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
