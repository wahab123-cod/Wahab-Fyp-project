import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import crick4 from "../images/crick4.jpg";
import footbal2 from "../images/football1.jpg";
import crick from "../images/crick1.jpg";
import football from "../images/footbal.jpg";
import crick3 from "../images/crik3.jpg";
import basket from "../images/basket.jpg";
import s1 from "../images/safty.jpg";
import b2 from "../images/b2.jpg";
import bal2 from "../images/ball2.jpg";
import safty from "../images/download.jpg";
import "../Style/Ourclubs.css";
import SlotList from "../components/slots/TimeSlots";

const Booking = () => {
  const { id } = useParams();
  const [clubs, setClubs] = useState([]);
  const [requiredIndex, setRequiredIndex] = useState();
  const [selectedSlots, setSelectedSlots] = useState([]);
  useEffect(() => {
    fetchClubs();
  }, []);
  const fetchClubs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/clubs");
      setClubs(response?.data);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };
  useEffect(() => {
    const index = clubs.findIndex((item) => {
      console.log(item?._id,'ha k ni',id)
      return item?._id === id;
    });
    setRequiredIndex(index);
  }, [clubs]);
  let bookingInfo = {};
  switch (id) {
    case "1":
      bookingInfo = {
        name: "Booking 1",
        price: 3000,
        location: "Wapda Town H Block, Lahore",
        detail:
          "Sports Facilities: Wapda Town Sports Club likely provides facilities for various sports such as cricket, football, tennis, and more.",
        image: crick4,
        map: {
          width: "400px",
          height: "200px",
          mapUrl:
            'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13617.41379294297!2d74.2617481!3d31.43193515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1707907914512!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        },
      };
      break;
    case "2":
      bookingInfo = {
        name: "Booking 2",
        price: 3500,
        location: "DHA phase 6 D block, Lahore",
        detail:
          "Sports Facilities: DHA Sports Club likely provides facilities for various sports such as cricket, football, tennis, and more.",
        image: footbal2,
        map: {
          width: "400px",
          height: "200px",
          mapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54446.51735170851!2d74.41479486354713!3d31.471735161731456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190920e59fccd3%3A0x56cae6ee2c7a479b!2sDHA%20Phase%206%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1707908656394!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        },
      };
      break;
    case "3":
      bookingInfo = {
        name: "Booking 3",
        price: 2500,
        location: "Phase 1 block Johar Town, Lahore, Punjab, Pakistan",
        detail:
          "Sports Facilities: Johar Town Town Sports Club likely provides facilities for various sports such as cricket, football, tennis, and more.",
        image: crick,
        map: {
          width: "400px",
          height: "200px",
          mapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.5826307623806!2d74.2885408728787!3d31.45315525046457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391901424d8039f1%3A0x6fce51f2b69628c9!2sC1%20St%2C%20Phase%201%20Johar%20Town%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1707908797728!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        },
      };
      break;
    case "4":
      bookingInfo = {
        name: "Booking 4",
        price: 2200,
        location: "Saggian Pull Lahore",
        detail:
          "Sports Facilities: Saggian Pull Sports Club likely provides facilities for various sports such as cricket, football, tennis, and more.",
        image: football,
        map: {
          width: "400px",
          height: "200px",
          mapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.315492369044!2d74.4184984728809!3d31.488010848744885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190fa8e2dfb39d%3A0x3050dc9c3fee90b6!2sIndoor%20Cricket!5e0!3m2!1sen!2s!4v1707908879928!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        },
      };
      break;
    case "5":
      bookingInfo = {
        name: "Booking 5",
        price: 2500,
        location: "Model Town Link Road near Amanah Mall, Lahore",
        detail:
          "Sports Facilities: Model Town Sports Club likely provides facilities for various sports such as cricket, football, tennis, and more.",
        image: crick3,
        map: {
          width: "400px",
          height: "200px",
          mapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.0021783083853!2d74.31507417287968!3d31.46912624967689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391906abcd5d4f1b%3A0xbd125569714307c6!2sModel%20Town%20Link%20Rd%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1707908922536!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        },
      };
      break;
    case "6":
      bookingInfo = {
        name: "Booking 6",
        price: 2000,
        location: "Kareem Park Lahore",
        detail:
          "Sports Facilities: Kareem Park Sports Club likely provides facilities for various sports such as cricket, football, tennis, and more.",
        image: basket,
        map: {
          width: "400px",
          height: "200px",
          mapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27189.257502482295!2d74.26460747134944!3d31.588447405065182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191ced832f6051%3A0xa61f77a95a044ed1!2sKareem%20Park%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1707908966189!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        },
      };
      break;
    case clubs[requiredIndex]?._id:
      bookingInfo = {
        name: clubs[requiredIndex]?.name,
        price: clubs[requiredIndex]?.price,
        location: clubs[requiredIndex]?.address,
        detail:
          "Sports Facilities: Kareem Park Sports Club likely provides facilities for various sports such as cricket, football, tennis, and more.",
        image: `data:image/png;base64,${clubs[requiredIndex]?.image}`,
        map: {
          width: "400px",
          height: "200px",
          mapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27189.257502482295!2d74.26460747134944!3d31.588447405065182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191ced832f6051%3A0xa61f77a95a044ed1!2sKareem%20Park%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1707908966189!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        },
      };
      break;
    default:
      bookingInfo = {
        name: "",
        price: 0,
        location: "",
        detail: "",
        image: "",
      };
  }

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [username, setUsername] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [price, setPrice] = useState(0);

  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleDurationChange = (event) => {
    setSelectedDuration(parseInt(event.target.value));
    setPrice(bookingInfo.price * parseInt(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const totalPrice = bookingInfo.price * selectedDuration;

    try {
    /*   if (!username.trim()) {
        throw new Error("Username is required.");
      } */

      const response = await axios.post("http://localhost:3001/book", {
        location: bookingInfo.location,
        date: selectedDate,
        slots: selectedSlots,
        duration: selectedDuration,
        name: username,
        price: totalPrice,
        rejected: false,
        approved: false,
      });

      setBookingMessage(response?.data.message);
      alert("Booking successful!");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert(error.response?.data.message);
        } else if (error.response.status === 500) {
          alert("Internal server error. Please try again later.");
        }
      } else {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="booking-page">
          <h1>Booking Details</h1>
          <div></div>
          <div className="row">
            <div className="col">
              <img
                src={bookingInfo.image}
                alt=""
                style={{ height: "420px", width: "500px" }}
              />
            </div>

            <div className="col">
              <h2>{bookingInfo.name}</h2>
              <p style={{ fontSize: "25px" }}>
                <strong>Price:</strong> {bookingInfo.price} Per Hour
              </p>
              <p style={{ fontSize: "25px" }}>
                <strong>Location:</strong> {bookingInfo.location}
              </p>
              <p style={{ fontSize: "15px" }}>
                <strong>Details:</strong> {bookingInfo.detail}
              </p>
              <div></div>
              <div className="col">
                <iframe
                  title="Map"
                  width={400}
                  height={200}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  aria-hidden="false"
                  src={
                    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27189.257502482295!2d74.26460747134944!3d31.588447405065182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191ced832f6051%3A0xa61f77a95a044ed1!2sKareem%20Park%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1707908966189!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
                  }
                ></iframe>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="col">
                <label>Enter Your Name</label>
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                  style={{ width: "200px" }}
                  placeholder="Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  value={selectedDate || new Date().toISOString().split("T")[0]}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={handleDateChange}
                  required
                />
              </div>
              <SlotList
                selectedSlots={selectedSlots}
                setSelectedSlots={setSelectedSlots}
              />
              {/* <div className="form-group">
                <label htmlFor="time-slot">Time Slot:</label>
                <select
                  id="time-slot"
                  value={selectedTimeSlot}
                  onChange={handleTimeSlotChange}
                  required
                >
                  <option value="">Select a time slot</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div> */}
              {/* <div className="form-group">
                <label htmlFor="duration">Duration:</label>
                <select
                  id="duration"
                  value={selectedDuration}
                  onChange={handleDurationChange}
                  required
                >
                  <option value={1}>1 hour</option>
                  <option value={2}>2 hours</option>
                  <option value={3}>3 hours</option>
                </select>
              </div> */}
              <p>Total price is: {price}</p>
              <div className="roduct-inner">
              <button>
                Book Now
              </button>
              </div>
              {bookingMessage && (
                <p style={{ color: "green", textAlign: "center" }}>
                  {bookingMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="product-box">
            <div className="product-inner">
              <img src={s1} alt="" />
              <p className="name">Gloves</p>
              <p className="price">Price: 500</p>
              <Link to="/product/2">
                <button style={{ width: "100%", height: "60px" }}>
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="product-box">
            <div className="product-inner">
              <img src={b2} alt="" />
              <p className="name">Bat</p>
              <p className="price">Price: 1000</p>
              <Link to="/product/3">
                <button style={{ width: "100%", height: "60px" }}>
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="product-box">
            <div className="product-inner">
              <img src={bal2} alt="" />
              <p className="name">Ball</p>
              <p className="price">Price: 500</p>
              <Link to="/product/5">
                <button style={{ width: "100%", height: "60px" }}>
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="product-box">
            <div className="product-inner">
              <img src={safty} alt="" />
              <p className="name">Complete Kit</p>
              <p className="price">Price : 15000</p>
              <Link to="/product/6">
                <button style={{ width: "100%", height: "60px" }}>
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
