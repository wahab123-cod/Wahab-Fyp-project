import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import sportsLogo from "../images/logosport-removebg-preview.png";
import bell from "../images/bell_1-removebg-preview.png";

const Navbar = () => {
  const username = localStorage.getItem("username");
  const profileImage = localStorage.getItem("profileImage");
  const navigate = useNavigate();
  const [hasRejectedBookings, setHasRejectedBookings] = useState(false);

  useEffect(() => {
    // Fetch initial value of hasRejectedBookings from localStorage
    const initialRejectedStatus = localStorage.getItem("hasRejectedBookings");
    if (initialRejectedStatus) {
      setHasRejectedBookings(JSON.parse(initialRejectedStatus));
    }
  }, []); // Run once on component mount to initialize state from localStorage

  useEffect(() => {
    // Check if username is available in local storage
    if (username) {
      // Fetch bookings when username is available
      fetchBookings();
    }
  }, [username]); // Dependency on username changes

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3001/bookings");
      const rejectedBookings = response.data.filter((booking) => booking.rejected);
      const hasRejected = rejectedBookings.length > 0;
      setHasRejectedBookings(hasRejected);
      // Store in local storage for persistence
      localStorage.setItem("hasRejectedBookings", JSON.stringify(hasRejected));
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const CustomDropdownToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={onClick}
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "lightgray",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {profileImage ? (
        <img src={`http://localhost:3001/${profileImage}`} alt="Profile" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
      ) : (
        children.charAt(0)
      )}
    </div>
  ));

  const handleLogout = () => {
    localStorage.setItem("username", "");
    localStorage.removeItem("hasRejectedBookings"); // Clear rejected bookings on logout
    setHasRejectedBookings(false); // Reset state
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#2c3e50" }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/" style={{ marginBottom: "10px" }}>
          <img src={sportsLogo} alt="Sports Logo" style={{ height: "150px", float: "left", marginRight: "100px" }} />
          <span style={{ color: "#fff", fontSize: "40px" }}>Indoor Sports</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                style={{
                  color: "#fff",
                  fontSize: "1.5rem",
                  transition: "color 0.3s ease",
                  marginRight: "20px",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#f0f0f0")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/ourclubs"
                style={{
                  color: "#fff",
                  fontSize: "1.5rem",
                  transition: "color 0.3s ease",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#f0f0f0")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
              >
                Clubs
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/events"
                style={{
                  color: "#fff",
                  fontSize: "1.5rem",
                  transition: "color 0.3s ease",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#f0f0f0")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
              >
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/shop"
                style={{
                  color: "#fff",
                  fontSize: "1.5rem",
                  transition: "color 0.3s ease",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#f0f0f0")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
              >
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/abooutus"
                style={{
                  color: "#fff",
                  fontSize: "1.5rem",
                  transition: "color 0.3s ease",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#f0f0f0")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contactus"
                style={{
                  color: "#fff",
                  fontSize: "1.5rem",
                  transition: "color 0.3s ease",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#f0f0f0")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
              >
                Contact Us
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {username ? (
              <li className="nav-item">
                <Link
                  className="nav-link position-relative"
                  to="/userbookings"
                  style={{
                    color: "#fff",
                    fontSize: "1.5rem",
                    transition: "color 0.3s ease",
                    marginLeft: "20px",
                    marginRight: "20px",
                    position: "relative",
                  }}
                >
                  Bookings
                  <span
                    className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger"
                    style={{
                      fontSize: "7px",
                      marginLeft: "65px",
                      marginTop: "10px",
                      display: hasRejectedBookings ? "inline" : "none",
                      transform: "translate(-50%, -50%)",
                      color: "red",
                    }}
                  >
                    .
                  </span>
                  <img src={bell} style={{ width: "30px" }} alt="Bell Icon" />
                </Link>
              </li>
            ) : null}
            {username ? (
              <li className="nav-item dropdown">
                <Dropdown>
                  <Dropdown.Toggle
                    as={CustomDropdownToggle}
                    variant="light"
                    id="dropdown-basic"
                    className="mt-2"
                    style={{ color: "#fff", fontSize: "1.5rem" }}
                  >
                    {username}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate("/profile")} style={{ color: "#000" }}>
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout} style={{ color: "#000" }}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/signup"
                  style={{
                    color: "#fff",
                    fontSize: "1.5rem",
                    transition: "color 0.3s ease",
                    marginLeft: "20px",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#f0f0f0")}
                  onMouseLeave={(e) => (e.target.style.color = "#fff")}
                >
                  Signup
                </Link>
                <Link
                  className="nav-link"
                  to="/login"
                  style={{
                    color: "#fff",
                    fontSize: "1.5rem",
                    transition: "color 0.3s ease",
                    marginLeft: "20px",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#f0f0f0")}
                  onMouseLeave={(e) => (e.target.style.color = "#fff")}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
