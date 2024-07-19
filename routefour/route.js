const express = require("express");
const { upload, fouruploadImage, fourgetImage,fourdeletrow } = require("./controller");

const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.send("Success!!!!!!");
});

// Route for image upload
router.post("/upload-image", upload, fouruploadImage);

// Route for getting images
router.get("/get-image", fourgetImage);

//delete
router.delete('/delet1/:UniqueID',fourdeletrow);
module.exports = router;
