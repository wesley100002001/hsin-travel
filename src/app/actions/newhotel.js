import * as restful from '../lib/restful';

import { FETCH_HOTELS } from './hotels';

export const CLEAR_SUBMIT_HOTEL_STATUS = 'CLEAR_SUBMIT_HOTEL_STATUS';
export const SUCCEED_SUBMIT_HOTEL = 'SUCCEED_SUBMIT_HOTEL';
export const FAIL_SUBMIT_HOTEL = 'FAIL_SUBMIT_HOTEL';

export function fetchHotels () {
  return {
    type: FETCH_HOTELS,
    payload: restful.getHotels()
      .then(response => {
        return response.payload;
      })
  };
}

function succeedSubmitHotel () {
  return {
    type: SUCCEED_SUBMIT_HOTEL,
    payload: 'success'
  };
}

function failSubmitHotel () {
  return {
    type: FAIL_SUBMIT_HOTEL,
    payload: 'fail'
  };
}

export function clearStatus () {
  return {
    type: CLEAR_SUBMIT_HOTEL_STATUS,
    payload: null
  };
}

export function submitHotel (hotel) {
  return dispatch => {
    return restful.postHotel(hotel)
    .then(response => {
      if (response.statusCode >= 400) {
        throw response;
      }
      Promise.all([
        dispatch(succeedSubmitHotel()),
        dispatch(fetchHotels())
      ]);
    }).catch(err => {
      dispatch(failSubmitHotel());
      console.log(err);
    });
  }
}

export function removeHotel (hotelId) {
  return dispatch => {
    return restful.deleteHotel(hotelId)
    .then(response => {
      if (response.statusCode >= 400) {
        throw response;
      }
      dispatch(fetchHotels());
    }).catch(err => {
      console.log(err);
    });
  }
}