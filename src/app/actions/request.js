require('es6-promise').polyfill();
import * as restful from '../lib/restful';

export const ADD_JP_COMMENT = 'ADD_JP_COMMENT';
export const ADD_TW_COMMENT = 'ADD_TW_COMMENT';
export const LOAD_REQUEST = 'LOAD_REQUEST';
export const FETCH_JP_CONVERSATION = 'FETCH_JP_CONVERSATION';
export const FETCH_TW_CONVERSATION = 'FETCH_TW_CONVERSATION';
export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const ON_EDIT_TITLE = 'ON_EDIT_TITLE';
export const OFF_EDIT_TITLE = 'OFF_EDIT_TITLE';
export const ON_EDIT_PEOPLE = 'ON_EDIT_PEOPLE';
export const OFF_EDIT_PEOPLE = 'OFF_EDIT_PEOPLE';
export const REMOVE_ACCOMODATION = 'REMOVE_ACCOMODATION';
export const SET_TEMP_PEOPLE = 'SET_TEMP_PEOPLE';
export const SET_TEMP_TITLE = 'SET_TEMP_TITLE';
export const SWITCH_CHANNEL = 'SWITCH_CHANNEL';
export const UNDO_PEOPLE = 'UNDO_PEOPLE';
export const UNDO_TITLE = 'UNDO_TITLE';
export const UPDATE_PEOPLE = 'UPDATE_PEOPLE';
export const UPDATE_TITLE = 'UPDATE_TITLE';

export function fetchOrders (token) {
  return {
    type: FETCH_ORDERS,
    payload: restful.getOrders(token)
      .then(response => {
        return response;
      })
  }
}

export function addTWComment (comment) {
  return {
    type: ADD_TW_COMMENT,
    payload: new Promise((resolve, reject) => {
      resolve(comment);
    })
  };
}

export function addJPComment (comment) {
  return {
    type: ADD_JP_COMMENT,
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

// FIXME: only remove element from state
export function removeAccomodation (accoId, index) {
  return {
    type: REMOVE_ACCOMODATION,
    payload: index
  };
}

export function fetchJPConversation (requestId) {
  return {
    type: FETCH_JP_CONVERSATION,
    payload: restful.getMockJPConversation(requestId)
      .then(response => {
        return response;
      })
  };
}

export function fetchTWConversation (requestId) {
  return {
    type: FETCH_TW_CONVERSATION,
    payload: restful.getMockTWConversation(requestId)
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

export function setTempTitle (title) {
  return {
    type: SET_TEMP_TITLE,
    payload: title
  };
}

export function setTempPeople (people) {
  return {
    type: SET_TEMP_PEOPLE,
    payload: people
  };
}

export function undoTitle (title) {
  return {
    type: UNDO_TITLE,
    payload: title
  };
}

export function undoPeople (people) {
  return {
    type: UNDO_PEOPLE,
    payload: people
  };
}

// FIXME: send restful request
export function updateTitle (title) {
  return {
    type: UPDATE_TITLE,
    payload: title
  };
}

// FIXME: send restful request
export function updatePeople (people) {
  return {
    type: UPDATE_PEOPLE,
    payload: people
  };
}
