import multer from 'multer';

// Use memory storage to efficiently handle files for cloud upload.
// This tells multer to keep the file as a buffer in memory instead of saving it to the server's disk.
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { 
    fileSize: 1024 * 1024 * 10 // Set a 10MB file size limit for each image
  }
});

// Create the middleware function. 
// It's configured to expect up to 10 files from a form field named 'media'.
// This 'media' key MUST match the key you use in your frontend's FormData.
export const uploadMiddleware = upload.array('media', 10);

