import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import Store from './redux';

ReactDOM.render(
    <StrictMode>
      <Provider store={Store}>
      <App />
      </Provider>
    </StrictMode>
  ,

  document.getElementById('root')
)