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