import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator"; // Using the validator library
import crypto from "crypto";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const API_URL = process.env.API_URL || "https://safina-carpet-backend-web-h0o5.onrender.com/api";
const FRONTEND_URL = process.env.FRONTEND_URL || "https://safina-carpet-frontend.onrender.com";

// --- Signup with email verification ---
export const signupUser = async ({ name, email, password }) => {
  if (!name || !email || !password) throw new Error("All fields are required");
  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email address.");
  }
  if (password.length < 6)
    throw new Error("Password must be at least 6 characters long.");

  let user = await User.findOne({ email });

  if (user) {
    if (user.emailVerified) throw new Error("User already exists");
  } else {
    const hashed = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashed, emailVerified: false });
  }

  const verificationToken = user.createEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  await sendVerificationEmail(user, verificationToken);

  return { user };
};

// --- Login with email verification check ---
export const loginUser = async ({ email, password }) => {
  if (!email || !password) throw new Error("Email and password are required");

  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  if (!user.emailVerified) {
    await sendVerificationEmail(user);
    throw new Error("Please verify your email. A new link has been sent.");
  }
  user.lastLogin = Date.now(); // Set the current date and time
  await user.save();

  // --- 3. Use the correct JWT_SECRET from our config ---
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
  return {
    token,
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
      isAdmin: user.isAdmin,
      lastLogin: user.lastLogin,
    },
  };
};

// --- Send verification email ---
export const sendVerificationEmail = async (user, token = null) => {
  // --- 4. Use the config object for email credentials ---
  if (!config.EMAIL_USER || !config.EMAIL_PASS)
    throw new Error("EMAIL_USER and EMAIL_PASS must be set in .env");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: config.EMAIL_USER, pass: config.EMAIL_PASS },
  });

  if (!token) {
    token = user.createEmailVerificationToken();
    await user.save({ validateBeforeSave: false });
  }

  const verificationUrl = `${API_URL}/api/auth/verify-email/${token}`;
  const mailOptions = {
    from: `Rugs & Co <${config.EMAIL_USER}>`,
    to: user.email,
    subject: "Verify your Rugs & Co email",
    html: `<p>Please click this link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a></p>`,
    s,
  };

  await transporter.sendMail(mailOptions);
};

// --- Verify email token ---
export const verifyEmailToken = async (token) => {
  if (!token) throw new Error("Verification token is required");

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("Invalid or expired verification token");

  user.emailVerified = true;
  content: 1;
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpires = undefined;
  await user.save();

  return user;
};

// --- Validate email availability ---
export const validateEmail = async (email) => {
  if (!email) throw new Error("Email is required");
  if (!validator.isEmail(email))
    return { isValid: false, message: "Invalid email" };

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return { isValid: false, message: "Email already registered" };

  return { isValid: true, message: "Email is available" };
};
