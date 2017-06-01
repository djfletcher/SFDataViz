import bbox from '@turf/bbox';

export function getBbox(feature) {
  let coords = bbox(feature);
  return [[coords[0], coords[1]], [coords[2], coords[3]]];
}
