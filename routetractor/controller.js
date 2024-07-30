const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const tractormodal = require("./model");
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer configuration for image upload to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'car_images', // Folder name in Cloudinary
    format: async (req, file) => {
      const ext = file.mimetype.split('/')[1];
      return ext === 'jpeg' ? 'jpg' : ext;
    }, // Supports promises as well
    public_id: (req, file) => Date.now() + '-' + file.originalname.split('.')[0],
  },
});

// File filter for multer to accept only jpeg, jpg, and png formats
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Controller for image upload
const tractoruploadImage = async (req, res) => {
  console.log("Request Body:", req.body);
  const { Id, CarName, ModelName, ModelYear, Status, Details, UniqueID } = req.body;

  if (!req.files || req.files.length === 0) {
    console.log("No files uploaded");
    return res.status(400).json({ status: "error", message: "File upload failed" });
  }

  const imageUrls = req.files.map(file => file.path);
  console.log("Image URLs:", imageUrls);

  try {
    await tractormodal.create({
      Id,
      CarName,
      ModelName,
      ModelYear,
      Status,
      Details,
      UniqueID,
      images: imageUrls,
    });
    res.json({ status: "ok" });
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Controller for getting images
const tractorgetImage = async (req, res) => {
  try {
    const data = await tractormodal.find({});
    res.json({ status: "ok", data: data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Controller for deleting images
const tractordeletrow = async (req, res) => {
  try {
    const { UniqueID } = req.params;
    const data = await tractormodal.findOneAndDelete({ UniqueID });
    if (data) {
      // Deleting images from Cloudinary
      const imageUrls = data.images;
      for (const url of imageUrls) {
        const publicId = url.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }
      res.status(200).send({ msg: 'Data deleted successfully' });
    } else {
      res.status(400).send({ msg: 'Data not found' });
    }
  } catch (err) {
    console.error("Error deleting data:", err);
    res.status(500).send({ status: "error", message: err.message });
  }
};

module.exports = {
  upload: upload.array('images', 10), // Accept up to 10 images at a time
  tractoruploadImage,
  tractorgetImage,
  tractordeletrow,
};
