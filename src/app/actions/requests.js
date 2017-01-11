import * as restful from '../lib/restful';

export const LOAD_REQUESTS = 'LOAD_REQUESTS';
export const FETCH_REQUESTS = 'FETCH_REQUESTS';

export function fetchRequests () {
  return {
    type: FETCH_REQUESTS,
    payload: restful.getMockRequests()
      .then(response => {
        return response;
      })
  };
}
