import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Select the root div from your HTML
const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // create a root instance with that div

// Use the root instance to render your app component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
