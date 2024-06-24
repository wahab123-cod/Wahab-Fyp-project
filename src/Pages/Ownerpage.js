import React, { useEffect, useState } from "react";
import "../Style/Ourclubs.css";
import AddClub from "../components/models/Club/AddClub";
import EditClub from "../components/models/Club/EditClub";
import DeleteClub from "../components/models/Club/DeleteClub";
import axios from "axios";
import { BiEdit, BiTrash } from "react-icons/bi";
import { FormControl } from "react-bootstrap";
import BookingEditModel from "../components/models/Booking/BookingEditModel";
import AddEvent from "../components/models/Event/AddEvent";
import EditEvent from "../components/models/Event/EditEvent";
import DeleteEvent from "../components/models/Event/DeleteEvent";
import Footer from "./Footer";

const Ownerpage = () => {
  const [productId, setProductId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [previousEventName, setPreviousEventName] = useState("");
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [previousEventDateTime, setPreviousEventDateTime] = useState("");
  const [previousEventLocation, setPreviousEventLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [clubs, setClubs] = useState([]);
  const [showAddModel, setShowAddModel] = useState(false);
  const [previousAddress, setPreviousAddress] = useState("");
  const [previousName, setPreviousName] = useState("");
  const [previousPrice, setPreviousPrice] = useState(0);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [bookingId,setBookingId] = useState("");
  const [showEBM, setShowEBM] = useState(false);
  const [showAEM, setShowAEM] = useState(false);
  const [showEEM, setShowEEM] = useState(false);
  const [showDEM, setShowDEM] = useState(false);
  const [showEditModel, setShowEditModel] = useState(false);
  const [previousStatus, setPreviousStatus] = useState("");
  const [clubId, setClubId] = useState("");
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/events");
      setEvents(response?.data);
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
  
  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3001/bookings");
      setBookings(response?.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };
  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/bookings/${id}`);
      fetchBookings();
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };
  useEffect(() => {
    fetchClubs();
    fetchBookings();
    fetchEvents();
  }, [refresh]);
  useEffect(() => {
    // Filter the clubs array based on the search term
    const filtered = clubs.filter(
      (club) =>
        // club?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club?.address?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Set the filtered clubs state
    setFilteredClubs(filtered);
  }, [searchTerm, clubs]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search based on input value
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <div className="owner-container">
        <h2>Welcome</h2>
      
      </div>
      <div className="m-5">
        <AddClub
          show={showAddModel}
          setShow={setShowAddModel}
          refresh={refresh}
          setRefresh={setRefresh}
        />
        <EditClub
          show={showEditModel}
          setShow={setShowEditModel}
          refresh={refresh}
          setRefresh={setRefresh}
          previousAddress={previousAddress}
          previousName={previousName}
          clubId={clubId}
          previousPrice={previousPrice}
        />
        <DeleteClub
          show={showDeleteModel}
          setShow={setShowDeleteModel}
          refresh={refresh}
          setRefresh={setRefresh}
          previousName={previousName}
          clubId={clubId}
        />
        
      <BookingEditModel
        setShowEBM={setShowEBM}
        showEBM={showEBM}
        previousStatus={previousStatus}
        bookingId={bookingId}
        refresh={refresh}
        setRefresh={setRefresh}
      />
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.name}</td>
                  <td>{booking.location}</td>
                  <td>{booking?.slots[0]?.date}</td>
                  <td>
                    {booking?.slots[0]?.startTime} -{" "}
                    {booking?.slots[0]?.endTime}
                  </td>
                  <td>{booking.duration}</td>
                  <td>{booking.price}</td>
                  <td>
                    {booking?.approved
                      ? "approved"
                      : booking?.rejected
                      ? "rejected"
                      : "not approved yet"}
                  </td>
                  <td>
                    {/* <button
                      className="me-2"
                      onClick={() => handleDeleteBooking(booking._id)}
                    >
                      Delete
                    </button> */}
                    <button
                      onClick={() => {
                        setPreviousStatus(
                          booking?.approved ?? booking?.rejected
                        );
                        setBookingId(booking?._id);
                        setShowEBM(true);
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <AddEvent
          show={showAEM}
          setShow={setShowAEM}
          refresh={refresh}
          setRefresh={setRefresh}
        />
        <EditEvent
          show={showEEM}
          setShow={setShowEEM}
          refresh={refresh}
          setRefresh={setRefresh}
          previousLocation={previousEventLocation}
          previousEventName={previousEventName}
          previousEventDateTime={previousEventDateTime}
          eventId={eventId}
        />
        <DeleteEvent
          show={showDEM}
          setShow={setShowDEM}
          refresh={refresh}
          setRefresh={setRefresh}
          previousEventName={previousEventName}
          eventId={eventId}
        />
        <div className="contact-list">
          <div className="d-flex justify-content-between m-3">
            <h3>Event List</h3>
            <button className="btn btn-dark" onClick={() => setShowAEM(true)}>
              Add Event
            </button>
          </div>
          <table border="2">
            <thead>
              <tr>
                <th>Name</th>
                <th>DateTime</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events?.map((event, index) => (
                <tr key={index}>
                  <td>{event?.name}</td>
                  <td>{event?.dateTime}</td>
                  <td>{event?.location}</td>
                  <td>
                    <span className="mx-3">
                      <BiEdit
                        size={30}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setPreviousEventLocation(event?.location);
                          setPreviousEventDateTime(event?.dateTime);
                          setPreviousEventName(event?.name);
                          setEventId(event?._id);
                          setShowEEM(true);
                        }}
                      />
                    </span>
                    <span className="mx-3">
                      {console.log(event)}
                      <BiTrash
                        size={30}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setPreviousEventName(event?.name);
                          setEventId(event?._id);
                          setShowDEM(true);
                        }}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="contact-list">
          <div className="d-flex justify-content-between m-3">
            <h3>Club List</h3>
            <div className="d-flex ">
              <FormControl
                type="text"
                className="mx-2"
                placeholder="Search by location"
                value={searchTerm}
                onChange={handleSearch}
              />
              <button
                className="btn btn-dark mx-3"
                style={{ width: "10rem" }}
                onClick={() => setShowAddModel(true)}
              >
                Add Club
              </button>
            </div>
          </div>
          <table border="2">
            <thead>
              <tr>
                <th>image</th>
                <th>Name</th>
                <th>Address</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredClubs?.map((club, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={`data:image/png;base64,${club.image}`}
                      alt="Club"
                      width={200}
                    />
                  </td>
                  <td>{club?.name}</td>
                  <td>{club?.address}</td>
                  <td>{club?.price}</td>
                  <td>
                    <span className="mx-3">
                      <BiEdit
                        size={30}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setPreviousAddress(club?.address);
                          setPreviousName(club?.name);
                          setPreviousPrice(club?.price);
                          setClubId(clubs[index]?._id);
                          setShowEditModel(true);
                        }}
                      />
                    </span>
                    <span className="mx-3">
                      <BiTrash
                        size={30}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setPreviousName(club?.name);
                          setClubId(clubs[index]?._id);
                          setShowDeleteModel(true);
                        }}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    <Footer></Footer>
    </>
  );
};

export default Ownerpage;
