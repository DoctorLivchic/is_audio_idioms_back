import React from 'react';
import ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const app = ReactDOMClient.createRoot(document.getElementById('app'));

app.render(<App />)
