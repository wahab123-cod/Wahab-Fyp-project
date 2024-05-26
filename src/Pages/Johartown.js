import React from 'react'
import j1 from '../images/j1.jpg'
import j2 from '../images/j2.jpg'
import j3 from '../images/j3.jpg'
import j4 from '../images/j4.jpg'
import j5 from '../images/j5.jpg'
import j6 from '../images/j6.jpg'
import Searchbar from './Searchbar'
import { Link } from 'react-router-dom'
const Johartown = () => {
  return (
    <div>
    <Searchbar></Searchbar>
 <h1>We are provided sports clubs in Johar Town Lahore..</h1>
      <div className="container">
        <div className="row">
          <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}> Our clubs </h1>
        </div>
        <section className="feature-section">
          <div className="row">
            <div className="col">
              <div className="feature">
                <img src={j1} alt="" style={{ width: '100%', height: '320px' }} />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/1"><button style={{ width: '100%', height: '60px' }}>Book Now</button></Link>
              </div>
            </div>
            <div className="col">
              <div className="feature">
                <img src={j2} alt="" style={{ width: '100%', height: '320px' }} />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/2"><button style={{ width: '100%', height: '60px' }}>Book Now</button></Link>
              </div>
            </div>
            <div className="col">
              <div className="feature">
                <img src={j3} alt="" style={{ width: '100%', height: '320px' }} />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/3"><button style={{ width: '100%', height: '60px' }}>Book Now</button></Link>
              </div>
            </div>
            <div className="col">
              <div className="feature">
                <img src={j4} alt="" style={{ width: '100%', height: '320px' }} />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/4"><button style={{ width: '100%', height: '60px' }}>Book Now</button></Link>
              </div>
            </div>

            <div className="col">
              <div className="feature">
                <img src={j5} alt="" style={{ width: '100%', height: '320px' }} />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/5"><button style={{ width: '100%', height: '60px' }}>Book Now</button></Link>
              </div>
            </div>
            <div className="col">
              <div className="feature">
                <img src={j6} alt="" style={{ width: '100%', height: '320px' }} />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/6"><button style={{ width: '100%', height: '60px' }}>Book Now</button></Link>
              </div>
            </div>
          </div>
        </section>
     </div>
    
  </div>
  )
}

export default Johartown
