import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import './styles/tailwind-output.css'
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopProvider from './context/shopContext'
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react"
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ChakraProvider>
    <ShopProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ShopProvider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
