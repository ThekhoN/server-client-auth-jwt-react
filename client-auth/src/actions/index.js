// import React from 'react';
import axios from 'axios';
// import {BrowserRouter, Redirect} from 'react-router-dom';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:3090';

// error handling
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

// signin
export function signinUser({email, password}) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signin`, {email, password})
    .then(response => {
      // if req is good
      // update state to auth'd
      dispatch({type: AUTH_USER});
      // save JWT in localStorage
      localStorage.setItem('token', response.data.token);
    })
    .catch(() => {
      dispatch(authError('Bad Login info'));
    });
  };
}

// signout
export function signoutUser() {
  localStorage.removeItem('token');
  return {type: UNAUTH_USER};
}

// signup
export function signupUser({email, password}) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, {email, password})
    .then(response => {
      // console.log('response: ', response);
      dispatch({type: AUTH_USER});
      localStorage.setItem('token', response.data.token);
    })
    .catch(error => {
      if(error.response){
        console.log('error in signup: ', error.response.data.error);
        dispatch(authError(error.response.data.error));
      }
    });
  };
}

// response message
export function fetchMessage() {
  return function (dispatch) {
    axios.get(ROOT_URL, {
      headers: {authorization: localStorage.getItem('token')}
    })
    .then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      });
    });
  };
}
