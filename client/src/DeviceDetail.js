// src/DeviceDetail.js

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './DeviceDetail.css';

const url = "http://localhost:5001/api/devices/";

const DeviceDetail = () => {
  const params = useParams();
  const id = params.id; // Get the device ID from the URL params
  const [device, setDevice] = useState(null);

  React.useEffect(() => {
    axios.get(`${url}${id}`)
      .then((response) => {
        setDevice(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching device data:', error);
      });
  }, [id]); // Run the effect whenever the ID changes

  if (!device) {
    return <div>Loading...</div>;
  }

  return (
    <div className='device-card' >
      <div className='device-info'>
        <p><strong>Device ID:  </strong>{device._id}</p>
        <p><strong>Name:  </strong>{device.name}</p>
        <p><strong>Value:  </strong>{device.value}</p>
        <p><strong>Description:  </strong>{device.desc}</p>
      </div>
    </div>
  );
};

export default DeviceDetail;
