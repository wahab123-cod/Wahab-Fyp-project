import React, { useState, useEffect } from 'react';
import '../Style/shop.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import b1 from '../images/b1.jpg';
import b2 from '../images/b2.jpg';
import bal2 from '../images/ball2.jpg';
import s1 from '../images/safty.jpg';
import s2 from '../images/safty2.jpg';
import s3 from '../images/s3.jpg';
import safty from '../images/download.jpg';
import fb1 from '../images/fotbal1.jpg';

const Shop = () => {
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/infoP");
      setProduct(response?.data || []);
      setFilteredProducts(response?.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProduct([]);
      setFilteredProducts([]);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = product.filter(product =>
      product.name.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredProducts(product);
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className='row'>
          <div className='col'>
            <div className='fa'>
              <h1 style={{ color: "red", cursor: "pointer", fontSize: "80px" }}> Our </h1> <h1 style={{ fontSize: "80px" }}> Shop</h1>
            </div>
          </div>
        </div><br></br>
        <div className='row'>
          <div className="product-grid">
            <div className="col-12">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search by product name..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <button onClick={clearSearch}>Clear</button>
              </div>
            </div>
          </div>
          {/* Render filtered products from database */}
          {filteredProducts.map((product) => (
            <div key={product.id} className='col-md-3 col-sm-6'>
              <div className="product-box">
                <div className="product-inner">
                  <img src={product.image || 'default-image-url'} alt='' />
                  <p className="name">{product.name}</p>
                  <p className="price">Price: {product.price}</p>
                  <Link to={`/product/${product?._id}`}>
                  
                    <button style={{ width: '100%', height: '60px' }}>Buy Now</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {/* Hardcoded products */}
          <div className='col-md-3 col-sm-6'>
            <div className="product-box">
              <div className="product-inner">
                <img src={b1} alt='' />
                <p className="name">Bat</p>
                <p className="price">Price: 1500</p>
                <Link to="/product/1"><button style={{ width: '100%', height: '60px' }}>Buy Now</button></Link>
              </div>
            </div>
          </div>
          <div className='col-md-3 col-sm-6'>
            <div className="product-box">
              <div className="product-inner">
                <img src={s1} alt='' />
                <p className="name">Gloves</p>
                <p className="price">Price: 500</p>
                <Link to="/product/2"><button style={{ width: '100%', height: '60px' }}>Buy Now</button></Link>
              </div>
            </div>
          </div>
          <div className='col-md-3 col-sm-6'>
            <div className="product-box">
              <div className="product-inner">
                <img src={b2} alt='' />
                <p className="name">Bat</p>
                <p className="price">Price: 1000</p>
                <Link to="/product/3"><button style={{ width: '100%', height: '60px' }}>Buy Now</button></Link>
              </div>
            </div>
          </div>
          <div className='col-md-3 col-sm-6'>
            <div className="product-box">
              <div className="product-inner">
                <img src={s3} alt='' />
                <p className="name">Pad</p>
                <p className="price">Price: 2000</p>
                <Link to="/product/4"><button style={{ width: '100%', height: '60px' }}>Buy Now</button></Link>
              </div>
            </div>
          </div>
          <div className='col-md-3 col-sm-6'>
            <div className="product-box">
              <div className="product-inner">
                <img src={bal2} alt='' />
                <p className="name">Ball</p>
                <p className="price">Price: 500</p>
                <Link to="/product/5"><button style={{ width: '100%', height: '60px' }}>Buy Now</button></Link>
              </div>
            </div>
          </div>
          <div className='col-md-3 col-sm-6'>
            <div className="product-box">
              <div className="product-inner">
                <img src={safty} alt='' />
                <p className="name">Complete Kit</p>
                <p className="price">Price: 15000</p>
                <Link to="/product/6"><button style={{ width: '100%', height: '60px' }}>Buy Now</button></Link>
              </div>
            </div>
          </div>
          <div className='col-md-3 col-sm-6'>
            <div className="product-box">
              <div className="product-inner">
                <img src={fb1} alt='' />
                <p className="name">Ball</p>
                <p className="price">Price: 550</p>
                <Link to="/product/7"><button style={{ width: '100%', height: '60px' }}>Buy Now</button></Link>
              </div>
            </div>
          </div>
          <div className='col-md-3 col-sm-6'>
            <div className="product-box">
              <div className="product-inner">
                <img src={s2} alt='' />
                <p className="name">Helmet</p>
                <p className="price">Price: 3000</p>
                <Link to="/product/8"><button style={{ width: '100%', height: '60px' }}>Buy Now</button></Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Shop;
