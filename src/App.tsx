import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Videos from './components/Videos';
import Login from './components/LoginStudent';
import Cadastrar from './components/CreateStudent'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/Videos" element={< Videos />} />
        <Route path="/Login" element={< Login />} />
        <Route path="/cadastrar" element={< Cadastrar />} />
      </Routes>
    </Router>
  );
};

export default App;
