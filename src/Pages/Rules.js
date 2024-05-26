import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import '../Style/Rules.css';

const Rules = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'zunair' && password === '1234') {
      setAuthenticated(true);
    } else {
      setPassword('');
      alert('Incorrect username or password');
    }
  };
  if (!authenticated) {
    return (
      <>
     
      <div className="login-container">
      <h2> Admin Login </h2>
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
      </>
    );
  } else {
    return (
      <div>
        <Outlet/>
      </div>
    );
  }
};
export default Rules;
