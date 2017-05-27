// fetching neighborhood boundary lines
export const fetchNeighborhoods = () => (
  $.ajax({
    url: 'https://data.sfgov.org/resource/xfcw-9evu.json',
    headers: {
      'X-App-Token': appToken
    }
  })
);

const appToken = 'Eb5er7pn8pszkiDz2g9g7oQmp';
