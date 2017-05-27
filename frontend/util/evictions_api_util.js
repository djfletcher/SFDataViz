// fetches eviction notices filed since January 1st, 2016
export const fetchEvictions = offset => (
  $.ajax({
    url: 'https://data.sfgov.org/resource/93gi-sfd2.json',
    data: {
      '$select': columns.join(','),
      '$where': "file_date>'2016-01-01T00:00:00.000'",
      '$order': 'file_date',
      '$offset': offset
    },
    headers: {
      'X-App-Token': appToken
    }
  })
);


const columns = [
  'client_location AS location',
  'file_date',
  'neighborhood',
  'non_payment',
  'breach',
  'nuisance',
  'illegal_use',
  'failure_to_sign_renewal',
  'access_denial',
  'unapproved_subtenant',
  'owner_move_in',
  'demolition',
  'capital_improvement',
  'substantial_rehab',
  'ellis_act_withdrawal',
  'condo_conversion',
  'roommate_same_unit',
  'other_cause',
  'late_payments',
  'lead_remediation',
  'development',
  'good_samaritan_ends'
];

const appToken = 'Eb5er7pn8pszkiDz2g9g7oQmp';
