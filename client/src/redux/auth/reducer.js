import {
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS
} from './actionTypes'

const initState = {
  auth: [],
  status:false
}

export default function (state = initState, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        auth: action.auth
      }
      case SIGNIN_SUCCESS:
        return {
          ...state,
          status: action.data
        }
    default:
      return {
        ...state
      }
  }
}
