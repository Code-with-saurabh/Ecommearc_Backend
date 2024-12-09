const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoDB = 'mongodb+srv://gpgazhmrj:NiIAmKaqmT6CxKrz@cluster0.rdhlq.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0';   

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB: ' + err);
});

// Import routes
const usersRouter = require('./routes/users');

// Use routes
app.use('/api/users', usersRouter);

// Start the server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
