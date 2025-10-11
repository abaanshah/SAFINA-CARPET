import Rug from "../models/rug.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinaryconfig.js";

// Your existing getRugs function, updated for flexible search
export const getRugs = async (filters) => {
  const caseInsensitiveFilters = {};
  for (const key in filters) {
    if (filters[key]) {
      caseInsensitiveFilters[key] = { 
        $regex: new RegExp(filters[key], "i") 
      };
    }
  }
  return await Rug.find(caseInsensitiveFilters);
};

// Your existing getRugById function
export const getRugById = async (rugId) => {
  if (!mongoose.Types.ObjectId.isValid(rugId)) throw new Error("Invalid Rug ID");
  const rug = await Rug.findById(rugId);
  if (!rug) throw new Error("Rug not found");
  return rug;
};

// Your existing createRug function
const generateSizeString = (shape, width, length) => {
    if (shape === 'round' && width) return `${width} ft Round`;
    if (width && length) return `${width}x${length} ft`;
    return 'Standard';
};

export const createRug = async (productData, files, userId) => { 
  const imageUrls = [];
  if (files && files.length > 0) {
    for (const file of files) {
      const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      try {
        const result = await cloudinary.uploader.upload(base64Image, {
          folder: "safina_carpets/products",
          resource_type: "auto",
        });
        imageUrls.push(result.secure_url);
      } catch (error) {
        console.error("Cloudinary upload failed:", error);
        throw new Error("Failed to upload one or more images to Cloudinary.");
      }
    }
  }

  const { 
      title, 
      description, 
      priceInr, 
      quantity, 
      material, 
      primaryColor, 
      secondaryColor, 
      width, 
      length, 
      shape, 
      pattern,
      diameter
  } = productData;
  
  let combinedColor = primaryColor || '';
  if (primaryColor && secondaryColor) { 
      combinedColor = `${primaryColor} / ${secondaryColor}`; 
  } else if (secondaryColor && !primaryColor) {
      combinedColor = secondaryColor;
  }

  const effectiveWidth = shape === 'round' ? diameter : width;

  const rug = new Rug({
    name: title,
    user: userId, 
    size: generateSizeString(shape, effectiveWidth, length),
    color: combinedColor,
    design: pattern,
    material: material,
    price: Number(priceInr) || 0,
    imageUrl: imageUrls.length > 0 ? imageUrls[0] : "/images/placeholder.jpg",
    images: imageUrls,
    shortDescription: description ? description.substring(0, 150) : '',
    description: description,
    countInStock: Number(quantity) || 0,
  });

  const createdRug = await rug.save();
  return createdRug;
};

// --- NEW: Service function to update a rug ---
export const updateRug = async (id, updateData) => {
  const rug = await Rug.findById(id);
  if (!rug) {
    return null; // The controller will handle sending a 404 response
  }
  
  // Update all fields provided in the request body
  // This is flexible and works with your Edit Product form
  Object.assign(rug, updateData);
  
  // Save the updated document
  await rug.save();
  return rug;
};

// --- NEW: Service function to delete a rug ---
export const deleteRug = async (id) => {
  const rug = await Rug.findById(id);
  if (!rug) {
    return null; // The controller will handle sending a 404 response
  }
  
  // Use the deleteOne method on the document instance to remove it
  await rug.deleteOne();
  
  return { success: true }; // Return a success confirmation
};

