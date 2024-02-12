import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Home from './components/Home';
import DeviceDetail from './DeviceDetail';
import DeviceForm from './DeviceForm';
import './Button';
import Button from './Button';
import UpdateDeviceForm from './UpdateDeviceForm';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { io } from 'socket.io-client';
//const socket = io('http://localhost:5001'); // Make sure the URL is correct

function App() {

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link exact="true" to="/" className="active">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="active">
                About
              </Link>
            </li>
          </ul>
          <Link to="/deviceform" >
            <Button />
          </Link>
        </nav>
        
        <Routes>
          <Route path="/deviceform" element={<DeviceForm />} />
          <Route path="/devices/:id" element={<DeviceDetail />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/update/:id" element={<UpdateDeviceForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
