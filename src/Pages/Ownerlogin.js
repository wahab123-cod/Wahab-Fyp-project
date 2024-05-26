import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Ownerlogin.css'; 

const Ownerlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/ownerlogin', { email, password });
      alert(res?.data);
      if (res?.data === "succes") {
        navigate('/ownerpage');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="container">
     <h1> Login </h1>
      <form className="form" onSubmit={handleSubmit}>
        <input className="input" type='email' placeholder='Email' value={email} onChange={handleEmailChange} required /><br></br>
        <input className="input" type='password' placeholder='Password' value={password} onChange={handlePasswordChange} required /><br></br>
        <input className="submit" type='submit' value='Login' />
        
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Ownerlogin;
