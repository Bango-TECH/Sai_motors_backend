const mongoose = require("mongoose");

// Define schema
const imageSchema = new mongoose.Schema({
  Id: String,
  CarName: String,
  ModelName: String,
  ModelYear: String,
  Status: String,
  Details: String,
  UniqueID: String,
  images: [String], // Store multiple images
});

// Create model
const Images = mongoose.model("PickupDetails", imageSchema);

module.exports = Images;