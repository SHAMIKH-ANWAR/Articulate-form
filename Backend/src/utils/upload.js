const { Router } = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'form-builder',
    format: 'auto',
    resource_type: 'auto',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 1000, crop: 'limit' }]
  }
});

const upload = multer({ storage: storage });

const router = Router();

router.post('/upload-image', upload.single('file'), async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ url: req.file.path });
});

module.exports = router;
