import {
  signupUser,
  loginUser,
  validateEmail,
  sendVerificationEmail,
  verifyEmailToken,
} from "../services/authService.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import config from "../config/index.js"; // contains FRONTEND_URL, ADMIN_URL, JWT_SECRET, etc.

// --- Signup Controller ---
export const signupController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    await signupUser({ name, email, password });
    res
      .status(201)
      .json({
        message:
          "Signup successful! Please check your email to verify your account.",
      });
  } catch (error) {
    next(error);
  }
};

// --- Login Controller ---
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser({ email, password });
    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

// --- Verify Email Link Controller ---
export const verifyEmailLinkController = async (req, res, next) => {
  const FRONTEND_URL = config.FRONTEND_URL || "https://safina-carpet-frontend.onrender.com";
  try {
    const { token } = req.params;
    await verifyEmailToken(token);

    const successMessage = encodeURIComponent(
      "Email verified successfully! You can now log in."
    );
    res.redirect(`${FRONTEND_URL}/login?message=${successMessage}`);
  } catch (error) {
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
      return res.status(200).json({ message: "Email is available!" });
    } else {
      return res.status(409).json({ message: isEmailValid.message });
    }
  } catch (error) {
    next(error);
  }
};

// --- Verify Email via POST ---
export const verifyEmailController = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token)
      return res.status(400).json({ message: "Verification token is required." });

    const user = await verifyEmailToken(token);

    res.status(200).json({
      message: "Email verified successfully!",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};

// --- Resend Verification Email ---
export const sendVerificationEmailController = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ message: "Email is required." });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found." });

    if (user.emailVerified) {
      return res.status(400).json({ message: "Email is already verified." });
    }

    await sendVerificationEmail(user);

    res.status(200).json({
      message: "Verification email sent successfully!",
    });
  } catch (error) {
    next(error);
  }
};

// --- Get Me Controller ---
export const getMeController = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

// --- Helper: Generate JWT Token ---
const generateToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, { expiresIn: "1d" });
};

// --- Google Login Controller ---
export const googleLoginController = (req, res) => {
  const token = generateToken(req.user._id);

  if (req.user.isAdmin) {
    res.redirect(`${config.ADMIN_URL}/auth/callback?token=${token}`);
  } else {
    res.redirect(`${config.FRONTEND_URL}/auth/callback?token=${token}`);
  }
};
