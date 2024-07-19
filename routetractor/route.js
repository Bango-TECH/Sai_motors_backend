const express = require("express");
const { upload, tractoruploadImage, tractorgetImage,tractordeletrow } = require("./controller");

const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.send("Success!!!!!!");
});

// Route for image upload
router.post("/upload-image", upload, tractoruploadImage);

// Route for getting images
router.get("/get-image", tractorgetImage);

//delete
router.delete('/delet1/:UniqueID',tractordeletrow);
module.exports = router;
