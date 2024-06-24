import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Import your images here
import b1 from "../images/b1.jpg";
import b2 from "../images/b2.jpg";
import bal2 from "../images/ball2.jpg";
import s1 from "../images/safty.jpg";
import s2 from "../images/safty2.jpg";
import s3 from "../images/s3.jpg";
import safty from "../images/download.jpg";
import fb1 from "../images/fotbal1.jpg";

// Assuming hasRejectedBookings is a prop passed to Navbar
const Product = () => {
  const [hasRejectedBookings, setHasRejectedBookings] = useState(false); // Initialize state if necessary
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    pricess: 0,
    detail: "",
    image: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/infoP/${id}`);
      const data = response?.data;
      if (data) {
        setProduct(data); // Assuming your API returns a single product object
      } else {
        console.error("No product found for id:", id);
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  const addToCart = () => {
    const productToAdd = { ...product, quantity: 1 };
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, productToAdd]);
    }
    setTotalPrice(totalPrice + product.price);
  };

  const removeFromCart = () => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct.quantity > 1) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updatedCart);
      setTotalPrice(totalPrice - existingProduct.price);
    } else {
      const updatedCart = cart.filter((item) => item.id !== product.id);
      setCart(updatedCart);
      setTotalPrice(totalPrice - existingProduct.price);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    save();
  };

  const save = async () => {
    if (cart.length === 0) {
      alert("Please select at least one item before confirming.");
      return;
    }
    const formData = new FormData();
    for (let item of cart) {
      formData.append("productName", item.name);
      formData.append("location", location);
      formData.append("image", item.image); // Assuming item.image is the file object
      formData.append("price", item.price);
      formData.append("quantity", item.quantity);
      formData.append("total", item.quantity * item.price);
    }
    try {
      const response = await axios.post("http://localhost:3001/orders", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response?.data.message);
      navigate("/orders");
    } catch (error) {
      console.error("Error saving product:", error);
      alert("An error occurred while saving the product.");
    }
  };
  
  if (!product.name) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar hasRejectedBookings={hasRejectedBookings} /> {/* Pass prop to Navbar */}
      <div className="container-fluid">
        <div className="row" style={{ color: "black" }}>
          <div className="col">
            <h1>Product Details</h1>
          </div>
        </div>
        <div className="booking-page">
          <div className="row">
            <div className="col">
              <img
                src={product.image}
                alt=""
                style={{ height: "420px", width: "500px" }}
              />
            </div>
            <div className="col">
              <h2>{product.name}</h2>
              <p style={{ fontSize: "30px", color: "orange" }}>
                <strong>Price:</strong> {product.price} Pkr
              </p>
              <h4 style={{ color: "brown" }}>
                <s>Rs:{product.pricess}</s>
              </h4>
              <p style={{ fontSize: "30px" }}>
                <strong>Details:</strong> {product.detail}
              </p>
              <h5 style={{ color: "red" }}>Brand Type: No Brand</h5>
              <button onClick={addToCart}>Add to Cart</button>
              {cart.map((item) => (
                <div key={item.id}>
                  <img
                    src={item.image}
                    alt=""
                    style={{ height: "100px", width: "100px" }}
                  />
                  <button onClick={removeFromCart} style={{ marginRight: "10px" }}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={addToCart} style={{ marginLeft: "10px" }}>
                    +
                  </button>
                  <br />
                  <p></p>
                  <p style={{ fontSize: "16px", fontStyle: "italic", color: "gray" }}>
                    Total Price: {totalPrice}
                  </p>
                </div>
              ))}
            </div>
            <div className="col">
              <h3 style={{ color: "red" }}>Delivery</h3>
              <br />
              <h4>
                <h4>Starting Delivery from Lahore</h4>
                <h4>Ship from Overseas</h4>
                <h4>Only cash on Delivery</h4>
                <h4>Services 14 days Free and Easy return</h4>
                <h4>Warranty not available</h4>
              </h4>
              <h3>sold by: Sports World</h3>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter your Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  style={{ width: "20%" }}
                />
                <br />
                <button type="submit" style={{ width: "20%" }}>
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p style={{ fontSize: "30px" }}>
              <strong>Details:</strong> {product.detail}
            </p>
          </div>
          <div className="col">
            <p style={{ fontSize: "30px" }}>
              <strong>Details:</strong> {product.detail}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
