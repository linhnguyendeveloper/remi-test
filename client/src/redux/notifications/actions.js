import { GET_ALL_SHARED_VIDEO,SHARE_VIDEO_SUCCESS } from "./actionTypes";
import { getAllSharedVideoApi ,shareVideoApi, getShareVideoByUserApi} from "../../services/api/notifications";

function getAllSharedVideoSuccess(videos) {
  return {
    type: GET_ALL_SHARED_VIDEO,
    videos: videos,
  };
}
export const getAllSharedVideo = (token) => {
  return (dispatch) => {
    getAllSharedVideoApi(token)
      .then((res) => {
        dispatch(getAllSharedVideoSuccess(res.data));
      })
      .catch((err) => {});
  };
};
export const getShareVideoByUser = (token) => {
  return (dispatch) => {
    getShareVideoByUserApi(token)
      .then((res) => {
        dispatch(getAllSharedVideoSuccess(res.data));
      })
      .catch((err) => {});
  };
};
function sharedVideoSuccess(shareStatus) {
  return {
    type: SHARE_VIDEO_SUCCESS,
    shareStatus: shareStatus,
  };
}
export const shareVideo = (data) => {
  return (dispatch) => {
    shareVideoApi(data)
      .then((res) => {
        dispatch(sharedVideoSuccess(res.data));
      })
      .catch((err) => {});
  };
};
