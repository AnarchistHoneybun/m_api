import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import User from './User/User';
import Admin from './Admin/App';
import CreateAccount from './CreateAccount/CreateAccount'; // Importing App3.js

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user" element={<User />} />
      <Route path="/app" element={<Admin />} />
      <Route path="/create-account" element={<CreateAccount />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
