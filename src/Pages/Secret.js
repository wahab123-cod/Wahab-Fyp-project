import React, { useState, useEffect } from "react";
import "../Style/Adminpanel.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiEdit, BiTrash } from "react-icons/bi";
import AddProduct from "../components/models/Product/AddProduct";
import EditProduct from "../components/models/Product/EditProduct";
import DeleteProduct from "../components/models/Product/DeleteProduct";
import AddEvent from "../components/models/Event/AddEvent";
import EditEvent from "../components/models/Event/EditEvent";
import DeleteEvent from "../components/models/Event/DeleteEvent";
import BookingEditModel from "../components/models/Booking/BookingEditModel";
const Secret = () => {
  const [bookings, setBookings] = useState([]);
  const [bookingId,setBookingId] = useState("");
  const [contacts, setContacts] = useState([]);
  const [previousStatus, setPreviousStatus] = useState("");
  const [clubs, setClubs] = useState([]);
  const [users, setUsers] = useState([]);
  const [product, setProduct] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showAPM, setShowAPM] = useState(false);
  const [showEPM, setShowEPM] = useState(false);
  const [showEBM, setShowEBM] = useState(false);
  const [showDPM, setShowDPM] = useState(false);
  const [productId, setProductId] = useState("");
  const [showAddModel, setShowAddModel] = useState(false);
  const [previousAddress, setPreviousAddress] = useState("");
  const [previousName, setPreviousName] = useState("");
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [showEditModel, setShowEditModel] = useState(false);
  const [clubId, setClubId] = useState("");
  const [updatedData, setUpdatedData] = useState({
    name: "",
    location: "",
    date: "",
    timeSlot: "",
    price: "",
    product_name: "",
    product_price: "",
    buyer_name: "",
    product_location: "",
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
      console.error("Failed to fetch contacts:", error);
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



  const deleteProd = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/productd/${id}`);
      fetchProduct();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleUpdateBooking = async (id) => {
    try {
      await axios.put(`http://localhost:3001/bookings/${id}`, {
        name: updatedData.name,
        location: updatedData.location,
        date: updatedData.date,
        timeSlot: updatedData.timeSlot,
        price: updatedData.price,
      });
      fetchBookings();
      setUpdatedData({
        name: "",
        location: "",
        date: "",
        timeSlot: "",
        price: "",
      });
    } catch (error) {
      console.error("Failed to update booking:", error);
    }
  };

  const updateProduct = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3001/productU/${id}`, {
        name: updatedData.product_name,
        price: updatedData.product_price,
        Buyer: updatedData.buyer_name,
        Location: updatedData.product_location,
      });
      fetchProduct();
      return response?.data;
    } catch (error) {
      console.error("Failed to update product:", error);
      throw new Error("Failed to update product");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };
  const [name, setname] = useState("");
  const [location, setlocation] = useState("");
  const [timeSlot, settime] = useState("");
  const [duration, setduration] = useState("");
  const [price, setprice] = useState("");

  const handlename = (event) => {
    setname(event.target.value);
  };

  const handlelocation = (event) => {
    setlocation(event.target.value);
  };

  const handletimeslot = (event) => {
    settime(event.target.value);
  };

  const handleduration = (event) => {
    setduration(event.target.value);
  };

  const handleprice = (event) => {
    setprice(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/book", {
        location,
        timeSlot,
        name,
        duration,
        price,
      })
      .then((response) => {
        alert(response?.data.message); // Display the response message
      })
      .catch((error) => {
        alert("Failed to add booking: " + error.message); // Display error message
      });
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/bookings", {
        name: updatedData.name,
        location: updatedData.location,
        date: updatedData.date,
        timeSlot: updatedData.timeSlot,
        duration: updatedData.duration,
        price: updatedData.price,
      });
      fetchBookings();
      setUpdatedData({
        name: "",
        location: "",
        date: "",
        timeSlot: "",
        duration: "",
        price: "",
      });
    } catch (error) {
      console.error("Failed to add booking:", error);
    }
  };

  return (
    <div className="admin-panel">
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
        <h2>Welcome to the Admin Panel</h2>
        <div className="booking-list">
          {/*  <form onSubmit={handleBookingSubmit}>
            <input type="text" name="name" placeholder="Name" value={updatedData.name} onChange={handleInputChange} />
            <input type="text" name="location" placeholder="Location" value={updatedData.location} onChange={handleInputChange} />
            <input type="text" name="date" placeholder="Date" value={updatedData.date} onChange={handleInputChange} />
            <input type="text" name="timeSlot" placeholder="Time Slot" value={updatedData.timeSlot} onChange={handleInputChange} />
            <input type="text" name="duration" placeholder="Duration" value={updatedData.duration} onChange={handleInputChange} />
            <input type="text" name="price" placeholder="Price" value={updatedData.price} onChange={handleInputChange} />
            <button type="submit">Add Booking</button>
          </form>
        </div> */}
          <form onSubmit={submit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handlename}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={location}
              onChange={handlelocation}
            />
            {/*      <input type="text" name="date" placeholder="Date" value={updatedData.date} onChange={hand} /> */}
            <input
              type="text"
              name="timeSlot"
              placeholder="Time Slot"
              value={timeSlot}
              onChange={handletimeslot}
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={duration}
              onChange={handleduration}
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={price}
              onChange={handleprice}
            />
            <button type="submit">Add Booking to</button>
          </form>
        </div>
        <AddProduct
          show={showAPM}
          setShow={setShowAPM}
          refresh={refresh}
          setRefresh={setRefresh}
        />
        <EditProduct
          show={showEPM}
          setShow={setShowEPM}
          refresh={refresh}
          setRefresh={setRefresh}
          previousAddress={previousAddress}
          previousName={previousName}
          clubId={clubId}
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
          <div className="m-3">
            <h3>Product Details</h3>
          </div>
          <table border="2">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Buyer Name</th>
                <th>Sender Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {product.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.Buyer}</td>
                  <td>{product.Location}</td>
                  <td>
                    <button onClick={() => deleteProd(product._id)}>
                      Delete
                    </button>
                    <button onClick={() => updateProduct(product._id)}>
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
