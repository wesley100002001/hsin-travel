export const LOAD_REQUESTS = 'LOAD_REQUESTS';

export function loadRequests (requests) {
  return {
    type: LOAD_REQUESTS,
    requests: requests
  };
}
