import mongoose from "mongoose";

const RugSchema = new mongoose.Schema({
  // --- ADDED: A field to link the product to the user (admin) who created it ---
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // This creates a reference to your 'User' model
  },
  name: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  // design: { type: String, required: true },
  material: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },      // main image
  images: { type: [String], default: [] },          // extra images for gallery
  shortDescription: { type: String, default: "" },  // short description
  description: { type: String, default: "" },       // full description
  countInStock: {
    type: Number,
    required: true,
    default: 1
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

export default mongoose.model("Rug", RugSchema);

