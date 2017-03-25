import * as restful from '../lib/restful';

export const CLEAR_SUBMIT_HOTEL_STATUS = 'CLEAR_SUBMIT_HOTEL_STATUS';
export const SUCCEED_SUBMIT_HOTEL = 'SUCCEED_SUBMIT_HOTEL';
export const FAIL_SUBMIT_HOTEL = 'FAIL_SUBMIT_HOTEL';

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
      dispatch(succeedSubmitHotel());
    }).catch(err => {
      dispatch(failSubmitHotel());
      console.log(err);
    })
  }
}