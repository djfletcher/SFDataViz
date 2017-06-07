import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import createLayer from './map_layer';
import { getBbox, countCrimes } from './gis_calculations';
import mapOverlay from './map_overlay';

class DataMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statsMemo: {},
      statsDisplayed: {
        neighborhood: '',
        stats: {}
      }
    };
    this.requestData = this.requestData.bind(this);
    this.makeInteractive = this.makeInteractive.bind(this);
    this.addHoverEffects = this.addHoverEffects.bind(this);
    this.addClickEffects = this.addClickEffects.bind(this);
    this.getStats = this.getStats.bind(this);
    this.memoizeStats = this.memoizeStats.bind(this);
    this.updateStatsDisplayed = this.updateStatsDisplayed.bind(this);
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

    this.requestData();
    window.map = this.map;
  }

  componentWillReceiveProps(nextProps) {
    let layer;
    if (nextProps.crimes.length > 5000 && nextProps.crimes.length !== this.props.crimes.length) {
      layer = createLayer('crime', nextProps.crimes);
      this.addLayer(layer);
    }
    if (!$.isEmptyObject(nextProps.neighborhoods) && $.isEmptyObject(this.props.neighborhoods)) {
      layer = createLayer('neighborhood-outlines', nextProps.neighborhoods);
      this.addLayer(layer);
      layer = createLayer('neighborhoods', nextProps.neighborhoods);
      this.addLayer(layer);
      layer = createLayer('neighborhood-fills', nextProps.neighborhoods);
      this.addLayer(layer);
      this.makeInteractive();
    }
  }

  requestData() {
    this.props.requestCrimes();
    this.props.requestNeighborhoods();
  }

  makeInteractive() {
    this.addHoverEffects();
    this.addClickEffects();
  }

  addHoverEffects() {
    // When the user moves their mouse over the neighborhood-fills, update the filter
    // to only show the matching neighborhood, thus making a hover effect.
    this.map.on("mousemove", "neighborhoods", e => {
      this.map.setFilter("neighborhood-fills", ["==", "name", e.features[0].properties.name]);
      this.map.getCanvas().style.cursor = 'pointer';
    });

    // Reset the neighborhoods's filter when the mouse leaves the layer.
    this.map.on("mouseleave", "neighborhoods", () => {
      this.map.setFilter("neighborhood-fills", ["==", "name", ""]);
      this.map.getCanvas().style.cursor = '';
    });
  }

  addClickEffects() {
    let name, bbox, stats;
    // Get bounding box of neighborhood clicked, compile stats on that neighborhood,
    // and then center map over it
    this.map.on("click", "neighborhoods", e => {
      name = e.features[0].properties.name;
      bbox = getBbox(this.props.neighborhoods[name]);
      this.map.fitBounds(bbox, { padding: 10 });
      this.getStats(name);
    });
  }

  getStats(name) {
    let stats = this.state.statsMemo[name];
    if (!stats) {
      stats = this.memoizeStats(name);
    }
    this.updateStatsDisplayed(name, stats);
  }

  memoizeStats(name) {
    // memoize the stats for this neighborhood for rapid retrieval next time it is clicked
    let stats, statsMemo;
    stats = countCrimes(
      this.props.crimes,
      this.props.neighborhoods[name]
    );
    statsMemo = this.state.statsMemo;
    statsMemo[name] = stats;
    this.setState({ statsMemo });
  }

  updateStatsDisplayed(name, stats) {
    this.setState({
      statsDisplayed: { name, stats }
    });
  }

  addLayer(layer) {
    // second argument to addLayer is a layer on the map beneath which to insert the new layer
    // this ensures that our custom layers don't cover up street names and map labels
    let beneathLayer = this.map.getStyle().layers[110].id;
    this.map.addLayer(layer, beneathLayer);
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
          id="crime"
          className="active"
          onClick={ () => this.handleToggle('crime') }>Crime
        </li>
        <li
          id="neighborhood-outlines"
          className="active"
          onClick={ () => this.handleToggle('neighborhood-outlines') }>Neighborhoods
        </li>
      </ul>
    );

    const overlay = mapOverlay();

    return (
      <div>
        toggleableLayers;
        mapOverlay();
      </div>
    );
  }
}

export default DataMap;
