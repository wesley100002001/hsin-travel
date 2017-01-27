import { combineReducers } from 'redux';
import { router } from 'redux-ui-router';
import { LOGIN_FAILED, SET_LOGGED_IN, SET_LOGGING } from '../actions/login';
import { FETCH_REQUESTS } from '../actions/requests';
import { ADD_ITEM, ADD_REQUEST } from '../actions/request';
import { ADD_JP_COMMENT, ADD_TW_COMMENT, FETCH_JP_CONVERSATION, FETCH_TW_CONVERSATION, FETCH_REQUEST,
  FETCH_GREETINGS, FETCH_ORDERS, REMOVE_ACCOMODATION, SWITCH_CHANNEL,
  ON_EDIT_TITLE, OFF_EDIT_TITLE, ON_EDIT_PEOPLE, OFF_EDIT_PEOPLE, UNDO_PEOPLE, UNDO_TITLE, SET_TEMP_TITLE, SET_TEMP_PEOPLE, UPDATE_TITLE, UPDATE_PEOPLE } from '../actions/discuss';
import { FETCH_HOTELS } from '../actions/itemselect';
import { FETCH_NOTIFICATIONS } from '../actions/navbar';
import { CREATE_ACCO, FETCH_ACCO, FETCH_HOTEL, PATCH_ACCO } from '../actions/itemconfirm';

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

function channel (state = 'Japan', action) {
  switch (action.type) {
    case SWITCH_CHANNEL:
    return action.payload;

    default:
    return state;
  }
}

function discuss (state = { taiwan: [], japan: []}, action) {
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

    default:
    return state;
  }
}

function titleEditable (state = false, action) {
  switch (action.type) {
    case ON_EDIT_TITLE:
    return action.payload;

    case OFF_EDIT_TITLE:
    return action.payload;

    default:
    return state;
  }
}

function peopleEditable (state = false, action) {
  switch (action.type) {
    case ON_EDIT_PEOPLE:
    return action.payload;

    case OFF_EDIT_PEOPLE:
    return action.payload;

    default:
    return state;
  }
}

function tempTitle (state = null, action) {
  switch (action.type) {
    case SET_TEMP_TITLE:
    return action.payload;

    default:
    return state;
  }
}

function tempPeople (state = null, action) {
  switch (action.type) {
    case SET_TEMP_PEOPLE:
    return action.payload;

    default:
    return state;
  }
}

function requestToBeEdit (state = {}, action) {
  switch (action.type) {
    case `${FETCH_REQUEST}${FULFILLED}`:
    return action.payload;

    case REMOVE_ACCOMODATION:
    return Object.assign({}, state, {
      accomodation: [
        ...state.accomodation.slice(0, action.payload),
        ...state.accomodation.slice(action.payload + 1)
      ]
    });

    case UNDO_TITLE:
    return Object.assign({}, state, {
      title: action.payload
    });

    case UNDO_PEOPLE:
    return Object.assign({}, state, {
      people: action.payload
    });

    case UPDATE_TITLE:
    return Object.assign({}, state, {
      title: action.payload
    });

    case UPDATE_PEOPLE:
    return Object.assign({}, state, {
      people: action.payload
    });

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
    case CREATE_ACCO:
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

function accoEdit_Hotel (state = {}, action) {
  switch (action.type) {
    case `${FETCH_HOTEL}${FULFILLED}`:
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

function new_accomodation (state = {}, action) {
  switch (action.type) {
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
  accoEdit_Hotel,
  accomodation,
  channel,
  discuss,
  greetings,
  itemselect,
  login,
  orders,
  navbar,
  new_accomodation,
  request,
  requests,
  requestToBeEdit,
  router,
  peopleEditable,
  titleEditable,
  tempTitle,
  tempPeople
});

export default appReducer;
