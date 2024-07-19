const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Route imports
const routepickup = require('./routepickup/route');
const routefour = require('./routefour/route');
const routetractor = require('./routetractor/route');

// Route usage
app.use('/pic', routepickup);
app.use('/four', routefour);
app.use('/trac', routetractor);

// Default route
app.get('/', (req, res) => {
    res.send("Running at port 8000");
});

// Server listening
app.listen(8000, () => console.log("Running at http://localhost:8000"));
