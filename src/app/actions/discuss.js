require('es6-promise').polyfill();
import * as restful from '../lib/restful';

export const ADD_COMMENT = 'ADD_COMMENT';
export const LOAD_REQUEST = 'LOAD_REQUEST';
export const FETCH_CONVERSATION = 'FETCH_CONVERSATION';
export const FETCH_GREETINGS = 'FETCH_GREETINGS';
export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const ON_EDIT_TITLE = 'ON_EDIT_TITLE';
export const OFF_EDIT_TITLE = 'OFF_EDIT_TITLE';
export const ON_EDIT_PEOPLE = 'ON_EDIT_PEOPLE';
export const OFF_EDIT_PEOPLE = 'OFF_EDIT_PEOPLE';
export const REMOVE_ACCOMODATION = 'REMOVE_ACCOMODATION';
export const SWITCH_CHANNEL = 'SWITCH_CHANNEL';

export function fetchOrders (token) {
  return {
    type: FETCH_ORDERS,
    payload: restful.getOrders(token)
      .then(response => {
        return response;
      })
  }
}

export function addComment (comment) {
  return {
    type: ADD_COMMENT,
    payload: new Promise((resolve, reject) => {
      resolve(comment);
    })
  };
}

export function fetchRequest (requestId) {
  return {
    type: FETCH_REQUEST,
    payload: restful.getMockRequest(requestId)
      .then(response => {
        return response;
      })
  };
}

export function fetchGreetings () {
  return {
    type: FETCH_GREETINGS,
    payload: restful.getGreetings()
      .then(response => {
        return response;
      })
  }
}

// FIXME: It's a mock now
export function removeAccomodation (hotel) {
  return {
    type: REMOVE_ACCOMODATION,
    payload: restful.getMockRequest(0)
      .then(response => {
        response.accomodation = response.accomodation.slice(1);
        return response;
      })
  };
}

export function fetchConversation (requestId) {
  return {
    type: FETCH_CONVERSATION,
    payload: restful.getMockConversation(requestId)
      .then(response => {
        return response;
      })
  };
}

export function switchChannel (channel) {
  return {
    type: SWITCH_CHANNEL,
    payload: channel
  };
}

export function onEditTitle () {
  return {
    type: ON_EDIT_TITLE,
    payload: true
  };
}

export function offEditTitle () {
  return {
    type: OFF_EDIT_TITLE,
    payload: false
  };
}

export function onEditPeople () {
  return {
    type: ON_EDIT_PEOPLE,
    payload: true
  };
}

export function offEditPeople () {
  return {
    type: OFF_EDIT_PEOPLE,
    payload: false
  };
}
