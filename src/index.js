import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';


const app = (
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);


/* Burger Builder */

ReactDOM.render( app, document.getElementById('root'));
registerServiceWorker();
reportWebVitals();

/* 
const app = (
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById( 'root' ) );
registerServiceWorker(); */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

/* Ajax Axiom Requests */
/* 

import React from 'react';
import ReactDOM from 'react-dom';
import classes from './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import axios from 'axios';

// Default Configuration 
// axios.defaults.baseURL='https://jsonplaceholder.typicode.com/';
//axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';


// -----Request Interceptor---- 
//Shared across all files
var myReqInterceptor = axios.interceptors.request.use(request => {
  // If request is not returned, we are blocking the request.
  console.log('[REQUEST] AXIOS INTERCEPTOR: ', request);
  // We can also edit request
  return request;
}, error => {
    console.log('[REQUEST] AXIOS INTERCEPTOR ERROR: ', error);
    return Promise.reject(error);
});

// -----Response Interceptor---- 
var myRespInterceptor = axios.interceptors.response.use(response => {
  // If response is not returned, we are blocking the response.
  console.log('[RESPONSE] AXIOS INTERCEPTOR: ', response);
  // We can also edit request
  return response;
}, error => {
    console.log('[RESPONSE] AXIOS INTERCEPTOR ERROR: ', error);
    return Promise.reject(error);
});

//axios.interceptors.request.eject(myReqInterceptor);
//axios.interceptors.response.eject(myRespInterceptor);

 // axios.interceptors.request.use(function () {...});
// axios.interceptors.request.eject(myInterceptor);


ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();

*/

