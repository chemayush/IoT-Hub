// src/DeviceContext.js

import React, { createContext, useState, useContext } from 'react';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([]); // Initialize with fetched data

  // Function to update device value in the context
  const updateDeviceValue = (deviceId, newValue) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device._id === deviceId ? { ...device, value: newValue } : device
      )
    );
  };

  return (
    <DeviceContext.Provider value={{ devices, updateDeviceValue }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => useContext(DeviceContext);
