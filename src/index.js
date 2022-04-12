import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './assets/stylesheets/index.css';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/configureStore';
import 'antd/dist/antd.min.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
