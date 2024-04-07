import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from '@organisms/ErrorBoundary';
import '@styles/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary fallback="An error has occurred, the site administrator has been notified. Please try again later.">
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
