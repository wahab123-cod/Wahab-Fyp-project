import axios from 'axios';
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import '../Style/Ownerregister.css';
import { Button } from 'react-bootstrap';


const OwnerRegister = () => {
  const ownerlogin = () =>{
    window.location='./Ownerlogin'
  }
   const [name, setname] = useState('');
   const [email, setEmail] = useState('');
   const [password , setpassword] = useState('');
   const [emailError ,setemailError ] = useState('');
   const navigate = useNavigate();
   const handl1 = (event) => {
    const name = (event.target.value);
     setname(name);
   }
   const handl2 = (event) => {
const email =  (event.target.value);
setEmail(email);
  if((!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)))
   {
    setemailError("invalid email") 
   }
   else
   {
    setemailError("");
   }
   }
   const handl3 = (event) => {
   setpassword(event.target.value);
   }
   
   const submit1 = async (event) => {
    event.preventDefault();
    if (emailError) {
        return;
    }
    try {
        const res = await axios.post('http://localhost:3001/owner', { name, email, password });
        alert(res?.data);
        if(res?.data==="success")
        {
          navigate('/ownerlogin')
        }
        
    } catch (error) {
        console.error("error", error);
    }
}
  return (
    <div>
    <div className='container1_owner_register'>
      <form onSubmit={submit1}>
      <div className="input_box1_owner_register">
      <label>Enter Name</label>
 <input type='name' placeholder='Name' value={name} onChange={handl1} required></input> </div>
 <div className='input_box1_owner_register'>
 <label> Enter Gmail</label>
 <input type='gmail' placeholder='Gmail' value={email} onChange={handl2} required></input>
 {emailError && <span className="error_owner_register" style={{ color: 'red' }}>{emailError}</span>}
 
 </div>
 <div className='input_box1_owner_register'>
 <label> Enter Password</label>
<input type='password' placeholder='password' value={password} onChange={handl3} required></input>
</div>
<div className='input_box1_owner_register'>
<input type='submit' style={{backgroundColor:" #007bff",color:"white"}}></input>
<input type="button" className="btn btn-primary" onClick={ownerlogin} value="Login" />
</div>
      </form>
</div>
    </div>
  )
}

export default OwnerRegister;
