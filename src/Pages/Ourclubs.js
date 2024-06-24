import crick from "../images/crick1.jpg";
import "../Style/Ourclubs.css";
import basket from "../images/basket.jpg";
import football from "../images/footbal.jpg";
import footbal2 from "../images/football1.jpg";
import crick3 from "../images/crik3.jpg";
import crick4 from "../images/crick4.jpg";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Col, FormControl, Row } from "react-bootstrap";
const Ourclubs = () => {
  const [hasRejectedBookings, setHasRejectedBookings] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [lowestPrice, setLowestPrice] = useState("");
  
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
    // Filter the clubs array based on the search term and lowest price
    const filtered = clubs.filter(club =>
      (
        // club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.address.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (lowestPrice === 0 || lowestPrice === "" || club.price <= lowestPrice)
    );
    // Set the filtered clubs state
    setFilteredClubs(filtered);
  }, [searchTerm, lowestPrice, clubs]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search based on input value
    setSearchTerm(e.target.value);
  };
  const handlePriceChange = (e) => {
    const price = e.target.value;
    setLowestPrice(price);
  };
  return (
    <div className="">
  <Navbar hasRejectedBookings={hasRejectedBookings} />
      <div className="container">
        <div className="row">
          <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
            {" "}
            Our clubs{" "}
          </h1>
        </div>
        
      <div style={{width:"24rem"}}>
      <Row>
        <Col>
            <FormControl
              type="text"
              placeholder="Search by location"
              value={searchTerm}
              onChange={handleSearch}
            />
        </Col>
        <Col>
            <FormControl
              type="number"
              placeholder="Lowest price"
              value={lowestPrice}
              onChange={handlePriceChange}
            />
        </Col>
      </Row>
      </div>
        <div className="row">
          {filteredClubs?.map((club, index) => (
            <div className="col-4" key={index}>
              <div className="feature">
                <img
                  src={`data:image/png;base64,${club.image}`}
                  alt=""
                  style={{ width: "100%", height: "320px" }}
                />
                <h2>{club?.name}</h2>
                <p>{club?.address}</p>
                <p>{club?.price}</p>
                <Link to={`/booking/${club?._id}`}>
                  <button style={{ width: "100%", height: "60px" }}>
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <section className="feature-section">
            <div className="col">
              <div className="feature">
                <img
                  src={crick4}
                  alt=""
                  style={{ width: "100%", height: "320px" }}
                />
                <h2>Cricket</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/1">
                  <button style={{ width: "100%", height: "60px" }}>
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="feature">
                <img
                  src={footbal2}
                  alt=""
                  style={{ width: "100%", height: "320px" }}
                />
                <h2>Football</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/2">
                  <button style={{ width: "100%", height: "60px" }}>
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="feature">
                <img
                  src={crick}
                  alt=""
                  style={{ width: "100%", height: "320px" }}
                />
                <h2>Cricket</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/3">
                  <button style={{ width: "100%", height: "60px" }}>
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </div>
        <div className="row">
          <section className="feature-section">
            <div className="col">
              <div className="feature">
                <img
                  src={football}
                  alt=""
                  style={{ width: "100%", height: "320px" }}
                />
                <h2>Football</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/4">
                  <button style={{ width: "100%", height: "60px" }}>
                    Book Now
                  </button>
                </Link>
              </div>
            </div>

            <div className="col">
              <div className="feature">
                <img
                  src={crick3}
                  alt=""
                  style={{ width: "100%", height: "320px" }}
                />
                <h2>Cricket</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/5">
                  <button style={{ width: "100%", height: "60px" }}>
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="feature">
                <img
                  src={basket}
                  alt=""
                  style={{ width: "100%", height: "320px" }}
                />
                <h2>Football</h2>
                <p>Lahore, Punjab, Pakistan</p>
                <Link to="/booking/6">
                  <button style={{ width: "100%", height: "60px" }}>
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Ourclubs;
