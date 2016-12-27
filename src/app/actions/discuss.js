require('es6-promise').polyfill();
import * as restful from '../lib/restful';

export const ADD_COMMENT = 'ADD_COMMENT';
export const LOAD_REQUEST = 'LOAD_REQUEST';
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_GREETINGS = 'FETCH_GREETINGS';
// export const REMOVE_HOTEL = 'REMOVE_HOTEL';

export function addComment (comment) {
  return {
    type: ADD_COMMENT,
    payload: new Promise(function (resolve, reject) {
      resolve(comment);
    })
  };
}

export function fetchRequest (requestId) {
  return {
    type: FETCH_REQUEST,
    payload: restful.getMockRequest(requestId)
      .then(function (response) {
        return response;
      })
  };
}

export function fetchGreetings () {
  return{
    type: FETCH_GREETINGS,
    payload: restful.getGreetings()
      .then(response => {
        return response;
      })
  }
}

// export function removeHotel (hotel) {
//   return {
//     type: REMOVE_HOTEL,
//     hotel: hotel
//   };
// }
