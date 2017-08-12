export const fetchRoadEdges = offset => (
  $.ajax({
    // url: 'http://localhost:3000/road_edges',
    url: 'http://road-network-api.herokuapp.com/road_edges',
    data: {
      '$offset': offset
    }
  })
);
