import { combineReducers } from 'redux';
import { router } from 'redux-ui-router';
import { LOGIN, SET_LOGGED_IN } from '../actions/login';
import { FETCH_REQUESTS } from '../actions/requests';
import { ADD_ITEM, ADD_REQUEST } from '../actions/request';
import { ADD_COMMENT, FETCH_REQUEST, FETCH_GREETINGS, FETCH_ORDERS } from '../actions/discuss';
import { FETCH_HOTELS } from '../actions/itemselect';
import { FETCH_NOTIFICATIONS } from '../actions/navbar';

const FULFILLED = '_FULFILLED';
const PENDING = '_PENDING';

function login (state = [], action) {
  switch (action.type) {
    case `${LOGIN}${FULFILLED}`:
    return action.payload;

    case SET_LOGGED_IN:
    return {
      isLoggedIn: action.isLoggedIn,
      username: action.username,
      token: action.token
    };

    default:
    return state;
  }
}

function orders (state = [], action) {
  switch (action.type) {
    case `${FETCH_ORDERS}${FULFILLED}`:
    return [
      ...state,
      action.payload
    ];

    default:
    return state;
  }
}

function greetings (state = [], action) {
  switch (action.type) {
    case `${FETCH_GREETINGS}${FULFILLED}`:
    return [
      ...state,
      action.payload
    ];

    default:
    return state;
  }
}

function discuss (state = [], action) {
  switch (action.type) {
    case `${ADD_COMMENT}${FULFILLED}`:
    return [
      ...state,
      action.payload
    ];

    default:
    return state;
  }
}

function requestToBeEdit (state = {}, action) {
  switch (action.type) {
    case `${FETCH_REQUEST}${FULFILLED}`:
    return action.payload;

    default:
    return state;
  }
}

function requests (state = [], action) {
  switch (action.type) {
    case `${FETCH_REQUESTS}${FULFILLED}`:
    return action.payload;

    case ADD_REQUEST:
    var req = action.req;
    return [
      ...state,
        req
    ];

    default:
    return state;
  }
}

function request (state = [], action) {
  switch (action.type) {
    case ADD_ITEM:
    let payload = action.payload;
    return [
      ...state,
        payload
    ];

    default:
    return state;
  }
}

function itemselect (state = [], action) {
  switch (action.type) {
    case FETCH_HOTELS:
    return action.payload;

    case `${FETCH_HOTELS}${FULFILLED}`:
    return action.payload;

    default:
    return state;
  }
}

function navbar (state = [], action) {
  switch (action.type) {
    case `${FETCH_NOTIFICATIONS}${FULFILLED}`:
    return action.payload;

    default:
    return state;
  }
}

let appReducer = combineReducers({
  discuss,
  greetings,
  itemselect,
  login,
  orders,
  navbar,
  request,
  requests,
  requestToBeEdit,
  router
});

export default appReducer;
