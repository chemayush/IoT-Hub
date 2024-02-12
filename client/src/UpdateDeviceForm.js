import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import './DeviceForm.css';

const url = "http://localhost:5001/api/devices/";

const UpdateDeviceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [device, setDevice] = useState({});
    const [newName, setNewName] = useState();
    const [newDesc, setNewDesc] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Create an object with the form data
        const formData = {
          name: newName,
          value: 0,
          desc: newDesc
        };
    
        // Send the form data to the /api/devices endpoint using Axios
        axios.put(`${url}${id}`, formData)
          .then((response) => {
            console.log('Form data sent successfully:');
            const putUrl = `${url}${response.data._id}`;
            navigate('/')
          })
          .catch((error) => {
            console.error('Error sending form data:', error);
          });
    
    
      };

    return (
        <div className="form-container">
          <div>
              <div>
              <form onSubmit={handleSubmit}>
                <label htmlFor="newName">New Name:</label>
                <input
                  type="text"
                  id="newName"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <br />
                <label htmlFor="newDesc">New Description:</label>
                <input
                  type="text"
                  id="newDesc"
                  value={newDesc}
                  onChange={(e) => {
                    setNewDesc(e.target.value);
                  }
                }
                />
                <br />
                <button type="submit">Update</button>
                </form>
              </div>
          </div>
        </div>
      );
};

export default UpdateDeviceForm