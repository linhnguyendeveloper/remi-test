import {
  SIGNUP_SUCCESS,
} from './actionTypes'

const initState = {
  auth: []
}

export default function (state = initState, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        auth: action.auth
      }
   
    default:
      return {
        ...state
      }
  }
}
