import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import './App.css';
import Header from './Header';
import Dashboard from './Dashboard'; // Updated import path
import KeyRequests from './KeyRequests'; // Updated import path
import Users from './Users'; // Updated import path

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="Content">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} /> {/* Dashboard route */}
          <Route path="/dashboard" element={<Dashboard />}  /> {/* Dashboard route */}
          <Route path="/key-requests" element={<KeyRequests />} /> {/* Key Requests route */}
          <Route path="/users" element={<Users />} /> {/* Users route */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
