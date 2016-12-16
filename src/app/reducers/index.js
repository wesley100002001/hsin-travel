import { combineReducers } from 'redux';
import { LOAD_REQUESTS } from '../actions/requests';
import { ADD_ITEM, ADD_REQUEST } from '../actions/request';
import { ADD_COMMENT, LOAD_REQUEST } from '../actions/discuss';
import { LOAD_HOTELS } from '../actions/itemselect';
import * as restful from '../lib/restful';

function discuss (state = [], action) {
  switch (action.type) {
    case ADD_COMMENT:
    let comment = action.comment;
    return [
      ...state,
        comment
    ];

    default:
    return state;
  }
}

function requestToBeEdit (state = {}, action) {
  switch (action.type) {
    case LOAD_REQUEST:
    let loadedRequest = action.loadedRequest;
    return loadedRequest;

    default:
    return state;
  }
}

function requests (state = [], action) {
  switch (action.type) {
    case LOAD_REQUESTS:
    let reqs = action.requests;
    return reqs;

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
    case LOAD_HOTELS:
    restful.getMockHotels()
    .then(function (hotels) {
      return hotels;
    }).catch(function (err) {
      console.log(err);
    });
    let hotels = action.hotels;
    return hotels;

    default:
    return state;
  }
}

let appReducer = combineReducers({
  discuss,
  itemselect,
  request,
  requests,
  requestToBeEdit
});

export default appReducer;
