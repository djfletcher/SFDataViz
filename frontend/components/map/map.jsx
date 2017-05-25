import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

class DataMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layers: {
        crime: 0
      }
    };
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.crimes.length !== this.props.crimes.length) {
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

  paint(layer, dataset) {
    this.map.addLayer({
      "id": `${layer}-${this.state.layers[layer]}`,
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

    this.setState({
      layers: {
        [layer]: this.state.layers[layer] + 1
      }
    });
  }

  handleToggle(category) {

  }

  render() {
    const toggleableLayers = (
      <div className="legend-box">
        <h1>Click below to show/hide layers</h1>
        <ul className="legend">
          <li onClick={ () => this.handleToggle('crime') }>Crime</li>
        </ul>
      </div>
    );
    return toggleableLayers;
  }
}

export default DataMap;
