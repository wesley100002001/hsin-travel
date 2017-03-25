import { combineReducers } from 'redux';
import { router } from 'redux-ui-router';

import * as common from '../lib/common';

import { AUTHORIZE_ADD_ASSETS, AUTHORIZE_HANDLE_REQUESTS, AUTHORIZE_ISSUE_REQUESTS, FINISH_LOADING, START_LOADING } from '../actions/common';
import { LOGIN_FAILED, SET_LOGGED_IN, SET_LOGGING } from '../actions/login';
import { FETCH_REQUESTS } from '../actions/requests';
import { ADD_ITEM, ADD_REQUEST, ADD_JP_COMMENT, ADD_TW_COMMENT, ADD_KNOCKING_ACCO, CHANGE_ALERT_STATUS, FETCH_COMMENTS, FETCH_INTERNAL_COMMENTS, FETCH_REQUEST,
  FETCH_ORDERS, REMOVE_ACCOMMODATION, SWITCH_CHANNEL, CLEAR_REQUEST, VERIFY_CREATED_REQUEST,
  UPDATE_REQUEST, SET_BOUND_TIME_FRAME } from '../actions/request';
import { FETCH_HOTELS } from '../actions/hotels';
import { FETCH_NOTIFICATIONS } from '../actions/navbar';
import { ADD_ACCO, CLEAR_ACCO, FETCH_ACCO, FETCH_FARE, FETCH_HOTEL, FETCH_HOTEL_ROOMS, PATCH_ACCO } from '../actions/hotel';
import { CLEAR_SUBMIT_HOTEL_STATUS, SUCCEED_SUBMIT_HOTEL, FAIL_SUBMIT_HOTEL } from '../actions/newhotel';

const FULFILLED = '_FULFILLED';
const PENDING = '_PENDING';

function authority (state = { handleRequests: false, issueRequests: false, addAssets: false }, action) {
  switch (action.type) {
    case AUTHORIZE_HANDLE_REQUESTS:
    return Object.assign({}, state, {
      handleRequests: action.payload
    });

    case AUTHORIZE_ISSUE_REQUESTS:
    return Object.assign({}, state, {
      issueRequests: action.payload
    });

    case AUTHORIZE_ADD_ASSETS:
    return Object.assign({}, state, {
      addAssets: action.payload
    });

    default:
    return state;
  }
}

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

function channel (state = 'Japan', action) {
  switch (action.type) {
    case SWITCH_CHANNEL:
    return action.payload;

    default:
    return state;
  }
}

function new_accommodation (state = [], action) {
  switch (action.type) {
    case ADD_ACCO:
    return [
      ...state,
      action.payload
    ];

    default:
    return state;
  }
}

function request (state = { taiwan: [], japan: [], titleEditable: false, peopleEditable: false, tempTitle: null, tempPeople: null, items: [], isCreated: null, isUpdated: null }, action) {
  switch (action.type) {
    case `${ADD_JP_COMMENT}${FULFILLED}`:
    return Object.assign({}, state, {
      japan: [
        ...state.japan,
        action.payload
      ]
    });

    case `${ADD_TW_COMMENT}${FULFILLED}`:
    return Object.assign({}, state, {
      taiwan: [
        ...state.taiwan,
        action.payload
      ]
    });

    case `${FETCH_COMMENTS}${FULFILLED}`:
    return Object.assign({}, state, {
      japan: action.payload
    });

    case `${FETCH_INTERNAL_COMMENTS}${FULFILLED}`:
    return Object.assign({}, state, {
      taiwan: action.payload
    });

    case VERIFY_CREATED_REQUEST:
    return Object.assign({}, state, {
      isCreated: action.payload
    });

    case CHANGE_ALERT_STATUS:
    return Object.assign({}, state, {
      isUpdated: action.payload
    });

    default:
    return state;
  }
}

function tour_package (state = {}, action) {
  switch (action.type) {
    case `${FETCH_REQUEST}${FULFILLED}`:
    return action.payload;

    case CLEAR_REQUEST:
    return action.payload;

    default:
    return state;
  }
}

function requests (state = [], action) {
  switch (action.type) {
    case `${FETCH_REQUESTS}${FULFILLED}`:
    return action.payload.map(req => {
      return Object.assign({}, req, {
        updatedAt: common.getJPDate(req.updatedAt)
      });
    });

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

function hotels (state = [], action) {
  switch (action.type) {
    case FETCH_HOTELS:
    return action.payload;

    case `${FETCH_HOTELS}${FULFILLED}`:
    return action.payload;

    default:
    return state;
  }
}

function hotel_info (state = {}, action) {
  switch (action.type) {
    case `${FETCH_HOTEL}${FULFILLED}`:
    return Object.assign({}, state, action.payload);

    case `${FETCH_HOTEL_ROOMS}${FULFILLED}`:
    return Object.assign({}, state, {
      rooms: action.payload
    });

    case `${FETCH_FARE}${FULFILLED}`:
    return Object.assign({}, state, {
      fare: action.payload
    });

    default:
    return state;
  }
}

function accommodation (state = {}, action) {
  switch (action.type) {
    case `${FETCH_ACCO}${FULFILLED}`:
    return action.payload;

    default:
    return state;
  }
}

function timeframe (state = {}, action) {
  switch (action.type) {
    case SET_BOUND_TIME_FRAME:
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

function isLoading (state = false, action) {
  switch (action.type) {
    case START_LOADING:
    return action.payload;

    case FINISH_LOADING:
    return action.payload;

    default:
    return state;
  }
}

function newhotelstatus (state = null, action) {
  switch (action.type) {
    case SUCCEED_SUBMIT_HOTEL:
    return action.payload;

    case FAIL_SUBMIT_HOTEL:
    return action.payload;

    case CLEAR_SUBMIT_HOTEL_STATUS:
    return action.payload;

    default:
    return state;
  }
}

let appReducer = combineReducers({
  accommodation,
  authority,
  channel,
  hotel_info,
  hotels,
  isLoading,
  login,
  orders,
  navbar,
  new_accommodation,
  newhotelstatus,
  request,
  requests,
  router,
  timeframe,
  tour_package
});

export default appReducer;
