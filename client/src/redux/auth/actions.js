import { SIGNUP_SUCCESS, SIGNIN_SUCCESS } from "./actionTypes";
import { signUpApi, signInApi } from "../../services/api/auth";
import { getShareVideoByUser } from "../../redux/notifications/actions";
function signUpSuccess(auth) {
  return {
    type: SIGNUP_SUCCESS,
    auth: auth,
  };
}
export const signUp = (data) => {
  return (dispatch) => {
    signUpApi(data)
      .then((res) => {
        dispatch(signUpSuccess(res.data));
      })
      .catch((err) => {});
  };
};

function signInSuccess(data) {
  return {
    type: SIGNIN_SUCCESS,
    data: data,
  };
}
export const signIn = (data) => {
  return (dispatch) => {
    signInApi(data)
      .then(async (res) => {
        console.log(res);
        if (res.data.token) {
          dispatch(signInSuccess(res.data));
          await localStorage.setItem(
            "auth",
            JSON.stringify({ token: res.data.token, email: data.email }),
          );
          dispatch(getShareVideoByUser(res.data.token));
        }
        else 
        dispatch(signInSuccess(res.data));

      })
      .catch((err) => {
        console.log(err);

      });
  };
};
