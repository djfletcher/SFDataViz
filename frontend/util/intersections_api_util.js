export const fetchIntersections = () => (
  $.ajax({
    url: 'http://localhost:3000/intersections'
  })
);
