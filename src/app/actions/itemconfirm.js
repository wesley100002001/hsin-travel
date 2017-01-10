import moment from 'moment';
import * as restful from '../lib/restful';

export const FETCH_ACCO = 'FETCH_ACCO';

export function fetchAccomodation (accoId) {
  return {
    type: FETCH_ACCO,
    payload: restful.getAccomodation(accoId)
      .then(function (response) {
        response.date = new Date(response.date);
        return response;
      })
  };
}
