import turf from 'turf';

export function getBbox(feature) {
  let coords = turf.bbox(feature);
  return [[coords[0], coords[1]], [coords[2], coords[3]]];
}

export function countCrimes(crimes, neighborhood) {
  let counts = {};
  crimes.forEach((crime, idx) => {
    if (turf.inside(crime, neighborhood)) {
      let crimeType = crime.properties.category;
      counts[crimeType] = counts[crimeType] + 1 || 1;
    }
  });
  return counts;
}

// export function mergeCrimes(hoods, crimes) {
//   let collected, hCollection, cCollection;
//   hCollection = { 'features': hoods };
//   cCollection = { 'features': crimes };
//   console.log('made it here...');
//   collected = turf.collect(hCollection, cCollection, 'category', 'values');
//   console.log('MADE IT OUT YEAH!');
//   console.log(collected);
// }
