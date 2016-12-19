import * as restful from '../lib/restful';

export const FETCH_HOTELS = 'FETCH_HOTELS';

export function fetchHotels () {
  return {
    type: FETCH_HOTELS,
    payload: restful.getMockHotels()
      .then(function (response) {
        return response;
      })
  };
}
