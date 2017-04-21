import * as restful from '../lib/restful';

import { FETCH_HOTEL_ROOMS } from './hotel';
import { FETCH_HOTELS } from './hotels';

export const CLEAR_SUBMIT_HOTEL_ROOM_STATUS = 'CLEAR_SUBMIT_HOTEL_ROOM_STATUS';
export const SUCCEED_SUBMIT_HOTEL_ROOM = 'SUCCEED_SUBMIT_HOTEL_ROOM';
export const FAIL_SUBMIT_HOTEL_ROOM = 'FAIL_SUBMIT_HOTEL_ROOM';

export function fetchHotels () {
  return {
    type: FETCH_HOTELS,
    payload: restful.getHotels()
      .then(response => {
        return response.payload;
      })
  };
}

export function fetchHotelRooms (hotelId) {
  return {
    type: FETCH_HOTEL_ROOMS,
    payload: restful.getHotelRooms(hotelId)
      .then(response => {
        return response.payload;
      })
  };
}

function succeedSubmitHotelRoom () {
  return {
    type: SUCCEED_SUBMIT_HOTEL_ROOM,
    payload: 'success'
  };
}

function failSubmitHotelRoom () {
  return {
    type: FAIL_SUBMIT_HOTEL_ROOM,
    payload: 'fail'
  };
}

export function clearStatus () {
  return {
    type: CLEAR_SUBMIT_HOTEL_ROOM_STATUS,
    payload: null
  };
}

export function submitHotelRoom (hotelId, room) {
  return dispatch => {
    return restful.postHotelRoom(hotelId, room)
    .then(response => {
      if (response.statusCode >= 400) {
        throw response;
      }
      dispatch(succeedSubmitHotelRoom());
    }).catch(err => {
      dispatch(failSubmitHotelRoom());
      console.log(err);
    })
  }
}