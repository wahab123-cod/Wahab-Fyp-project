import React, { useState } from 'react';
import axios from 'axios';
import '../Style/Registered.css';
import { Link } from 'react-router-dom';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [clear, setClear] = useState(false);
  const [success, setSuccess] = useState(false); 
  const [error, setError] = useState(false); 

  const change = () => {
    window.location.href = './login';
  };
  const owner = () =>{
    window.location.href='./ownerregister';
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError(false); 
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setPhoneNumberError(false);
    setSuccess(false); 

    if (!name || name.length < 1) {
      setNameError(true);
      return;
    }
    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      setEmailError(true);
      return;
    }
    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
      setPasswordError(true);
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }
    if (!phoneNumber.match(/^\d{11}$/)) {
      setPhoneNumberError(true);
      return;
    }
    axios.post('http://localhost:3001/register', { name, email, password, phoneNumber, gender })
      .then((response) => {
        console.log(response);
        setClear(true);
        setSuccess(true); 
        
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhoneNumber('');
        setGender('');
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  return (
    <div className='body1'>
      <div className="container1">
        <div className="title">Registration</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input type="text" placeholder="Enter your name" name="name" onChange={(e) => setName(e.target.value)} value={name} required />
                {nameError && <span className="error">Name length must be greater than 6</span>}
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input type="email" placeholder="Enter your email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                {emailError && <span className="error">Invalid email format</span>}
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input type="password" placeholder="Enter your password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                {passwordError && <span className="error" color='red'>Password must contain at least one digit, one lowercase and one uppercase letter, and be 6-20 characters long</span>}
              </div>
              <div className="input-box">
                <span className="details">Confirm Password</span>
                <input type="password" placeholder="Confirm your password" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required />
                {confirmPasswordError && <span className="error">Passwords do not match</span>}
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="text" placeholder="Enter your phone number" name="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} required />
                {phoneNumberError && <span className="error">Phone number must be 11 digits</span>}
              </div>
              <div className="gender-details">
                <span className="gender-title">Gender</span>
                <div className="category">
                  <label>
                    <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} required />
                    <span className="gender">Male</span>
                  </label>
                  <label>
                    <input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} required />
                    <span className="gender">Female</span>
                  </label>
                  <label>
                    <input type="radio" name="gender" value="other" onChange={(e) => setGender(e.target.value)} required />
                    <span className="gender">Other</span>
                  </label>
                </div>
              </div>
            </div>
            {clear && (success ? (
  <div className='messageBox'>
    <span style={{ color: "darkgreen", fontSize: "large", fontWeight: "bold" }}>Your information submitted successfully</span>
  </div>
) : <span color='red'> Someone already booking this email and user</span>)}
            <br />
            <input type="submit" className="btn btn-primary" value="Submit"/>
            <br /><br />
            <input type="button" className="btn btn-primary" onClick={change} value="Click to Login" /><br></br>
            <input type="button" className="btn btn-primary" onClick={owner} value="Register as a Club owner" />
          </form>
          
        </div>
      </div>
    </div>
  );
}
export default Register;
