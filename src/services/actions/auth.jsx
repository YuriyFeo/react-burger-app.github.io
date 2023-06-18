import { request, getProfileInfoRequest } from "../../utils/api";
import { setCookie, deleteCookie, getCookie } from "../../utils/utils";

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const IS_AUTH = 'IS_AUTH'

export const updateToken = (token) => {
  return function (dispatch) {
    request('/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'token': token
      })
    })
      .then(data => {
        deleteCookie('token');
        setCookie('token', data.refreshToken);
      })
  }
}

export const getUser = (token) => {
  return function (dispatch) {
    request('/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'token': token
      })
    })
      .then(data => {
        deleteCookie('token');
        setCookie('token', data.refreshToken);
        getProfileInfoRequest(data.accessToken)
          .then(user => {
            dispatch({
              type: GET_USER_SUCCESS,
              email: user.user.email,
              name: user.user.name,
              accessToken: data.accessToken
            })
          })    
          .finally(() => {
            dispatch({
              type: IS_AUTH
            })
          })
        console.log(getCookie('token'))
      })    
      .catch(() => {
        dispatch({
          type: IS_AUTH
        })
      })
  }
}