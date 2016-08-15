import { CREATE_REQUEST } from '../actions/requests'

export default function requests(state = [], action) {
  switch (action.type) {
    case CREATE_REQUEST:
    let payload = action.payload
    return [
      ...state,
        payload
    ];

    default:
    return state;
  }
}
