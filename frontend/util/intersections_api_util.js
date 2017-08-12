export const fetchIntersections = offset => (
  $.ajax({
    // url: 'http://localhost:3000/intersections',
    url: 'http://road-network-api.herokuapp.com/intersections',
    data: {
      '$offset': offset
    }
  })
);
