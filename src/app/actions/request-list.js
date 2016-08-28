/* action types */

export const CREATE_TEST_REQUEST = 'CREATE_TEST_REQUEST';

/* action creators */

export function createTestRequest () {
  return {
    type: CREATE_TEST_REQUEST,
    req: {
      requestId: 'x',
      requester: 'y',
      createTime: 'z'
    }
  };
}

export function addRequest (req) {
  return {
    type: ADD_REQUEST,
    req: {
      requestId: '7oinoinw8678',
      requester: 'USER001',
      createTime: '2016/05/20'
    }
  };
}
