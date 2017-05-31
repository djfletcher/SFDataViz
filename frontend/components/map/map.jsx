import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import createLayer from './map_layer';

class DataMap extends React.Component {
  constructor(props) {
    super(props);
    this.requestData = this.requestData.bind(this);
    this.addHoverEffects = this.addHoverEffects.bind(this);
    this.addLayer = this.addLayer.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGpmbGV0Y2hlciIsImEiOiJjajMzYzFybjkwMDR3MnFvOXZxZ2V1bmZ1In0.2c-Ohy79yPFGOdmEcLOk7w';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/djfletcher/cj369eru100002rpkokn2981h',
      center: [-122.447303, 37.768874],
      zoom: 12,
      // maxBounds: [[-122.565169, 37.693269], [-122.171389, 37.859369]]
      maxBounds: [[-123.255444, 37.291841], [-121.182195, 38.166895]]
    });


    window.map = this.map;
    this.addHoverEffects();
    this.requestData();
  }

  componentWillReceiveProps(nextProps) {
    let layer;
    if (nextProps.crimes.length > 5000 && nextProps.crimes.length !== this.props.crimes.length) {
      layer = createLayer('crime-layer', nextProps.crimes);
      this.addLayer(layer);
      layer = createLayer('filtered-crime-layer', nextProps.crimes);
      this.addLayer(layer);
    }
    if (nextProps.neighborhoods.length > 40 && nextProps.neighborhoods.length !== this.props.neighborhoods.length) {
      layer = createLayer('neighborhoods-layer', nextProps.neighborhoods);
      this.addLayer(layer);
    }
    if (nextProps.evictions.length > 2350 && nextProps.evictions.length !== this.props.evictions.neighborhoods) {
      layer = createLayer('evictions-layer', nextProps.evictions);
      // this.addLayer(layer);
    }
  }

  requestData() {
    this.props.requestCrimes();
    this.props.requestNeighborhoodLines();
    this.props.requestEvictions();
  }

  addHoverEffects() {
    let popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    let title = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      anchor: 'bottom'
    });

    this.map.on('mouseenter', 'crime-layer', e => {
      // Change the cursor style as a UI indicator.
      this.map.getCanvas().style.cursor = 'pointer';

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(e.features[0].geometry.coordinates)
           .setHTML(e.features[0].properties.category)
           .addTo(this.map);
    });

    this.map.on('mouseleave', 'crime-layer', () => {
        this.map.getCanvas().style.cursor = '';
        popup.remove();
        title.remove();
        this.map.setFilter('filtered-crime-layer', ['==', 'category', '']);
    });

    this.map.on('mousemove', 'crime-layer', e => {
      let feature = e.features[0];

      // Query the crime-layer visible in the map. Use the filter
      // param to only collect results that share the same category name.
      let relatedIncidents = this.map.querySourceFeatures('crime-layer', {
        sourceLayer: 'original',
        filter: ['==', 'category', feature.properties.category]
      });

      title.setLngLat(feature.geometry.coordinates)
           .setHTML(feature.properties.category + ' (' + countUniqueFeatures(relatedIncidents, 'idx') + ' found)')
           .addTo(this.map);

      this.map.setFilter('filtered-crime-layer', ['==', 'category', feature.properties.category]);
    });


    function countUniqueFeatures(array, comparatorProperty) {
      let existingFeatureKeys = {};
      // Because features come from tiled vector data, feature geometries may be split
      // or duplicated across tile boundaries and, as a result, features may appear
      // multiple times in query results.
      let uniqueFeatures = array.filter(function(el) {
          if (existingFeatureKeys[el.properties[comparatorProperty]]) {
              return false;
          } else {
              existingFeatureKeys[el.properties[comparatorProperty]] = true;
              return true;
          }
      });

      return uniqueFeatures.length;
    }


  }

  addLayer(layer) {
    // second argument to addLayer is a layer on the map beneath which to insert the new layer
    // this ensures that our custom layers don't cover up street names and map labels
    // let beneathLayer = this.map.getStyle().layers[110].id;
    // this.map.addLayer(layer, beneathLayer);
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
        <li
          id="neighborhoods-layer"
          className="active"
          onClick={ () => this.handleToggle('neighborhoods-layer') }>Neighborhoods
        </li>
      </ul>
    );
    return toggleableLayers;
  }
}

export default DataMap;
