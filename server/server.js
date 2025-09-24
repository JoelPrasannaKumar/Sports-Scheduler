// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Loads environment variables from a .env file

// Import your route handlers
const authRoutes = require('./routes/authRoutes');
const sportRoutes = require('./routes/sportRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

// --- Middleware ---

// Enable Cross-Origin Resource Sharing (CORS) to allow your React app to make requests
app.use(cors());

// Enable the Express app to parse JSON formatted request bodies
app.use(express.json());

// --- Database Connection ---

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Successfully connected to MongoDB."))
.catch(err => console.error("MongoDB connection error:", err));


// --- API Routes ---

// The server will use these routers for any request starting with the specified path
app.use('/api/auth', authRoutes);
app.use('/api/sports', sportRoutes);
app.use('/api/sessions', sessionRoutes);


// --- Start the Server ---

// Make the server listen for incoming requests on the specified port
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
module.exports = app;