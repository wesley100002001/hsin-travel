import { combineReducers } from 'redux';
import { router } from 'redux-ui-router';
import { LOGIN_FAILED, SET_LOGGED_IN, SET_LOGGING } from '../actions/login';
import { FETCH_REQUESTS } from '../actions/requests';
import { ADD_ITEM, ADD_REQUEST } from '../actions/request';
import { ADD_COMMENT, FETCH_CONVERSATION, FETCH_REQUEST, FETCH_GREETINGS,
  FETCH_ORDERS, REMOVE_ACCOMODATION, SWITCH_CHANNEL } from '../actions/discuss';
import { FETCH_HOTELS } from '../actions/itemselect';
import { FETCH_NOTIFICATIONS } from '../actions/navbar';
import { FETCH_ACCO } from '../actions/itemconfirm';

const FULFILLED = '_FULFILLED';
const PENDING = '_PENDING';

function login (state = {}, action) {
  switch (action.type) {
    case SET_LOGGING:
    return action.payload;

    case SET_LOGGED_IN:
    if (!!state.isLogging) {
      delete state.isLogging;
    }
    return state;

    case LOGIN_FAILED:
    return action.payload;

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

function channel (state = 'Taiwan', action) {
  switch (action.type) {
    case SWITCH_CHANNEL:
    return action.payload;

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

    case `${FETCH_CONVERSATION}${FULFILLED}`:
    return action.payload;

    default:
    return state;
  }
}

function requestToBeEdit (state = {}, action) {
  switch (action.type) {
    case `${FETCH_REQUEST}${FULFILLED}`:
    return action.payload;

    case `${REMOVE_ACCOMODATION}${FULFILLED}`:
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

function accomodation (state = {}, action) {
  switch (action.type) {
    case `${FETCH_ACCO}${FULFILLED}`:
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
  accomodation,
  channel,
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
