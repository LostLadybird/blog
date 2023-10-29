import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './components/app/app';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
