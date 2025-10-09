import multer from 'multer';
import path from 'path';

// Set up multer for memory storage, which is efficient for cloud uploads
const storage = multer.memoryStorage();

// Middleware to check if the uploaded file is an image
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Images Only!'), false);
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
});

// We will use 'upload.array()' because your form can upload multiple images
// The '10' is the maximum number of files allowed in a single upload.
export const uploadMiddleware = upload.array('media', 10);
