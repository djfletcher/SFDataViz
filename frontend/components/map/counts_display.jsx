const countsDisplay = (neighborhoodName, crimeCounts) => {
  let overlay, title, category, row;
  overlay = document.getElementById('map-overlay');
  title = document.createElement('h1');
  overlay.innerHTML = '';
  title.innerHTML = neighborhoodName;
  overlay.appendChild(title);
  for (category in crimeCounts) {
    row = document.createElement('li');
    row.innerHTML = `${category}: ${crimeCounts[category]}`;
    overlay.appendChild(row);
  }
  overlay.style.display = 'block';
  return overlay;
};

export default countsDisplay;
