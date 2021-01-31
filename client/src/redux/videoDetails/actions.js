import { LIKE_VIDEO_SUCCESS } from "./actionTypes";
import {likeVideoApi} from "../../services/api/videoDetail";

function likeVideoSuccess(likeStatus) {
  return {
    type: LIKE_VIDEO_SUCCESS,
    likeStatus: likeStatus,
  };
}
export const likeVideo = (data,id) => {
  return (dispatch) => {
    likeVideoApi(data,id)
      .then((res) => {
        dispatch(likeVideoSuccess(res.data));
      })
      .catch((err) => {});
  };
};
