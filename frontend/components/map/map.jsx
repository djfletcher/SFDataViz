import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

class DataMap extends React.Component {
  constructor(props) {
    super(props);
    this.requestData = this.requestData.bind(this);
    this.convertToGeoJSON = this.convertToGeoJSON.bind(this);
    this.paint = this.paint.bind(this);
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
      this.paint('crime', crimes);
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

  paint(layerName, dataset) {
    this.map.addLayer({
      "id": layerName,
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
      },
      "layout": {
        "visibility": "visible"
      }
    });
  }

  handleToggle(layer) {
    let el = document.getElementById(`${layer}-layer`);
    let visibility = this.map.getLayoutProperty(layer, 'visibility');
    if (visibility === 'visible') {
      this.map.setLayoutProperty(layer, 'visibility', 'none');
      el.className = '';
    } else {
      this.map.setLayoutProperty(layer, 'visibility', 'visible');
      el.className = 'active';
    }
  }

  render() {
    const toggleableLayers = (
      <ul className="legend">
        <li
          id="crime-layer"
          className="active"
          onClick={ () => this.handleToggle('crime') }>Crime
        </li>
      </ul>
    );
    return toggleableLayers;
  }
}

export default DataMap;
