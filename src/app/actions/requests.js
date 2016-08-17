/* action types */

export const CREATE_TEST_REQUEST = 'CREATE_TEST_REQUEST';

/* action creators */

export function createTestRequest() {
  return {
    type: CREATE_TEST_REQUEST,
    payload: {a: 'x', b: 'y', c: 'z'}
  };
}