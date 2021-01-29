import {
  SIGNUP_SUCCESS
} from './actionTypes'
import {
  signUpApi
} from '../../services/api/auth'


function signUpSuccess(auth) {
  return {
    type: SIGNUP_SUCCESS,
    auth: auth
  }
}
export const signUp = (data) => {
  return dispatch => {
    signUpApi(data)
        .then(res => {
          dispatch(signUpSuccess(res.data))
        })
        .catch(err => {})
    }
  }

