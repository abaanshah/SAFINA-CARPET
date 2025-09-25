import { signupUser, loginUser, validateEmail, sendVerificationEmail, verifyEmailToken } from '../services/authService.js';
import User from '../models/user.js';

// --- Signup Controller ---
export const signupController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    await signupUser({ name, email, password });
    res.status(201).json({ message: "Signup successful! Please check your email to verify your account." });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser({ email, password });
    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

// --- Verify Email Link Controller (This is the function that handles the link) ---
export const verifyEmailLinkController = async (req, res, next) => {
  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
  try {
    const { token } = req.params;
    await verifyEmailToken(token);
    
    // On success, redirect to the login page with a success message.
    const successMessage = encodeURIComponent("Email verified successfully! You can now log in.");
    res.redirect(`${FRONTEND_URL}/login?message=${successMessage}`);

  } catch (error) {
    // On failure, redirect to the login page with an error message.
    const errorMessage = encodeURIComponent(error.message);
    res.redirect(`${FRONTEND_URL}/login?error=${errorMessage}`);
  }
};

// --- Check Email Availability Controller ---
export const checkEmailController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isEmailValid = await validateEmail(email);
    if (isEmailValid.isValid) {
      return res.status(200).json({ message: 'Email is available!' });
    } else {
      return res.status(409).json({ message: isEmailValid.message });
    }
  } catch (error) {
    next(error);
  }
};

// --- Verify Email via POST request ---
export const verifyEmailController = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Verification token is required." });

    const user = await verifyEmailToken(token);

    res.status(200).json({
      message: "Email verified successfully!",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified
      }
    });
  } catch (error) {
    next(error);
  }
};

// --- Resend Verification Email Controller ---
export const sendVerificationEmailController = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required." });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });
    
    if (user.emailVerified) {
      return res.status(400).json({ message: "Email is already verified." });
    }

    await sendVerificationEmail(user);
    
    res.status(200).json({
      message: "Verification email sent successfully!"
    });
  } catch (error) {
    next(error);
  }
};

export const getMeController = async (req, res, next) => {
  // The 'protect' middleware has already run and attached the user to req.user
  // We just need to send it back.
  res.status(200).json(req.user);
};

