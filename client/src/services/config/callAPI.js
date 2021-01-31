import axios from 'axios'
import baseUrl from '../api/index'
export const callAPI = (method, url, data, token) => {
  const tokenData = token || JSON.parse(localStorage.getItem("auth"))?.token 
  return axios({
    baseURL: baseUrl,
    timeout: 20000,
    headers: {
      'content-type': 'application/json',
      'Ocp-Apim-Subscription-Key': '149de49b198446478de94394aced5677',
      Authorization: tokenData  
    },
    method,
    url,
    data
  })
}
