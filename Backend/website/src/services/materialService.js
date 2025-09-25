import Material from "../models/material.js";

// Fetch all materials
export const getAllMaterials = async () => {
  return await Material.find();
};

// Add a new material
export const createMaterial = async (materialData) => {
  const newMaterial = new Material(materialData);
  return await newMaterial.save();
};
