import { combineReducers } from 'redux';
import { CREATE_TEST_REQUEST } from '../actions/requests';
import { ADD_ITEM, ADD_REQUEST } from '../actions/request';

function requests (state = [], action) {
  switch (action.type) {
    case CREATE_TEST_REQUEST:
    var req = action.req;
    return [
      ...state,
        req
    ];

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

let appReducer = combineReducers({
  request,
  requests
});

export default appReducer;
