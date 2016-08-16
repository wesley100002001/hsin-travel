import { CREATE_TEST_REQUEST } from '../actions/requests'

export default function requests(state = [], action) {
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
