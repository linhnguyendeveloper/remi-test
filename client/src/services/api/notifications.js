import baseUrl from './index'
import makeRequest from '../config/makeRequest'
export const getAllSharedVideoApi = (data) =>makeRequest('get',baseUrl+'/pl/notifications/viewAll',data)
export const getShareVideoByUserApi = (data) =>makeRequest('get',baseUrl+'/pv/notifications/viewByUser',data)

export const shareVideoApi = (data) =>makeRequest('post',baseUrl+'/pv/notifications/create',data)

