import React, { useState } from 'react';
import axios from 'axios';
import '../Style/contactus.css';

const Contactus = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [messag, setMsg] = useState('');
  const[info, setinfo] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  }
  const handleinfo = (event) =>{
     setinfo(event.target.value);
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleMessageChange = (event) => {
    let limit =event.target.value;
    if(limit.length<100)
    {
      setMsg(limit);
    }
    else
    {
      alert("Your message is too long")
    }
  }

  const handleSubmit = (event) => {

    axios.post('http://localhost:3001/contact', { name, email, messag , info })
      .then((response) => {
        alert("Message sent successfully!",response);
        alert("hello")
      })
      .catch((error) => {
        console.error('Failed to send message:', error);
        alert("Failed to send message. Please try again later.");
      });
  }

  return (
    <div>
      <div className='fc'>
        <h1 style={{ fontSize: "80px", color: "red" }}> Contact</h1> <h1 style={{ fontSize: "80px" }}> Us</h1>
      </div>
      <div className='backcolor'>
        <div className="contact-container">
          <div className='row'>
            <div className='col-6'>
              <h2>Contact Us</h2>
              <p>Feel free to reach out to us. We are here to help!</p>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Your name" onChange={handleNameChange} value={name} required/>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Your email" onChange={handleEmailChange} value={email} required/>
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" placeholder="Your message" onChange={handleMessageChange} value={messag} required></textarea>
                <select onChange={handleinfo} value={info} >
                <option>technical problems </option>
               <option> slots already booked as manual</option>
                </select>

                <button type="submit">Submit</button>
              </form>
              <div className="contact-info">
                <p>Email: wahabzahid3945@gmail.com</p>
                <p>Phone: +923121478607</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactus;
