import { CREATE_TEST_REQUEST } from '../actions/requests';
import { ADD_ITEM } from '../actions/request';

export default function requests (state = [], action) {
  switch (action.type) {
    case CREATE_TEST_REQUEST:
    let payload = action.payload
    return [
      ...state,
        payload
    ];

    default:
    return state;
  }
}

export default function request (state = [], action) {
  switch (action.type) {
    case ADD_ITEM:
    let payload = action.payload
    return [
      ...state,
        payload
    ];

    default:
    return state;
  }
}
