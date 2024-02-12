// src/DeviceForm.js

import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './DeviceForm.css';

const url = "http://localhost:5001/api/devices/";

const DeviceForm = () => {
  const [deviceName, setDeviceName] = useState('');
  const [description, setDescription] = useState('');
  const [device, setDevice] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the form data
    const formData = {
      name: deviceName,
      value: 0,
      desc: description
    };

    // Send the form data to the /api/devices endpoint using Axios
    axios.post(url, formData)
      .then((response) => {
        console.log('Form data sent successfully:');
        navigate('/')
      })
      .catch((error) => {
        console.error('Error sending form data:', error);
      });


  };

  return (
    <div className="form-container">
      <h2>New Device</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="deviceName">Device Name:   </label>
          <input
            type="text"
            id="deviceName"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:   </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
        <Link to="/">Cancel</Link>
      </form>
    </div>
  );
};

export default DeviceForm;
