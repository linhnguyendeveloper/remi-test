import baseUrl from './index'
import makeRequest from '../config/makeRequest'
const loginUrl = `${baseUrl}/pl/users/create`
export const signUpApi = (data) =>makeRequest('post',loginUrl,data)
export const signInApi= (data) =>makeRequest('post',baseUrl+"/pl/auth/createAndLogin",data)
