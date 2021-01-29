import baseUrl from './index'
import makeRequest from '../config/makeRequest'
const loginUrl = `${baseUrl}/users/create`
export const signUpApi = (data) =>makeRequest('post',loginUrl,data)