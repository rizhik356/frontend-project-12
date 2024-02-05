import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Provider } from 'react-redux';
import RunApp from './init.js';
import reportWebVitals from './reportWebVitals';
import store from './slices/index.js';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RunApp />
  </Provider>,
);

reportWebVitals();
