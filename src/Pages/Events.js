import React from 'react'
import { useState } from 'react';
import Navbar from './Navbar';
import Footer from "./Footer";
const Events = () => {
  const [hasRejectedBookings, setHasRejectedBookings] = useState(false);
  return (
    <div>
      <Navbar hasRejectedBookings={hasRejectedBookings} />
      <div className='container-fluid'>
      <h1> this is events </h1>
      <p> add a part of our tournament</p>
      </div>
      <Footer />
    </div>
  )
}

export default Events
