import React from 'react';

const mapOverlay = (neighborhood, stats) => {
  let overlay, title, category, row;
  if (!neighborhood) {
    return <div></div>;
  } else {
    return (
      <div id="map-overlay">
        <h1>{ neighborhood }</h1>
        { statsList(stats) }
      </div>
    );
  }
};

const statsList = stats => {
  let category, rows;
  rows = [];
  for (category in stats) {
    rows.push({ category, counts: stats[category] });
  }
  // sort stats in descending order
  rows.sort((a, b) => b.counts - a.counts);
  
  return(
    <ul id="neighborhood-stats">
      { rows.map((row, idx) => statsListItem(row, idx)) }
    </ul>
  );
};

const statsListItem = (row, idx) => (
  <li key={ `stat-${idx}` }>{ `${row.category}: ${row.counts}` }</li>
);

export default mapOverlay;
