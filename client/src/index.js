import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { combineReducers } from "redux";
import { Provider } from 'react-redux';
import store from './store/store';
import contacts from './reducers/contacts';
import axios from "axios";
import { setToken,getRefreshToken,authHeader,clearToken } from './services/auth-header'
import {getToken} from "./services/ contact-service"
//check for every response 
//Add a response interceptor

axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  const originalRequest = error.config;

  if (error.response.status === 403) {
      console.log("entered into reponse",error.response.status)
      clearToken();
      window.location = '/login'
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      console.log("refresh token",refreshToken)
      const restToken = getToken(refreshToken)
      console.log("restToken",restToken)
      return axios.post('localhost:5000/api/token/',
          {
              "token": refreshToken
          },{ headers: "*" })
          .then(res => {
            console.log("response for refres",res)
              if (res.status === 201) {
                  setToken(res.data);
                  axios.defaults.headers.common['Authorization'] = 'Bearer ' + authHeader();
                  return axios(originalRequest);
              }
          })
  }
  return Promise.reject(error);
});


ReactDOM.render(

  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
export default combineReducers({
  contacts,
});