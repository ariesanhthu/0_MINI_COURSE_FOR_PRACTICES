import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import AppContextProvider from './context/AppContext';

function App() {
  return (
    <Router>
      <AppContextProvider>
        <Layout />
      </AppContextProvider>
    </Router>
  );
}

export default App;