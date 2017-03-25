import * as common from './common';
import * as restful from '../lib/restful';

export const FETCH_NOTIFICATIONS = 'FETCH_NOTIFICATIONS';

export function fetchNotifications () {
  return {
    type: FETCH_NOTIFICATIONS,
    payload: restful.getMockNotification()
      .then(response => {
        return response;
      })
  };
}

export function checkScope (scope) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      resolve(dispatch(common.getAuthority(scope)));
    });
  }
}
