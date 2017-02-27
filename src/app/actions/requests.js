import * as restful from '../lib/restful';

export const FETCH_REQUESTS = 'FETCH_REQUESTS';

export function fetchRequests () {
  return {
    type: FETCH_REQUESTS,
    payload: restful.getRequests()
      .then(response => {
        return response;
      })
  };
}
