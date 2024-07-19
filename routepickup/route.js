const express = require("express");
const { upload, pickupuploadImage, pickupgetImage,pickupdeletrow } = require("./controller");

const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.send("Success!!!!!!");
});

// Route for image upload
router.post("/upload-image", upload, pickupuploadImage);

// Route for getting images
router.get("/get-image", pickupgetImage);

//delete
router.delete('/delet1/:UniqueID',pickupdeletrow);
module.exports = router;
