// models/material.js
import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true },        // Material name
  image: { type: String, required: true },       // Image URL
  bgColor: { type: String, required: true },     // Background color for the card
});

const Material = mongoose.model("Material", materialSchema, "material");

export default Material;
