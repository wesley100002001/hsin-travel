/* action types */

export const CREATE_REQUEST = 'CREATE_REQUEST';

/* action creators */

export function createRequest() {
  return {
    type: CREATE_REQUEST,
    payload: {a: 'x', b: 'y', c: 'z'}
  };
}
