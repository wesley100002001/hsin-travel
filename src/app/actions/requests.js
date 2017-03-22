import * as common from './common';
import * as restful from '../lib/restful';

export const FETCH_REQUESTS = 'FETCH_REQUESTS';

export function loadRequestsPage () {
  return dispatch => {
    return new Promise((resolve, reject) => {
      resolve(dispatch(common.startLoading()));
    }).then(response => {
      return new Promise((resolve, reject) => {
        resolve(dispatch(fetchRequests()));
      });
    }).then(response => {
      return new Promise((resolve, reject) => {
        resolve(dispatch(common.finishLoading()));
      });
    }).catch(err => {
      console.log(err);
    });
  };
}

export function fetchRequests () {
  return {
    type: FETCH_REQUESTS,
    payload: restful.getRequests()
      .then(response => {
        return response.payload;
      })
  };
}