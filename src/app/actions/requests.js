/* action types */

export const NEW_REQUEST = 'NEW_REQUEST';

/* action creators */

export function newRequest(data) {
  return {
    type: NEW_REQUEST,
    payload: data
  };
}
