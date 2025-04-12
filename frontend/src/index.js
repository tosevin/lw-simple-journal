import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './css/index.css';
import { TokenProvider }  from './context/TokenContext';
import App from './App';
import { DiaryDateProvider } from './context/DiaryContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <DiaryDateProvider>
  <TokenProvider>
    <Router>
      <App />
    </Router>
  </TokenProvider>  
  </DiaryDateProvider>
  // </React.StrictMode>
);

