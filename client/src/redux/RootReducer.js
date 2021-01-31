import { combineReducers } from 'redux'
import auth from './auth/reducer'
import notifications from './notifications/reducer'
import videoDetails from './videoDetails/reducer'

export default combineReducers({
  auth,
  notifications,
  videoDetails
})
