/* action types */

export const ADD_ITEM = 'ADD_ITEM';
export const ADD_REQUEST = 'ADD_REQUEST';

/* action creators */

export function addItem (item) {
  return {
    type: ADD_ITEM,
    payload: {
      date: '2016/07/25',
      hotel: '國賓大飯店',
      roomType: '雙人房',
      quantity: 22
    }
  }
}

export function addRequest (req) {
  return {
    type: ADD_REQUEST,
    req: {
      requestId: '7oinoinw8678',
      requester: 'USER001',
      createTime: '2016/05/20'
    }
  }
}
