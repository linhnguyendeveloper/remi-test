import baseUrl from './index'
import makeRequest from '../config/makeRequest'
export const likeVideoApi = (data,id) =>makeRequest('post',baseUrl+'/pv/videos/like/'+id,data)

