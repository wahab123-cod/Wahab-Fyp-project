import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style/front.css';
import demo from './video/demo.mp4';
import logo from './images/logo.png';
import estore from './images/estore.png';
import cp2 from './images/cp2.avif';
import bb from './images/bb.avif';
import booking from '../src/Pages/Booking'
import slogo from './images/slogo.png';
import c1 from '../src/images/c1.jpg'; 
import crick from '../src/images/crick1.jpg';
import c2 from '../src/images/c2.jpg';
import basket from '../src/images/basket.jpg';
import football from '../src/images/footbal.jpg';
import footbal2 from '../src/images/football1.jpg';
import crick3 from '../src/images/crik3.jpg';
import crick4 from '../src/images/crick4.jpg';
import Searchbar from './Pages/Searchbar';
import sl4 from './images/sl4.jpg';
import sl5 from './images/sl5.jpg';
import sl6 from './images/sl6.jpg';
import { BiTrash } from 'react-icons/bi';
import axios from 'axios';

const Front = () => {
  

  const images = [bb, cp2,sl4,sl5,sl6];
  
  return (
    <>
       <Searchbar></Searchbar>
      <div className="slider-container">
        <Carousel>
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img src={image} alt={`Slide ${index + 1}`} />
            </Carousel.Item> 
          ))}
        </Carousel>
      </div>
      <br/>
      <div>
     
     
    </div>
      <div className="container">
        <div className="row">
          <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}> Our clubs </h1>
        </div>
        <section className="feature-section">
          <div className="row">
            <div className="col">
              <div className="feature">
                <img src={crick4} alt="" style={{ width: '100%', height: '320px' }} />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/1"><button style={{ width: '100%', height: '60px' }}>Book Now</button></Link>
              </div>
            </div>
            <div className="col">
              <div className="feature">
                <img src={footbal2} alt="" style={{ width: '100%', height: '320px' }} />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/2"><button style={{ width: '100%', height: '60px' }}>Book Now</button></Link>
              </div>
            </div>
            <div className="col">
              <div className="feature">
                <img src={crick} alt="" style={{ width: '100%', height: '320px' }} />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/3"><button style={{ width: '100%', height: '60px' }}>Book Now</button></Link>
              </div>
            </div>
            <div className="col">
              <div className="feature">
                <img src={football} alt="" style={{ width: '100%', height: '320px' }} />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/4"><button style={{ width: '100%', height: '60px' }}>Book Now</button></Link>
              </div>
            </div>

            <div className="col">
              <div className="feature">
                <img src={crick3} alt="" style={{ width: '100%', height: '320px' }} />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/5"><button style={{ width: '100%', height: '60px' }}>Book Now w1</button></Link>
              </div>
            </div>
            <div className="col">
              <div className="feature">
                <img src={basket} alt="" style={{ width: '100%', height: '320px' }} />
                <h2>Planzo</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/6"><button style={{ width: '100%', height: '60px' }}>Book Now</button></Link>
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
            <div className="col-lg-6 mb-6">
              <video className="w-100" controls>
                <source src={demo} type="video/mp4" />
              </video>
            </div>
            <div className="col-lg-3">
              <div className="d-lg-flex flex-lg-column">
                <ul>
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
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="d-lg-flex flex-lg-column">
                <ul>
                  <li className="link-style d-block mb-3 mt-4">
                    Hafeez Kardar Rd
                  </li>
                  <li className="link-style d-block mb-3">
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
    </>
  );
};

export default Front;
