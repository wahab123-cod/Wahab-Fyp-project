import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import start from "../images/star.jpg";
import b1 from "../images/b1.jpg";
import b2 from "../images/b2.jpg";
import bal2 from "../images/ball2.jpg";
import s1 from "../images/safty.jpg";
import s2 from "../images/safty2.jpg";
import s3 from "../images/s3.jpg";
import safty from "../images/download.jpg";
import fb1 from "../images/fotbal1.jpg";
import axios from "axios";
import '../Style/Product.css'
const Product = () => {
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const products = [
    {
      id: "1",
      name: "Bet",
      pricee:2000,
      price: 1500,
      detail:
        "Cricket Bet: A reliable choice for cricket enthusiasts, offering enhanced grip and control during gameplay.",
      image: b1,
    },
    {
      id: "2",
      name: "Gloves",
      pricess:900,
      price: 500,
      detail:
        "Comfortable Fit: Bet Gloves offer a snug and comfortable fit, ensuring optimal performance during sports activities.",
      image: s1,
    },
    {
      id: "3",
      name: "Bet",
      pricess:1200,
      price: 1000,
      detail:
        "Cricket Bet: A reliable choice for cricket enthusiasts, offering enhanced grip and control during gameplay.",
      image: b2,
    },
    {
      id: "4",
      name: "Pad",
      pricess:2200,
      price: 2000,
      detail:
        "Pad: Protective gear designed to safeguard the legs of cricket players while batting or fielding.",
      image: s3,
    },
    {
      id: "5",
      name: "Ball",
      pricess:800,
      price: 500,
      detail:
        "Ball: High-quality cricket ball designed for durability and consistent performance on the field.",
      image: bal2,
    },
    {
      id: "6",
      name: "Complete Kit",
      pricess:16000,
      price: 15000,
      detail:
        "Complete Kit: Includes all necessary equipment for cricket matches, ensuring players have everything they need for optimal performance.",
      image: safty,
    },
    {
      id: "7",
      name: "Ball",
      pricess:1000,
      price: 550,
      detail:
        "Ball: High-quality cricket ball designed for durability and consistent performance on the field.",
      image: fb1,
    },
    {
      id: "8",
      name: "Helmet",
      pricess:4000,
      price: 3000,
      detail:
        "Cricket Helmet: Provides essential head protection with lightweight design for optimal comfort during cricket matches.",
      image: s2,
    },
  ];

  const product = products.find((product) => product.id === id);

  const addToCart = (productId) => {
    const productToAdd = products.find((product) => product.id === productId);
    const existingProduct = cart.find((item) => item.id === productId);
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...productToAdd, quantity: 1 }]);
    }
    setTotalPrice(totalPrice + productToAdd.price);
  };

  const removeFromCart = (productId) => {
    const existingProduct = cart.find((item) => item.id === productId);
    if (existingProduct.quantity > 1) {
      const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updatedCart);
      setTotalPrice(totalPrice - existingProduct.price);
    } else {
      const updatedCart = cart.filter((item) => item.id !== productId);
      setCart(updatedCart);
      setTotalPrice(totalPrice - existingProduct.price);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    save();
  };

  const urlToBlob = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  };

  const save = async () => {
    if (cart.length === 0) {
      alert("Please select at least one item before confirming.");
      return;
    }
    const formData = new FormData();
    for (let item of cart) {
      const imageBlob = await urlToBlob(item.image);
      formData.append("productName", item.name);
      formData.append("location", location);
      formData.append("image", imageBlob);
      formData.append("price", item.price);
      formData.append("quantity", item.quantity);
      formData.append("total", item.quantity * item.price);
    }
    axios
      .post("http://localhost:3001/orders", formData)
      .then((response) => {
        alert(response?.data.message);
        navigate("/orders");
      })
      .catch((error) => {
        console.error("Error saving product:", error);
        alert("An error occurred while saving the product.");
      });
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ color: "black" }}> <div className="col"><h1>Product Details</h1></div></div>
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
              <strong >Price:</strong> {product.price} Pkr
            </p>
            <h4 style={{color:"brown"}}> <s>Rs:{product.pricess}</s></h4>
            <p style={{ fontSize: "30px" }}>
            <strong>Details:</strong> {product.detail}

          </p>
            <h5 style={{ color: "red" }}> Brand Type : No Brand</h5>
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
            {cart.map((item) => (
              <div key={item.id}>
                <img
                  src={item.image}
                  alt=""
                  style={{ height: "100px", width: "100px" }}
                />
              <button onClick={() => removeFromCart(item.id)} style={{ marginRight: '10px' }}>-</button>
<span>{item.quantity}</span>
<button onClick={() => addToCart(item.id)} style={{ marginLeft: '10px' }}>+</button><br></br>
                <p ></p>
                <p style={{ fontSize: "16px", fontStyle: "italic", color: "gray" }}>Total Price: {totalPrice}</p>
              </div>
            ))}
          </div>

          <div className="col">
          <h3 style={{color:""}}> Delivery</h3>
          <ul>
            <li> Starting Delivery from Lahore</li><br></br>
            <li> Ship from Overseas</li><br></br>
            <li> Only cash on Delivery</li><br></br>
            <li> Services 14 days Free and Easy return </li> <br></br>
            <li>Warranty not available</li><br></br>
            </ul>
            <h3> sold by : Sports World</h3>
          </div>
          <div>
           
          <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                style={{width:"20%"}}
              /> <br></br>
              <button type="submit" style={{width:"20%"}}>Confirm</button>
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
  );
};

export default Product;
