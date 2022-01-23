import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Pages from './Pages';
import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Pages />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
