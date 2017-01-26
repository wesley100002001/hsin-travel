/* action types */

export const ADD_ITEM = 'ADD_ITEM';
export const ADD_REQUEST = 'ADD_REQUEST';

/* action creators */

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
