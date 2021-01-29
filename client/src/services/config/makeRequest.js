import { callAPI } from './callAPI'

const makeRequest = async (
  method,
  url,
  data,token) => {
  try {
    const res = await callAPI(method, url, data,token);
    return await res;
  } catch (error) {
    return error
  }
}

export default makeRequest