import {
  LIKE_VIDEO_SUCCESS
} from './actionTypes'

const initState = {
  likeStatus: [],
}

export default function (state = initState, action) {
  switch (action.type) {
    case LIKE_VIDEO_SUCCESS:
      return {
        ...state,
        likeStatus: action.likeStatus
      }
     
    default:
      return {
        ...state
      }
  }
}
