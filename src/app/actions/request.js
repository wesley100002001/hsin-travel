require('es6-promise').polyfill();
import * as restful from '../lib/restful';

export const ADD_JP_COMMENT = 'ADD_JP_COMMENT';
export const ADD_TW_COMMENT = 'ADD_TW_COMMENT';
export const CLEAR_REQUEST = 'CLEAR_REQUEST';
export const FETCH_JP_CONVERSATION = 'FETCH_JP_CONVERSATION';
export const FETCH_TW_CONVERSATION = 'FETCH_TW_CONVERSATION';
export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const REMOVE_ACCOMMODATION = 'REMOVE_ACCOMMODATION';
export const SET_BOUND_TIME_FRAME = 'SET_BOUND_TIME_FRAME';
export const SUBMIT_REQUEST = 'SUBMIT_REQUEST';
export const SWITCH_CHANNEL = 'SWITCH_CHANNEL';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const VERIFY_CREATED_REQUEST = 'VERIFY_CREATED_REQUEST';

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
    payload: restful.getRequest(requestId)
      .then(response => {
        return response;
      })
  };
}

export function clearRequest () {
  return {
    type: CLEAR_REQUEST,
    payload: {}
  };
}

export function submitRequest (req) {
  return dispatch => {
    return restful.postRequest(req)
    .then(response => {
      if (response.statusCode >= 400) {
        throw response;
      }
      dispatch(verifyCreatedRequest('success'));
    }).catch(err => {
      console.log(err);
      dispatch(verifyCreatedRequest('fail'));
    });
  };
}

export function changeAlertStatus (status) {
  return {
    type: CHANGE_ALERT_STATUS,
    payload: status
  };
}

export function verifyCreatedRequest (isCreated) {
  return {
    type: VERIFY_CREATED_REQUEST,
    payload: isCreated
  };
}

export function removeAccommodation (requestId, accoId) {
  return dispatch => {
    return restful.deleteAccommodation(requestId, accoId)
    .then(response => {
      if (response.statusCode >= 400) {
        throw response;
      }
      return new Promise((resolve, reject) => {
        resolve(dispatch(fetchRequest(requestId)));
      });
    // }).then(response => {
    //   dispatch(addJPComment('successfully removed accommodation'));
    }).catch(err => {
      console.log(err);
      // dispatch(verifyCreatedRequest('fail'));
    });
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

export function updateRequest (requestId, patchObj) {
  return dispatch => {
    return restful.putRequest(requestId, patchObj)
    .then(response => {
      if (response.statusCode >= 400) {
        throw response;
      }
      return new Promise((resolve, reject) => {
        resolve(dispatch(fetchRequest(requestId)));
      });
    }).then(response => {
      dispatch(verifyCreatedRequest('success'));
    }).catch(err => {
      console.log(err);
      dispatch(verifyCreatedRequest('fail'));
    });
  };
}

export function setBoundTimeFrame (timeFrame) {
  return {
    type: SET_BOUND_TIME_FRAME,
    payload: timeFrame
  };
}