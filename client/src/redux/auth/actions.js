import { SIGNIN_SUCCESS, GET_USERS_SUCCESS } from "./actionTypes";
import { signInApi, getUsersApi } from "../../services/api/auth";
import { getShareVideoByUser } from "../../redux/notifications/actions";

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
        if (res.data.token) {
          dispatch(signInSuccess(res.data));
          await localStorage.setItem(
            "auth",
            JSON.stringify({ token: res.data.token, email: data.email }),
          );
          dispatch(getShareVideoByUser(res.data.token));
        } else dispatch(signInSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

function getUsersSuccess(data) {
  return {
    type: GET_USERS_SUCCESS,
    data: data,
  };
}
export const getUsers = (data) => {
  return (dispatch) => {
    getUsersApi(data)
      .then(async (res) => {
        console.log(res.data,'>>');
        dispatch(getUsersSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
