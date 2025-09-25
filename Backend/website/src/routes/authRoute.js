// ===================================================================
// FILE: src/routes/authRoute.js (Final Corrected Version)
// ===================================================================
import express from 'express';
import { protect } from '../middleware/auth.js';

// --- THIS IMPORT BLOCK IS NOW CORRECT ---
import { 
    signupController, 
    loginController, 
    checkEmailController, 
    verifyEmailController, 
    verifyEmailLinkController,
    sendVerificationEmailController,
    getMeController // It is now included in the list
} from '../controllers/authController.js';

const router = express.Router();


// Local Auth
router.post('/signup', signupController);
router.post('/login', loginController);

// Email Validation
router.post('/check-email', checkEmailController);

// Email Verification
router.post('/verify-email', verifyEmailController);
router.get('/verify-email/:token', verifyEmailLinkController);

// Resend Verification Email
router.post('/send-verification-email', sendVerificationEmailController);

// Protected route for getting the current user's data from a token
router.get('/me', protect, getMeController);


export default router;