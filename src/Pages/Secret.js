import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../Style/Adminpanel.css'
import AddProduct from "../components/models/Product/AddProduct";
import EditProduct from "../components/models/Product/EditProduct";
import DeleteProduct from "../components/models/Product/DeleteProduct";

const Secret = () => {
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [users, setUsers] = useState([]);
  const [product, setProduct] = useState([]);
  const [showAPM, setShowAPM] = useState(false);
  const [showEPM, setShowEPM] = useState(false);
  const [showDPM, setShowDPM] = useState(false);

  const [previousAddress, setPreviousAddress] = useState("");

  const [clubId, setClubId] = useState("");
  const [showAddModel, setShowAddModel] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [productId, setProductId] = useState("");
  const [previousName, setPreviousName] = useState("");
  const [previousPrice, setPreviousPrice] = useState("");
  const [previousBuyer, setPreviousBuyer] = useState("");
  const [previousLocation, setPreviousLocation] = useState("");
  const [previousImage, setPreviousImage] = useState("");
  const [updatedData, setUpdatedData] = useState({
    product_name: "",
    product_price: "",
    buyer_name: "",
    product_location: "",
    product_image:""
  });

  useEffect(() => {
    fetchBookings();
    fetchContacts();
    fetchUsers();
    fetchProduct();
    fetchClubs();
  }, [refresh]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3001/bookings");
      setBookings(response?.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };
  const fetchProduct = async () => {
    try {
      const resp = await axios.get("http://localhost:3001/infoP");
      console.log("Product data:", resp.data); // Check the structure and content of resp.data
      setProduct(resp?.data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };


  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/contacts");
      setContacts(response?.data);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  const fetchClubs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/clubs");
      setClubs(response?.data);
    } catch (error) {
      console.error("Failed to fetch clubs:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/show");
      setUsers(response?.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleDeleteProduct = (id, name) => {
    setProductId(id);
    setPreviousName(name);
    setShowDPM(true);
  };

  const updateProduct = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3001/productU/${id}`, {
        name: updatedData.product_name,
        price: updatedData.product_price,
        Buyer: updatedData.buyer_name,
        Location: updatedData.product_location,
        image:updatedData.product_image
      });
      fetchProduct(); // Refresh product list after update
      console.log("Product updated successfully:", response.data);
      resetForm(); // Optionally reset form fields after update
      return response?.data;
    } catch (error) {
      console.error("Failed to update product:", error);
      throw new Error("Failed to update product");
    }
  };

  const resetForm = () => {
    setUpdatedData({
      product_name: "",
      product_price: "",
      buyer_name: "",
      product_location: "",
      product_image:""
    });
  };


  return (
    <div className="admin-panel">
      <AddProduct
        show={showAddModel}
        setShow={setShowAddModel}
        refresh={refresh}
        setRefresh={setRefresh}
      />

      <aside className="sidebar">
        <nav>
          <ul>
            <li>
              <Link to="#">Dashboard</Link>
            </li>
            <li>
              <Link to="/info">Information</Link>
            </li>
            <li>
              <Link to="/rules">Logout</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="main-content">
      
        <div className="contact-list">
          <div className="d-flex justify-content-between m-3">
            <button
              className="btn btn-dark mx-3"
              style={{ width: "10rem" }}
              onClick={() => setShowAddModel(true)}
            >
              Add Product
            </button>
          </div>
        </div>

        <div className="contact-list">
          <div className="m-3">
            <h3>Product Details</h3>
          </div>
          <table border="2">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Buyer Name</th>
                <th>Stock</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {product.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.buyer}</td>
                  <td>{product.location}</td>
                  <td>
                    <img
                      src={product.image}
                      alt="product"
                      width={40}
                      style={{ height: "auto" }}

                    />

                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteProduct(product._id, product.name)}
                    >
                      Delete
                    </button>
                    <button onClick={() => {
                      setProductId(product._id);
                      setUpdatedData({
                        product_name: product.name,
                        product_price: product.price,
                        buyer_name: product.buyer,
                        product_location: product.location,
                      });
                      setShowEPM(true);
                    }}>
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <EditProduct
          show={showEPM}
          setShow={setShowEPM}
          refresh={refresh}
          setRefresh={setRefresh}
          productId={productId}
          previousName={previousName}
          updatedData={updatedData}
          setUpdatedData={setUpdatedData}
          updateProduct={updateProduct}
        />

        <DeleteProduct
          show={showDPM}
          setShow={setShowDPM}
          refresh={refresh}
          setRefresh={setRefresh}
          previousName={previousName}
          productId={productId}
        />

        <div className="contact-list">
          <h3>Contact List</h3>
          <table border="2">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.messag}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="user-list">
          <h3>User List</h3>
          <table border="2">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Secret;
