import { combineReducers } from 'redux';
import { router } from 'redux-ui-router';

import * as common from '../lib/common';

import { FINISH_LOADING, START_LOADING } from '../actions/common';
import { LOGIN_FAILED, SET_LOGGED_IN, SET_LOGGING } from '../actions/login';
import { FETCH_REQUESTS } from '../actions/requests';
import { ADD_ITEM, ADD_REQUEST, ADD_JP_COMMENT, ADD_TW_COMMENT, ADD_KNOCKING_ACCO, FETCH_JP_CONVERSATION, FETCH_TW_CONVERSATION, FETCH_REQUEST,
  FETCH_ORDERS, REMOVE_ACCOMMODATION, SWITCH_CHANNEL, CLEAR_REQUEST, VERIFY_CREATED_REQUEST,
  UPDATE_REQUEST, SET_BOUND_TIME_FRAME } from '../actions/request';
import { FETCH_HOTELS } from '../actions/hotels';
import { FETCH_NOTIFICATIONS } from '../actions/navbar';
import { ADD_ACCO, CLEAR_ACCO, FETCH_ACCO, FETCH_FARE, FETCH_HOTEL, FETCH_HOTEL_ROOMS, PATCH_ACCO } from '../actions/hotel';

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

function request (state = { taiwan: [], japan: [], titleEditable: false, peopleEditable: false, tempTitle: null, tempPeople: null, items: [], isCreated: null }, action) {
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

    case `${FETCH_JP_CONVERSATION}${FULFILLED}`:
    return Object.assign({}, state, {
      japan: action.payload
    });

    case `${FETCH_TW_CONVERSATION}${FULFILLED}`:
    return Object.assign({}, state, {
      taiwan: action.payload
    });

    case VERIFY_CREATED_REQUEST:
    return Object.assign({}, state, {
      isCreated: action.payload
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

let appReducer = combineReducers({
  accommodation,
  channel,
  hotel_info,
  hotels,
  isLoading,
  login,
  orders,
  navbar,
  new_accommodation,
  request,
  requests,
  router,
  timeframe,
  tour_package
});

export default appReducer;
