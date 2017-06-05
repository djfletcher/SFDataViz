export const fetchCrimes = offset => (
  $.ajax({
    url: 'https://data.sfgov.org/resource/9v2m-8wqu.json',
    data: {
      '$select': 'location,date,category',
      '$where': params.join(` OR `),
      '$order': 'date DESC',
      '$offset': offset
    },
    headers: {
      'X-App-Token': appToken
    }
  })
);

// Crimes we care about -- API requires them to be inside single quotes
const violentCrime = [
  "'ARSON'",
  "'ASSAULT'",
  "'BURGLARY'",
  "'DRIVING UNDER THE INFLUENCE'",
  "'DRUG/NARCOTIC'",
  "'KIDNAPPING'",
  "'LARCENY/THEFT'",
  "'PROSTITUTION'",
  "'ROBBERY'",
  "'SEX OFFENSES, FORCIBLE'",
  "'SEX OFFENSES, NON FORCIBLE'",
  "'STOLEN PROPERTY'",
  "'VEHICLE THEFT'",
  "'WEAPON LAWS'"
];

const params = violentCrime.map(category => `category=${category}`);
const appToken = 'Eb5er7pn8pszkiDz2g9g7oQmp';
