import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import User from './User/User';
import Admin from './Admin/App';
import CreateAccount from './CreateAccount/CreateAccount';
import Dashboard from './Admin/Dashboard';
import KeyRequests from './Admin/KeyRequests';
import Users from './Admin/Users'; // Import the Users component

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user" element={<User />} />
      <Route path="/dashboard" element={<Admin />}>
        <Route index element={<Dashboard />} />
        <Route path="key-requests" element={<KeyRequests />} />
        <Route path="users" element={<Users />} /> {/* Nested route for Users */}
        {/* Add more nested routes if needed */}
      </Route>
      <Route path="/create-account" element={<CreateAccount />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
