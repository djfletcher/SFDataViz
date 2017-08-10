export const fetchRoadEdges = () => (
  $.ajax({
    url: 'http://localhost:3000/road_edges'
  })
);
