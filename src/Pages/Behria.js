import React from 'react'
import b1 from '../images/bh1.jpg'
import bh2 from '../images/bh2.jpg'
import bh3 from '../images/bh3.jpg'
import bh4 from '../images/bh4.jpg'
import bh5 from '../images/bh5.jpg'
import bh6 from '../images/bh6.jpg'
import { Link } from 'react-router-dom'
import Searchbar from './Searchbar'

const Behria = () => {
  return (
    <div>
     <Searchbar></Searchbar>
    <h1>We are provided sports clubs in Behria Twon Lahore..</h1>
      <div className="container">
        <div className="row">
          <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}> Our clubs </h1>
        </div>
        <section className="feature-section">
          <div className="row">
            <div className="col">
              <div className="feature">
                <img src={b1} alt="" style={{ width: '100%', height: '320px' }} />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/1"><button style={{ width: '100%', height: '60px' }}>Book Now</button></Link>
              </div>
            </div>
            <div className="col">
              <div className="feature">
                <img src={bh2} alt="" style={{ width: '100%', height: '320px' }} />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/2"><button style={{ width: '100%', height: '60px' }}>Book Now</button></Link>
              </div>
            </div>
            <div className="col">
              <div className="feature">
                <img src={bh3} alt="" style={{ width: '100%', height: '320px' }} />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/3"><button style={{ width: '100%', height: '60px' }}>Book Now</button></Link>
              </div>
            </div>
            <div className="col">
              <div className="feature">
                <img src={bh4} alt="" style={{ width: '100%', height: '320px' }} />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/4"><button style={{ width: '100%', height: '60px' }}>Book Now</button></Link>
              </div>
            </div>

            <div className="col">
              <div className="feature">
                <img src={bh5} alt="" style={{ width: '100%', height: '320px' }} />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/5"><button style={{ width: '100%', height: '60px' }}>Book Now</button></Link>
              </div>
            </div>
            <div className="col">
              <div className="feature">
                <img src={bh6} alt="" style={{ width: '100%', height: '320px' }} />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/6"><button style={{ width: '100%', height: '60px' }}>Book Now</button></Link>
              </div>
            </div>
          </div>
        </section>
     </div>


   {/*  <iframe
      title="Johar Town"
      width="600"
      height="450"
    
      allowFullScreen
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.8225277781493!2d74.25749921499974!3d31.459948055836776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919134da12fcf03%3A0x9c2a54e7ea89d60d!2sJohar%20Town%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1644861702921!5m2!1sen!2s"
    ></iframe> */}
  </div>
  )
}

export default Behria
