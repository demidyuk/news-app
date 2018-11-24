import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Typography from 'typography';
import theme from 'typography-theme-bootstrap';
import reducer from './reducers';
import AppContainer from './containers/AppContainer';

import './css/global.css';

const typography = new Typography(theme);
typography.injectStyles();

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root'),
);
