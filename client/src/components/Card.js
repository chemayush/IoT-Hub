// src/Card.js

import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Card.css';
import { useDeviceContext } from '../DeviceContext';
const uri = "http://localhost:5001/api/devices/";

const Card = ({ device, onDelete, onUpdate }) => {

  const navigate = useNavigate();
  const handleCardClick = () => {
    // Navigate to the device detail page on card click
    navigate(`/devices/${device._id}`);
  };

  return (
    
      <div className="card">
      <Link to={`/devices/${device._id}`} onClick={handleCardClick}>
        <div className="card-container">
          <h3>{device.name}</h3>
          <p>Value: {device.value}</p>
        </div>
      </Link>
      <button onClick={onDelete} className="delete-button">
            <i className="fas fa-trash-alt"></i> 
      </button>
      <Link to={`/update/${device._id}`}>
      <button onClick={onUpdate} className="edit-button">
        <i className="fas fa-pencil-alt" />
      </button>
      </Link>
      </div>
  );
};

export default Card;
