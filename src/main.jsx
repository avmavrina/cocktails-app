import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import { ToastContainer, toast } from 'react-toastify';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer position="top-center" autoClose={2000}/>
    <App />
  </React.StrictMode>
);
