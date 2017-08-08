let roads = JSON.parse('./san-francisco_california_roads.js');
// import * as roads from './san-francisco_california_roads.geojson';
// roads['features'].slice(0, 3).forEach(road => console.log(road));

// import {roads} from './san-francisco_california_roads.js';
roads["features"].slice(0, 3).forEach(road => console.log(road));
