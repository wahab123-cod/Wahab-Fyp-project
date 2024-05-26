import axios from "axios";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiTrash } from 'react-icons/bi';
import DeleteOrder from '../components/models/Order/DeleteOrder';

const UserBookings = ({ setRejectedBookings }) => {
  const [bookings, setBookings] = useState([]);
  const username = localStorage.getItem("username");
  const [refresh, setRefresh] = useState(false);
  const [showDOM, setShowDOM] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [previousName, setPreviousName] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3001/bookings");
      setBookings(response?.data);
      const rejectedBookings = response.data.filter(booking => booking.rejected);
      setRejectedBookings(rejectedBookings.length > 0);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3001/orders");
      setOrders(response?.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [refresh]);

  return (
    <div>
      <DeleteOrder
        show={showDOM}
        setShow={setShowDOM}
        refresh={refresh}
        setRefresh={setRefresh}
        previousName={previousName}
        orderId={orderId}
      />

      <div className="contact-list m-5">
        <div className=" m-3">
          <h3>Order List</h3>
        </div>
        <table border="2">
          <thead>
            <tr>
              <th>image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>buyerName</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={`data:image/png;base64,${order.image}`}
                    alt="Club"
                    width={200}
                  />
                </td>
                <td>{order?.productName}</td>
                <td>{order?.price}</td>
                <td>{order?.quantity}</td>
                <td>{order?.total}</td>
                <td>{order?.buyerName}</td>
                <td>{order?.location}</td>
                <td>
                  <span className="mx-3">
                    <BiTrash
                      size={30}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setPreviousName(order?.productName);
                        setOrderId(orders[index]?._id);
                        setShowDOM(true);
                      }}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="booking-list">
        <h3>Booking List</h3>
        <table border="2">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Status</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                {username === booking?.name && (
                  <>
                    <td>{booking.name}</td>
                    <td>{booking.location}</td>
                    <td>{booking?.slots[0]?.date}</td>
                    <td>
                      {booking?.slots[0]?.startTime} - {booking?.slots[0]?.endTime}
                    </td>
                    <td>{booking.duration}</td>
                    <td>{booking.price}</td>
                    <td>
                      {booking?.approved ? (
                        <span style={{ color: 'green', background: "white" }}>Approved</span>
                      ) : booking?.rejected ? (
                        <span style={{ color: 'red', background: "white" }}>Rejected</span>
                      ) : (
                        "Not approved yet"
                      )}
                    </td>
                    <td>
                      {booking?.rejected && (
                        <span style={{background:"white", color:"red"}}>{booking.rejectReason}</span>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBookings;

