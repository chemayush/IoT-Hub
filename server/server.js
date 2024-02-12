
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
require('./config/dbConnection')
const { Server } = require('socket.io');
const deviceRoutes = require('./routes/deviceRoutes');
const mongoose = require('mongoose');

const http = require('http').Server(app);  
const io = require('socket.io')(http ,{
  cors:{ 
     origin:"http://localhost:8001", methods: ["GET","POST"], credentials: true, allowEIO3: true 
 }, transport: ['websocket'] });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//-------------------------------------------------------------------

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    
    const db = mongoose.connection;
    
    
    const collection = db.collection('devices'); // Replace with your actual collection name
    const changeStream = collection.watch([{ $match: { operationType: 'update', 'updateDescription.updatedFields.value': { $exists: true } } }]);

    
    changeStream.on('change', (change) => {
      console.log('change:', change);
      io.emit('valueUpdate', { deviceId: change.documentKey._id, newValue: change.updateDescription.updatedFields.value });
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }

};

connectDb();

const port = process.env.PORT;

app.use('/api/devices', deviceRoutes);

http.listen(port, () => {
    console.log(`connected on ${port}`);
});

module.exports = {app, http};




