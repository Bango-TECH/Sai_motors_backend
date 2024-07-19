const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

let mongoConnected = false;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
        mongoConnected = true;
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        mongoConnected = false;
    });

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
    if (mongoConnected) {
        res.send("MongoDB is connected successfully.");
    } else {
        res.send("Failed to connect to MongoDB.");
    }
});

// Server listening
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
