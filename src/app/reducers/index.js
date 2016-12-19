import { combineReducers } from 'redux';
import { FETCH_REQUESTS } from '../actions/requests';
import { ADD_ITEM, ADD_REQUEST } from '../actions/request';
import { ADD_COMMENT, FETCH_REQUEST } from '../actions/discuss';
import { FETCH_HOTELS } from '../actions/itemselect';
import { FETCH_NOTIFICATIONS } from '../actions/navbar';

const FULFILLED = '_FULFILLED';
const PENDING = '_PENDING';

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
  itemselect,
  navbar,
  request,
  requests,
  requestToBeEdit
});

export default appReducer;
