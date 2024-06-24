import React from 'react'
import '../Style/about.css'
import p1 from '../images/Ld1.jpeg'
import p2 from '../images/Ld2.jpeg'
import p3 from '../images/Ld3.jpeg'
import p4 from '../images/Ld4.jpeg'
import p5 from '../images/Ld.jpeg'
import p7 from '../images/Ld7.jpeg'
import { useState } from 'react'
import Navbar from './Navbar'
import Footer from "./Footer";
const Abooutus = () => {
  const [hasRejectedBookings, setHasRejectedBookings] = useState(false);
  return (
    <div>
     <Navbar hasRejectedBookings={hasRejectedBookings} />
     <div className='container-fluid'>
      <div className='fa'>
        <h1 style={{ color: "red", cursor: "pointer", fontSize: "80px" }}> About </h1> <h1 style={{ fontSize: "80px" }}> Us</h1>
      </div>
      <div className="about-container">
        <div className="about-content">
          <h2 style={{ fontWeight: 'bold' }}>Welcome to Indoor Sports Booking</h2>
          <p>
            Elevate your sports experience with our state-of-the-art Indoor Sports Booking System. We
            provide a seamless platform for enthusiasts to book their favorite indoor sports
            facilities.
          </p>
          <p>
            Discover a world of possibilities—from cricket pitches to basketball courts. Whether you're
            a seasoned athlete or just looking for some fun, our user-friendly system ensures a
            hassle-free booking experience.
          </p>
          <p>
            Key Features:
            <ul>
              <li>Easy Navigation</li>
              <li>Secure Online Booking</li>
              <li>Real-time Availability</li>
              <li>User-friendly Interface</li>
            </ul>
          </p>
          <p>
            Join us in promoting a healthy and active lifestyle through indoor sports. Feel free to
            reach out for any inquiries or suggestions. Let's play and stay active together!

          </p>
        </div>
        <div className='container' style={{ backgroundColor: "#F2F3F2" }}>
          <div className='row'>
            <h2 style={{ fontWeight: 'bold' }}> Our Cultures And Values </h2>
          </div> <br></br>
          <div className='row'>
            <div className='col'>
              <h3 style={{ color: "red" }}> Mission </h3>
              <p>To empower individuals and communities to embrace a healthy and active lifestyle by providing seamless access to indoor sports facilities and a curated selection of quality sports equipment through an innovative and user-friendly booking and ecommerce platform.</p>

            </div>
            <div className='col'>
              <h3 style={{ color: "red" }} > Values </h3>
              <p>To be the leading global platform that transforms the way people engage in indoor sports, fostering a culture of well-being, inclusivity, and passion for physical activity. We envision a world where everyone has convenient access to top-notch sports facilities and quality sports products, inspiring a lifelong commitment to fitness and enjoyment.</p>

            </div>
            <div className='col'>
              <h3 style={{ color: "red" }} > Vision </h3>
              <p>Our vision is to revolutionize global engagement in indoor sports, creating a leading platform that fosters a culture of well-being and passion for physical activity. We aspire to be the go-to destination for convenient access to top-notch sports facilities and quality sports products, inspiring a world where everyone embraces an active and healthy lifestyle.</p>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <h2 style={{ fontWeight: 'bold' }}> Our Leadership </h2> </div>
          <div className='row'>

            <div className="col-3">
              <div class="feature">
                {<img src={p1} alt='' />}
                <h4 style={{ fontWeight: 'bold' }}> Abdul Wahab</h4>
                <p> Chairman</p>
              </div> </div>
           
            <div className="col-3">
              <div class="feature">
                {<img src={p2} alt='' />}
                <h4 style={{ fontWeight: 'bold' }}> AHtisham Ali</h4>
                <p> Director </p>


              </div> </div>
            <div className="col-3"> <div class="feature">
              {<img src={p3} alt='' />}
              <h4 style={{ fontWeight: 'bold' }}> Mirza Gohar</h4>
              <p> President</p>

            </div></div>
            <div className="col-3"> <div class="feature">
              {<img src={p4} alt='' />}
              <h4 style={{ fontWeight: 'bold' }}> Zunair Ali Shah</h4>
              <p>Financial Officer</p>


            </div></div>
            <div className="col-3"><div class="feature">
              {<img src={p5} alt='' />}
              <h4 style={{ fontWeight: 'bold' }}> Nazim Hussain</h4>
              <p> Chief Technology Officer</p>


            </div> </div>

            <div className="col-3"> <div class="feature">
              {<img src={p7} alt='' />}
              <h4 style={{ fontWeight: 'bold' }}> Khizar</h4>
              <p> President</p>

            </div></div>

          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default Abooutus
