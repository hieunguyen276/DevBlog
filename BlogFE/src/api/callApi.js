import axios from "axios";
import {isFunction} from 'lodash';
import { getAuthToken } from "../utils/localStorage";

export default async function callApi ({
  method,
  apiPath,
  actionTypes: [requestType, successType, failureType],
  variables,
  dispatch,
  getState,
  headers
}) {
  if (!isFunction(dispatch) || !isFunction(getState)) {
    throw new Error('callGraphQLApi requires dispatch and getState functions');
  }

  const baseUrlApi = import.meta.env.VITE_API_URL;
  const token = getAuthToken();
  const header = {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : ""
  };
  dispatch(requestType())
  return axios({
    baseURL: baseUrlApi,
    headers: headers ? {...headers, ...header} : header,
    method: method,
    url: apiPath,
    data: variables,
    params: method === 'get' ? variables : ''
  })
  .then(function (response) {
    dispatch(successType(response.data))
    return response.data;
  })
  .catch((error) => {
    let response = error.response ? error.response : error;
    dispatch(failureType(error.response));
    return response
  })
}
