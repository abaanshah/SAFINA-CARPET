import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import crypto from "crypto"; // --- THIS LINE IS THE FIX ---

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    
    // --- ADDED: Fields for admin management ---
    isBlocked: { type: Boolean, required: true, default: false },
    lastLogin: { type: Date },

    // --- Fields for email verification ---
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    emailVerificationTokenExpires: { type: Date },
  },
  {
    timestamps: true, // This automatically adds 'createdAt' (Registered)
  }
);

// ... (Your existing bcrypt and token methods) ...

// Method to generate verification token
userSchema.methods.createEmailVerificationToken = function() {
  const token = crypto.randomBytes(32).toString("hex");
  this.emailVerificationToken = crypto.createHash("sha256").update(token).digest("hex");
  this.emailVerificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours expiry
  return token; // This is the plain token to send via email
};

const User = mongoose.model("User", userSchema);
export default User;

