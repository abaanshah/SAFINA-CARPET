import multer from 'multer';
import path from 'path';

// Use memory storage, which is efficient for cloud uploads
const storage = multer.memoryStorage();

// Middleware to check if the uploaded file is a valid image type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    // Rejects the file with a specific error message
    cb(new Error('Error: You can only upload image files!'), false);
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  // --- THIS IS THE FIX ---
  // Increased the file size limit to 10MB per file.
  limits: { fileSize: 1024 * 1024 * 20 } 
});

// We use 'upload.array()' because your form can upload multiple images.
// The key 'media' must match what is sent from the AddProduct form.
export const uploadMiddleware = upload.array('media', 10);

