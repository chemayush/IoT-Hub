// connectdb.js
const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    
    const db = mongoose.connection;
    
    const collection = db.collection('devices'); // Replace with your actual collection name
    changeStream = collection.watch();
    
    changeStream.on('change', (change) => {
      console.log('Change:', change);
      // Emit an event or take actions on change
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

module.exports = connectDb;
