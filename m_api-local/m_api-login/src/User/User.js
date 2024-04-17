import React, { useState } from 'react';
import './User.css';

function User() {
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="hello-user-section">
            <div className="hello-user">Hello User</div>
            <select
              className="dropdown"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Select an Option</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>
          <div className="buy-key">Buy Key</div>
        </div>
      </header>
      <main className="content">
        <div className="image-and-text">
          <div className="image-placeholder">[Big Image Here]</div>
          <div className="text-container">
            <p className="bold-text">ABC</p>
            <p>DEF</p>
          </div>
        </div>
        <button className="request-button">Make a New Request</button>
      </main>
    </div>
  );
}

export default User;
