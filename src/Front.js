import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style/front.css';
import demo from './video/demo.mp4';
import bb from './images/bb.avif';
import cp2 from './images/cp2.avif';
import sl4 from './images/sl4.jpg';
import sl5 from './images/sl5.jpg';
import sl6 from './images/sl6.jpg';
import crick from '../src/images/crick1.jpg';
import crick3 from '../src/images/crik3.jpg';
import crick4 from '../src/images/crick4.jpg';
import basket from '../src/images/basket.jpg';
import football from '../src/images/footbal.jpg';
import footbal2 from '../src/images/football1.jpg';
import Searchbar from './Pages/Searchbar';
import { useState } from 'react';
import Navbar from './Pages/Navbar';
import Footer from "../src/Pages/Footer";
const Front = () => {
  const images = [bb, cp2, sl4, sl5, sl6];
  const [hasRejectedBookings, setHasRejectedBookings] = useState(false);
  return (
    <>
       <Navbar hasRejectedBookings={hasRejectedBookings} />
      <Searchbar />
      <div className="slider-container">
        <Carousel>
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img src={image} alt={`Slide ${index + 1}`} className="d-block w-100" />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <br />
      <div className="container">
        <div className="row">
          <h1 className="text-center font-weight-bold">Our Clubs</h1>
        </div>
        <section className="feature-section">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="feature">
                <img src={crick4} alt="" className="img-fluid" />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/1">
                  <button className="btn btn-primary w-100">Book Now</button>
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="feature">
                <img src={footbal2} alt="" className="img-fluid" />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/2">
                  <button className="btn btn-primary w-100">Book Now</button>
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="feature">
                <img src={crick} alt="" className="img-fluid" />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/3">
                  <button className="btn btn-primary w-100">Book Now</button>
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="feature">
                <img src={football} alt="" className="img-fluid" />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/4">
                  <button className="btn btn-primary w-100">Book Now</button>
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="feature">
                <img src={crick3} alt="" className="img-fluid" />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/5">
                  <button className="btn btn-primary w-100">Book Now</button>
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="feature">
                <img src={basket} alt="" className="img-fluid" />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/6">
                  <button className="btn btn-primary w-100">Book Now</button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="container">
        <h3 className="text-center">Our sports clubs are located</h3>
        <div
          className="card p-4 mx-auto"
          style={{ maxWidth: '1200px', borderRadius: '15px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="row">
            <div className="col-lg-6 mb-4">
              <video className="w-100" controls>
                <source src={demo} type="video/mp4" />
              </video>
            </div>
            <div className="col-lg-6">
              <div className="d-lg-flex flex-lg-column">
                <ul className="list-unstyled">
                  <li className="link-style d-block mb-3 mt-4">
                    Behria Town
                  </li>
                  <li className="link-style d-block mb-3">
                    DHA
                  </li>
                  <li className="link-style d-block mb-3">
                    Johar Town
                  </li>
                  <li className="link-style d-block mb-3">
                    Sagggia Pull
                  </li>
                  <li className="link-style d-block mb-3">
                    Model Town
                  </li>
                  <li className="link-style d-block mb-3">
                    Hafeez Kardar Rd
                  </li>
                  <li className="link-style d-block mb-3 mt-4">
                    Lawrence Road
                  </li>
                  <li className="link-style d-block mb-3">
                    Ring Road
                  </li>
                  <li className="link-style d-block mb-3">
                    Quaid E Azam Rd
                  </li>
                  <li className="link-style d-block mb-3">
                    Islamia Garden
                  </li>
                  <li className="link-style d-block mb-3">
                    Sabzazar
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <Footer></Footer>
    </>
  );
};

export default Front;
