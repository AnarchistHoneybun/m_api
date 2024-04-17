import { Route, Routes} from 'react-router-dom';
import Sidebar from './Sidebar';
import './App.css';
import Header from './Header';
import Dashboard from './Dashboard';
import KeyRequests from './KeyRequests';
import Users from './Users'; // Assuming you have a Users component
import React, { useEffect, useRef } from "react";
import "../Login/Login.css";
function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="Content">
        <Header />
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/key-requests" element={<KeyRequests />} />
            <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;