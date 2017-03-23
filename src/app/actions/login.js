require('es6-promise').polyfill();
import * as restful from '../lib/restful';
import { stateGo } from 'redux-ui-router';

export const LOGIN_FAILED = 'LOGIN_FAILED';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_LOGGING = 'SET_LOGGING';

export function setLoggedIn (loginItem) {
  localStorage.setItem('token', loginItem.token);
  localStorage.setItem('username', loginItem.username);
  localStorage.setItem('region', loginItem.region);
  localStorage.setItem('scope', JSON.stringify(loginItem.scope));
  return {
    type: SET_LOGGED_IN
  };
}

export function setLogging () {
  return {
    type: SET_LOGGING,
    payload: {
      isLogging: true
    }
  };
}

export function setLoginFail () {
  return {
    type: LOGIN_FAILED,
    payload: {
      failed: true
    }
  };
}

export function login (username, password) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      resolve(dispatch(setLogging()));
    }).then(response => {
      return restful.postUserAuth(username, password);
    }).then(response => {
      console.log(response);
      if (!!response.id_token) {
        Promise.all([
          dispatch(setLoggedIn({
            username: username,
            token: response.id_token,
            region: response.region,
            scope: response.scope
          })),
          dispatch(stateGo('requests'))
        ]);
      }
    }).catch(err => {
      dispatch(setLoginFail());
    });
  };
}
