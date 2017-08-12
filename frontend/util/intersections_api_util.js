export const fetchIntersections = () => (
  $.ajax({
    url: 'http://road-network-api.herokuapp.com/intersections'
  })
);
