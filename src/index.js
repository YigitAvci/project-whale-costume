import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "alertifyjs/build/css/alertify.min.css";
import {configureStore, applyMiddleware} from "@reduxjs/toolkit"
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/ReducerIndex';
import { Provider } from 'react-redux';

const store = configureStore({reducer: rootReducer}, applyMiddleware(thunk))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
