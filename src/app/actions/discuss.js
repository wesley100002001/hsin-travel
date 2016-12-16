export const ADD_COMMENT = 'ADD_COMMENT';
export const LOAD_REQUEST = 'LOAD_REQUEST';
// export const REMOVE_HOTEL = 'REMOVE_HOTEL';

export function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment: comment
  };
}

export function loadRequest (loadedRequest) {
  return {
    type: LOAD_REQUEST,
    loadedRequest: loadedRequest
  };
}

// export function removeHotel (hotel) {
//   return {
//     type: REMOVE_HOTEL,
//     hotel: hotel
//   };
// }
