/* action types */

export const CREATE_TEST_REQUEST = 'CREATE_TEST_REQUEST';

/* action creators */

export function createTestRequest () {
  console.log('test request created');
  return {
    type: CREATE_TEST_REQUEST,
    req: {
      requestId: 'x',
      requester: 'y',
      createTime: 'z'
    }
  };
}
