import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './normalize.css'
import { BrowserRouter } from "react-router-dom";
import { MenuProvider } from './MenuContext';
import { AuthProvider } from './AuthContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <AuthProvider>
    <MenuProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MenuProvider>
  </AuthProvider>
);

