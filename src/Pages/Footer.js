import React from 'react';
import '../Style/footer.css'
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
         
          <div className="footer-section contact">
            <h2>Contact Us</h2>
            <p>
              Address: C2 Johar Town Lahore <br />
              Email: wahabzahid394@gmail.com <br />
              Phone: (+92) 312-1478607
            </p>
          </div>
          <div className="footer-section social">
            <h2>Follow Us</h2>
            <p>Stay connected on social media</p>
            <div className="social-icons">
             {/*  <Link to="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i> 
               
              </Link>
              <Link to="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i> 
                
              </Link>
              <Link to="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i> 
              
              </Link> */}
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Your Website.Indoor Cricket System</p>
      </div>
    </footer>
  );
};

export default Footer;
