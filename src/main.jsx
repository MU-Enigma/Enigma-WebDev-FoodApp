import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './cart.css';
import { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProgressContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </UserProgressContextProvider>
  </React.StrictMode>
);
