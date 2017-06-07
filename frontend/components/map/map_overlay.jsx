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
  let category, list, row;
  list = <ul></ul>;
  for (category in stats) {
    row = <li>`${category}: ${stats[category]}`</li>;
    list.appendChild(row);
  }
  return list;
};

export default mapOverlay;
