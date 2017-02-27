import moment from 'moment';
import { fetchRequest } from './request';
import * as restful from '../lib/restful';

export const ADD_ACCO = 'ADD_ACCO';
export const CLEAR_ACCO = 'CLEAR_ACCO';
export const FETCH_ACCO = 'FETCH_ACCO';
export const FETCH_HOTEL = 'FETCH_HOTEL';
export const PATCH_ACCO = 'PATCH_ACCO';

export function fetchHotel (hotelId) {
  return {
    type: FETCH_HOTEL,
    payload: restful.getMockHotel(hotelId)
      .then(response => {
        return response;
      })
  };
}

export function fetchAccommodation (accoId) {
  return {
    type: FETCH_ACCO,
    payload: restful.getAccommodation(accoId)
      .then(response => {
        response.date = new Date(response.date);
        return response;
      })
  };
}

export function submitAccommodation (acco, requestId) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      resolve(dispatch(updateAccommodation(acco)));
    }).then(response => {
      // 因為無法在 modal 關掉之後 trigger action 去 fetch request
      // 所以先 fetch，因為要拿更新過的 request
      return new Promise((resolve, reject) => {
        resolve(dispatch(fetchRequest(requestId)));
      });
    }).catch(err => {
      console.log(err);
    });
  };
}

export function clearAccommodation () {
  return {
    type: CLEAR_ACCO,
    payload: {}
  };
}

export function createAccommodation (acco) {
  return {
    type: ADD_ACCO,
    payload: acco
  };
}

export function updateAccommodation (acco) {
  return {
    type: PATCH_ACCO,
  }
}
