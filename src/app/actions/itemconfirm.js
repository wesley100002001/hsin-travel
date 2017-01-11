import moment from 'moment';
import { fetchRequest } from './discuss';
import * as restful from '../lib/restful';

export const FETCH_ACCO = 'FETCH_ACCO';
export const PATCH_ACCO = 'PATCH_ACCO';

export function fetchAccomodation (accoId) {
  return {
    type: FETCH_ACCO,
    payload: restful.getAccomodation(accoId)
      .then(response => {
        response.date = new Date(response.date);
        return response;
      })
  };
}

export function submitAccomodation (acco, requestId) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      resolve(dispatch(updateAccomodation(acco)));
    }).then(response => {
      // 因為無法在 modal 關掉之後 trigger action 去 fetch request
      // 所以先 fetch
      return new Promise((resolve, reject) => {
        resolve(dispatch(fetchRequest(requestId)));
      });
    }).catch(err => {
      console.log(err);
    });
  };
}

export function updateAccomodation (acco) {
  return {
    type: PATCH_ACCO,
  }
}
