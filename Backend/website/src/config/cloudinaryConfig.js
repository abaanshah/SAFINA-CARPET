import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables from your .env file
dotenv.config();

// Securely configure the Cloudinary SDK with your account credentials
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true // Ensures all generated URLs use HTTPS
});

export default cloudinary;

