require('es6-promise').polyfill();
import * as restful from '../lib/restful';
import { stateGo } from 'redux-ui-router';

export const LOGIN = 'LOGIN';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';

export function setLoggedIn (username, token) {
  return {
    type: SET_LOGGED_IN,
    isLoggedIn: true,
    username: username,
    token: token
  };
}

export function login (username, password) {
  return dispatch => {
    return restful.postUserAuth(username, password)
    .then(response => {
      if (!!response.id_token) {
        Promise.all([
          dispatch(setLoggedIn(username, response.id_token)),
          dispatch(stateGo('requests'))
        ]);
      }
    });
  };
}
