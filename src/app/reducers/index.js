import * as RequestsActions from '../actions/requests'

function requests(state = [], action) {
  switch (action.type) {
    case NEW_REQUEST:
    let payload = action.payload
    return [
      ...state,
      {
        payload
      }
    ]
  }
}
