import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './styles/tailwind.css';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
