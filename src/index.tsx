import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './normalize.css'
import { BrowserRouter } from "react-router-dom";
import { MenuProvider } from './MenuContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <MenuProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MenuProvider>
);

