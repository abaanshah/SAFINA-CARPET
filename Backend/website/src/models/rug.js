import mongoose from 'mongoose';
import crypto from 'crypto';

const rugSchema = mongoose.Schema(
  {
    name: { type: String, required: true }, // Mapped from 'title' in the form
    sku: { type: String, required: true, unique: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    
    // Image and Media
    imageUrl: { type: String, required: true, default: '/images/placeholder.jpg' },
    images: [{ type: String }],
    
    // Core Details for Filtering
    description: { type: String, required: true },
    // category: { type: String, required: true },
    material: { type: String, required: true },
    color: { type: String, required: true }, // The combined, filter-friendly color
    size: { type: String, required: true }, // The combined, filter-friendly size
    
    // --- Price object for INR and USD ---
    price: { type: Number, required: true, default: 0 }, // Primary price (INR)
    priceData: {
      inr: { type: Number, required: true },
      usd: { type: Number, required: true },
    },

    // Inventory
    countInStock: { type: Number, required: true, default: 0 },
    
    // --- Specifications object for all other details ---
    specifications: {
      pattern: { type: String },
      shape: { type: String },
      primaryColor: { type: String },
      secondaryColor: { type: String },
      width: { type: Number },
      length: { type: Number },
      diameter: { type: Number },
      type: { type: String },
      pileHeight: { type: String },
      room: [{ type: String }],
    },
    
    // Customization & Instructions
    personalization: { type: String },
    instructionForBuyers: { type: String },

    // Admin Status
    status: { type: String, required: true, default: 'draft' },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Note: All incorrect user-related fields and methods have been removed.

const Rug = mongoose.model('Rug', rugSchema);

export default Rug;

