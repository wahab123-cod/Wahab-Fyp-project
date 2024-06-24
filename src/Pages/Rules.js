import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import '../Style/Rules.css';
import { TbBackground } from 'react-icons/tb';

const Rules = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState(null); // State to store admin data

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'wahab' && password === '1234') {
      // Simulating admin data retrieval (replace with actual backend call if needed)
      const adminInfo = {
        name: 'wahab',
        role: 'Administrator',
        email: 'wahab@gmail.com',
      };
      setAdminData(adminInfo);
      setAuthenticated(true);
    } else {
      setPassword('');
      alert('Incorrect username or password');
    }
  };

  if (!authenticated) {
    return (
      <div className="login-container">
        <h2>Admin Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" value={username} onChange={handleUsernameChange} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button className="login-button" type="submit">Login</button>
        </form>
      </div>
    );
  } else {
    // Once authenticated, show admin information
    return (
      <div className="admin-info">
        <h2 style={{backgroundColor:"white", color:"green"}}>Welcome, {username} as a Admin!</h2>
        <p>You are now logged in as an admin.</p>
        <Outlet />
      </div>
    );
  }
};

export default Rules;
