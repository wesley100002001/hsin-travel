export const AUTHORIZE_HANDLE_REQUESTS = 'AUTHORIZE_HANDLE_REQUESTS';
export const AUTHORIZE_ISSUE_REQUESTS = 'AUTHORIZE_ISSUE_REQUESTS';
export const FINISH_LOADING = 'FINISH_LOADING';
export const START_LOADING = 'START_LOADING';

function authorizeHandleRequests () {
  var scopes = JSON.parse(localStorage.getItem('scope'));
  return {
    type: AUTHORIZE_HANDLE_REQUESTS,
    payload: scopes.some(sc => {
      return sc === 'handleRequests';
    })
  }
}

function authorizeIssueRequests () {
  var scopes = JSON.parse(localStorage.getItem('scope'));
  return {
    type: AUTHORIZE_ISSUE_REQUESTS,
    payload: scopes.some(sc => {
      return sc === 'issueRequests';
    })
  }
}

// FIXME: Use better grammer than if
export function getAuthority (scope) {
  if (scope === 'handleRequests') {
    return dispatch => {
      return new Promise((resolve, reject) => {
        resolve(dispatch(authorizeHandleRequests()));
      });
    }
  }
  if (scope === 'issueRequests') {
    return dispatch => {
      return new Promise((resolve, reject) => {
        resolve(dispatch(authorizeIssueRequests()));
      });
    }
  }
}

export function startLoading () {
  return {
    type: START_LOADING,
    payload: true
  };
}

export function finishLoading () {
  return {
    type: FINISH_LOADING,
    payload: false
  };
}