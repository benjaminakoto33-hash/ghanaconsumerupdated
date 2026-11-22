
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.jsx';
import { store, persistor } from './redux/store.js';
import ThemeProvider from './components/ThemeProvider.jsx';

import './index.css';

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400" />
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Loading GhanaConsumer...
        </p>
      </div>
    </div>
  );
}

function Root() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate
          loading={<LoadingScreen />}
          persistor={persistor}
        >
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Root />
);
