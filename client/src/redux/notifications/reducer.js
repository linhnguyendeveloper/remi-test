import {
  GET_ALL_SHARED_VIDEO,
  SHARE_VIDEO_SUCCESS
} from './actionTypes'

const initState = {
  videos: [],
  shareStatus:false
}

export default function (state = initState, action) {
  switch (action.type) {
    case GET_ALL_SHARED_VIDEO:
      return {
        ...state,
        videos: action.videos
      }
      case SHARE_VIDEO_SUCCESS:
        return {
          ...state,
          shareStatus: action.shareStatus
        }
    default:
      return {
        ...state
      }
  }
}
