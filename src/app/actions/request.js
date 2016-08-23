/* action types */

export const ADD_ITEM = 'ADD_ITEM';

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
