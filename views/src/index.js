import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './context/CartContext';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <AuthProvider>
      <CartProvider>
        <App /> 
      </CartProvider>
    </AuthProvider>
  </HashRouter>
);

reportWebVitals();
