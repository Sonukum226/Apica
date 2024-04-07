import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import storeFile from './store'
import Lru from './container';


// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={storeFile}>
    <Lru />
    </Provider>
  </React.StrictMode>
);
