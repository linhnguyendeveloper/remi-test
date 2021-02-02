import {
  GET_USERS_SUCCESS,
  SIGNIN_SUCCESS
} from './actionTypes'

const initState = {
  auth: [],
  status:false,
  users:[]
}

export default function (state = initState, action) {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.data
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
