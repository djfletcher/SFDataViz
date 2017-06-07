const mapOverlay = (neighborhood, crimeStats) => {
  let overlay, title, category, row;
  overlay = document.getElementById('map-overlay');
  title = document.createElement('h1');
  overlay.innerHTML = '';
  title.innerHTML = neighborhood;
  overlay.appendChild(title);
  for (category in crimeStats) {
    row = document.createElement('li');
    row.innerHTML = `${category}: ${crimeStats[category]}`;
    overlay.appendChild(row);
  }
  overlay.style.display = 'block';
  return overlay;
};

export default mapOverlay;
