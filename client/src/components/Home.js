import React from 'react';
import { useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Card from './Card';
import '../css/Card.css'
import '../App.css'

const socket = io('http://localhost:5001');

const Home = () => {
  const url = "http://localhost:5001/api/devices/";
  const [devices, setDevices] = useState([]);

  React.useEffect(() => {

    socket.on('valueUpdate', ({deviceId, newValue}) => {
      // Find the updated device by ID and update its 'value' field
      setDevices((prevDevices) =>
        prevDevices.map((device) =>
          device._id === deviceId ? { ...device, value: newValue } : device
        )
      );
    });
    
    // Fetch data from /api/devices after socket connection is established
    axios.get(url) // Make sure the URL matches your backend route
      .then((response) => {
        setDevices(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, []); // Empty dependency array ensures this effect runs only once on mount
  

  const handleDelete = (deviceId) => {
    axios.delete(`${url}${deviceId}`)
      .then((response) => {
        console.log('Device deleted successfully:', response.data);
        setDevices(devices.filter((device) => device._id !== deviceId));
      })
      .catch((error) => {
        console.error('Error deleting device:', error);
        // Add error handling logic here (e.g., show error message)
      });
  };

  

  return (
    <div className="home-container">
      <div className="cards-container">
        {devices.map((device) => (
          <Card 
          key={device._id} 
          device={device}
          onDelete={() => handleDelete(device._id)} />
        ))}
      </div>
    </div>
  );

  };

export default Home;