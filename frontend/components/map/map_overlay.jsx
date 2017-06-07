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
    rows.push(`${category}: ${stats[category]}`);
  }
  return(
    <ul>
      { rows.map((row, idx) => statsListItem(row, idx)) }
    </ul>
  );
};

const statsListItem = (content, idx) => <li key={ `stat-${idx}` }>{ content }</li>;

export default mapOverlay;
