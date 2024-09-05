import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Videos from './components/Videos';
import Room from './components/room';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import UserList from './components/Class'


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/Videos" element={< Videos />} />
        <Route path="/Login" element={< Login />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/UserList" element={<UserList />} /> 
        <Route path="/Room" element={<Room />} />
      </Routes>
    </Router>
  );
};


export default App;
  