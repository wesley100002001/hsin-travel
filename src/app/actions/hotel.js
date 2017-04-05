import moment from 'moment';
import { fetchRequest } from './request';
import * as restful from '../lib/restful';

export const ADD_ACCO = 'ADD_ACCO';
export const CLEAR_ACCO = 'CLEAR_ACCO';
export const FETCH_ACCO = 'FETCH_ACCO';
export const FETCH_FARE = 'FETCH_FARE';
export const FETCH_HOTEL = 'FETCH_HOTEL';
export const FETCH_HOTEL_ROOMS = 'FETCH_HOTEL_ROOMS';
export const UPDATE_ACCO = 'UPDATE_ACCO';

export function fetchHotel (hotelId) {
  return {
    type: FETCH_HOTEL,
    payload: restful.getHotel(hotelId)
      .then(response => {
        return response;
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

export function fetchFare (roomId, timeFrame) {
  return {
    type: FETCH_FARE,
    payload: restful.getFare(roomId, timeFrame)
      .then(response => {
        return response;
      })
  };
}

export function submitAccommodation (requestId, acco) {
  return dispatch => {
    return restful.postAccommodation(requestId, acco)
    .then(response => {
      console.log(response);
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

export function updateAccommodation (requestId, accoId, acco) {
  return dispatch => {
    return restful.putAccommodation(requestId, accoId, acco)
    .then(response => {
      dispatch(fetchRequest(requestId));
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

export function createAccommodationRoom (requestId, accoId, room) {
  return dispatch => {
    return restful.postAccommodationRoom(requestId, accoId, room)
    .then(response => {
      dispatch(fetchRequest(requestId));
    }).catch(err => {
      console.log(err);
    })
  };
}

export function removeAccommodationRoom (requestId, accoId, roomId) {
  console.log(roomId);
  return dispatch => {
    return restful.deleteAccommodationRoom(requestId, accoId, roomId)
    .then(response => {
      dispatch(fetchRequest(requestId));
    }).catch(err => {
      console.log(err);
    });
  };
}