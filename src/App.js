import React, { useState } from 'react';
import './Style/App.css';
import Contactus from './Pages/Contactus';
import Shop from './Pages/Shop';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Pages/Navbar';
import Abooutus from './Pages/Abooutus';
import Front from './Front';
import Footer from './Pages/Footer';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Ourclubs from './Pages/Ourclubs';
import 'bootstrap/dist/css/bootstrap.min.css';
import Booking from './Pages/Booking';
import Rules from './Pages/Rules';
import Secret from './Pages/Secret';
import DHA from './Pages/DHA';
import Johartown from './Pages/Johartown';
import Behria from './Pages/Behria';
import Searchbar from './Pages/Searchbar';
import Info from './Pages/Info';
import Product from './Pages/Product';
import Events from './Pages/Events';
import OwnerRegister from './Pages/OwnerRegister';
import Ownerlogin from './Pages/Ownerlogin';
import Ownerpage from './Pages/Ownerpage';
import Orders from './Pages/Orders';
import UserBookings from './Pages/UserBookings';
import Profile from './Pages/Profile';

function App() {
  const [hasRejectedBookings, setHasRejectedBookings] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Navbar hasRejectedBookings={hasRejectedBookings} />
        <div className="container-fluid">
          <Routes>
            <Route path="/rules" element={<Rules />}>
              <Route path="secret" element={<Secret />} />
            </Route>
            <Route path="/" element={<Front />} />
            <Route path="/userbookings" element={<UserBookings setHasRejectedBookings={setHasRejectedBookings} />} />
            <Route path="/ourclubs" element={<Ourclubs />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/abooutus" element={<Abooutus />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/events" element={<Events />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/ownerregister" element={<OwnerRegister />} />
            <Route path="/ownerpage" element={<Ownerpage />} />
            <Route path="/ownerlogin" element={<Ownerlogin />} />
            <Route path="/searchbar" element={<Searchbar />} />
            <Route path="/dha" element={<DHA />} />
            <Route path="/johartown" element={<Johartown />} />
            <Route path="/behria" element={<Behria />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/info" element={<Info />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <br />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
