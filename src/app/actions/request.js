require('es6-promise').polyfill();
import * as common from './common';
import * as restful from '../lib/restful';

export const ADD_JP_COMMENT = 'ADD_JP_COMMENT';
export const ADD_TW_COMMENT = 'ADD_TW_COMMENT';
export const CHANGE_ALERT_STATUS = 'CHANGE_ALERT_STATUS';
export const CLEAR_REQUEST = 'CLEAR_REQUEST';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const FETCH_INTERNAL_COMMENTS = 'FETCH_INTERNAL_COMMENTS';
export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const REMOVE_ACCOMMODATION = 'REMOVE_ACCOMMODATION';
export const SET_BOUND_TIME_FRAME = 'SET_BOUND_TIME_FRAME';
export const SUBMIT_REQUEST = 'SUBMIT_REQUEST';
export const SWITCH_CHANNEL = 'SWITCH_CHANNEL';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const VERIFY_CREATED_REQUEST = 'VERIFY_CREATED_REQUEST';

export function loadRequestPage (requestId) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      resolve(dispatch(common.startLoading()));
    }).then(response => {
      return new Promise((resolve, reject) => {
        resolve(dispatch(fetchRequest(requestId)));
      });
    }).then(response => {
      return new Promise((resolve, reject) => {
        resolve(dispatch(common.finishLoading()));
      });
    }).catch(err => {
      console.log(err);
    });
  };
}

export function checkScope (scope) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      resolve(dispatch(common.getAuthority(scope)));
    });
  }
}

export function fetchOrders (token) {
  return {
    type: FETCH_ORDERS,
    payload: restful.getOrders(token)
      .then(response => {
        return response;
      })
  }
}

export function addTWComment (requestId, comment) {
  return dispatch => {
    return restful.postInternalComment(requestId, comment)
    .then(response => {
      if (response.statusCode >= 400) {
        throw response;
      }
      return new Promise((resolve, reject) => {
        resolve(dispatch(fetchTWComments(requestId)));
      });
    }).catch(err => {
      console.log(err);
      // dispatch(verifyCreatedRequest('fail'));
    });
  };
}

export function addJPComment (requestId, comment) {
  return dispatch => {
    return restful.postComment(requestId, comment)
    .then(response => {
      if (response.statusCode >= 400) {
        throw response;
      }
      return new Promise((resolve, reject) => {
        resolve(dispatch(fetchJPComments(requestId)));
      });
    }).catch(err => {
      console.log(err);
      // dispatch(verifyCreatedRequest('fail'));
    });
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

export function clearRequestPage () {
  return dispatch => {
    Promise.all([
      dispatch(changeAlertStatus(null)),
      dispatch(verifyCreatedRequest(null)),
      clearRequest(clearRequest())
    ]);
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
      Promise.all([
        dispatch(fetchRequest(requestId)),
        dispatch(changeAlertStatus('success')),
        dispatch(fetchJPConversation(requestId))
      ]);
    }).catch(err => {
      console.log(err);
      dispatch(changeAlertStatus('fail'))
    });
  };
}

export function fetchJPComments (requestId) {
  return {
    type: FETCH_COMMENTS,
    payload: restful.getComments(requestId)
      .then(response => {
        return response;
      })
  };
}

export function fetchTWComments (requestId) {
  return {
    type: FETCH_INTERNAL_COMMENTS,
    payload: restful.getInternalComments(requestId)
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
      dispatch(changeAlertStatus('success'));
    }).catch(err => {
      console.log(err);
      dispatch(changeAlertStatus('fail'));
    });
  };
}

export function setBoundTimeFrame (timeFrame) {
  return {
    type: SET_BOUND_TIME_FRAME,
    payload: timeFrame
  };
}