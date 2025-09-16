// FILE: backend/src/models/user.js (Corrected)
import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true
  },
  password: { 
    type: String,
    required: true
  },

  // --- ADD THIS BLOCK FOR ADMIN FUNCTIONALITY ---
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  // ---------------------------------------------

  emailVerified: { 
    type: Boolean, 
    default: false 
  },
  emailVerificationToken: { 
    type: String,
    index: true
  },
  emailVerificationTokenExpires: { 
    type: Date 
  },
}, { timestamps: true });

// Method to generate verification token
UserSchema.methods.createEmailVerificationToken = function() {
  const token = crypto.randomBytes(32).toString("hex");
  this.emailVerificationToken = crypto.createHash("sha256").update(token).digest("hex");
  this.emailVerificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours expiry
  return token; // This is the plain token to send via email
};

export default mongoose.model("User", UserSchema);