import express from 'express';
import passport from 'passport'; // 1. Import passport

// --- 2. THE FIX: Corrected the import path to use your working middleware ---
import { protect } from '../middleware/authMiddleware.js'; 

import { 
    signupController, 
    loginController, 
    checkEmailController, 
    verifyEmailController, 
    verifyEmailLinkController,
    sendVerificationEmailController,
    getMeController,
    googleLoginController // 3. Import the new Google controller
} from '../controllers/authController.js';

const router = express.Router();


// --- Local Auth ---
router.post('/signup', signupController);
router.post('/login', loginController);

// --- Google Auth Routes ---
// 4. ADDED: This route starts the Google login process
router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'], // What we ask Google for
    session: false // We are using JWTs, not sessions
  })
);

// 5. ADDED: This is the callback route Google sends the user back to
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  googleLoginController // The final controller function
);


// --- Email Validation ---
router.post('/check-email', checkEmailController);
router.post('/verify-email', verifyEmailController);
router.get('/verify-email/:token', verifyEmailLinkController);

// --- Resend Verification Email ---
router.post('/send-verification-email', sendVerificationEmailController);

// --- User Profile Route ---
router.get('/me', protect, getMeController);


export default router;

