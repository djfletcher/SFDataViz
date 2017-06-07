import turf from 'turf';

export function getBbox(feature) {
  let coords = turf.bbox(feature);
  return [[coords[0], coords[1]], [coords[2], coords[3]]];
}

export function countCrimes(crimes, boundaries, neighborhood, memoizeStats, updateStatsDisplayed) {
  let stats = {};
  crimes.forEach(crime => {
    if (turf.inside(crime, boundaries)) {
      let crimeType = crime.properties.category;
      stats[crimeType] = stats[crimeType] + 1 || 1;
    }
  });

  memoizeStats(neighborhood, stats);
  updateStatsDisplayed(neighborhood, stats);
  
  return stats;
}

export function findDuplicateCrimes(crimes, hoods) {
  let tr = crimes.filter(c => turf.inside(c, hoods['Treasure Island']));
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
