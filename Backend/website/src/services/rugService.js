import Rug from "../models/rug.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinaryConfig.js";
import sharp from "sharp";

// ---------- Helper Function ----------
const generateSizeString = (shape, width, length, diameter) => {
  if (shape === 'round' && diameter) {
    return `${diameter} ft Round`;
  }
  if (shape === 'runner' && width && length) {
    return `${width}x${length} ft Runner`;
  }
  if (width && length) {
    return `${width}x${length} ft`;
  }
  return 'Standard'; // Fallback
};

// ---------- Get Rugs (Search + Filters) ----------
export const getRugs = async (filters) => {
  const flexibleFilters = {};
  for (const key in filters) {
    if (filters[key]) {
      flexibleFilters[key] = { $regex: new RegExp(filters[key], "i") };
    }
  }
  return await Rug.find(flexibleFilters);
};

// ---------- Get Rug by ID ----------
export const getRugById = async (rugId) => {
  if (!mongoose.Types.ObjectId.isValid(rugId)) throw new Error("Invalid Rug ID");
  const rug = await Rug.findById(rugId);
  if (!rug) throw new Error("Rug not found");
  return rug;
};

// --- THIS IS THE FULLY CORRECTED createRug FUNCTION ---
export const createRug = async (productData, files, userId) => {
  const imageUrls = [];
  if (files && files.length > 0) {
    for (const file of files) {
      try {
        // Compress the image using Sharp before uploading to Cloudinary
        const compressedBuffer = await sharp(file.buffer)
          .resize(1200, 1200, { 
            fit: 'inside', 
            withoutEnlargement: true 
          })
          .jpeg({ 
            quality: 85,
            progressive: true 
          })
          .toBuffer();

        const base64Image = `data:image/jpeg;base64,${compressedBuffer.toString("base64")}`;
        
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

  // Destructure ALL fields from the frontend form
  const {
    title,
    sku,
    description,
    personalization,
    instructionForBuyers,
    priceInr,
    priceUsd,
    quantity,
    category,
    material,
    primaryColor,
    secondaryColor,
    width,
    length,
    diameter,
    pattern,
    shape,
    type,
    pileHeight,
    room,
  } = productData;

  // --- 1. Create the nested priceData object ---
  const priceData = {
    inr: Number(priceInr) || 0,
    usd: Number(priceUsd) || 0,
  };
  
  // --- 2. Create the nested specifications object ---
  const specifications = {
    pattern,
    shape,
    primaryColor,
    secondaryColor,
    width: Number(width) || null,
    length: Number(length) || null,
    diameter: Number(diameter) || null,
    type,
    pileHeight,
    room: room ? room.split(',').map(item => item.trim()) : [],
  };

  // --- 3. Generate the top-level filterable fields ---
  const size = generateSizeString(shape, width, length, diameter);
  let combinedColor = primaryColor || '';
  if (primaryColor && secondaryColor) {
    combinedColor = `${primaryColor} / ${secondaryColor}`;
  } else if (secondaryColor && !primaryColor) {
    combinedColor = secondaryColor;
  }

  // --- 4. Create the new Rug instance with the correct structure ---
  const rug = new Rug({
    name: title,
    sku,
    user: userId,
    description,
    category,
    material,
    color: combinedColor, // The simple, filterable color
    size, // The simple, filterable size
    price: priceData.inr, // The main price (INR)
    priceData, // The full price object
    countInStock: Number(quantity) || 0,
    specifications, // The full specifications object
    personalization,
    instructionForBuyers,
    imageUrl: imageUrls.length > 0 ? imageUrls[0] : "/images/placeholder.jpg",
    images: imageUrls,
    status: 'draft',
  });

  const createdRug = await rug.save();
  return createdRug;
};

// --- THIS IS THE FULLY CORRECTED updateRug FUNCTION ---
export const updateRug = async (id, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Rug ID");

  const rug = await Rug.findById(id);
  if (!rug) return null;

  // --- THIS IS THE FIX ---
  // We now check if the incoming data is a non-empty string before updating
  // This prevents saving an empty string to a 'required: true' field.
  if (updateData.name && updateData.name.trim() !== '') rug.name = updateData.name;
  if (updateData.sku && updateData.sku.trim() !== '') rug.sku = updateData.sku;
  if (updateData.description && updateData.description.trim() !== '') rug.description = updateData.description;
  if (updateData.category && updateData.category.trim() !== '') rug.category = updateData.category;
  if (updateData.material && updateData.material.trim() !== '') rug.material = updateData.material;
  if (updateData.status) rug.status = updateData.status;

  // Safely update nested price data
  if (updateData.priceInr !== undefined) {
    rug.price = Number(updateData.priceInr) || 0;
    rug.priceData.inr = Number(updateData.priceInr) || 0;
  }
  if (updateData.priceUsd !== undefined) {
    rug.priceData.usd = Number(updateData.priceUsd) || 0;
  }
  if (updateData.countInStock !== undefined) {
    rug.countInStock = Number(updateData.countInStock) || 0;
  }
  
  // Safely update nested specifications
  if (updateData.width || updateData.length || updateData.shape || updateData.diameter) {
      rug.specifications.width = Number(updateData.width) || rug.specifications.width;
      rug.specifications.length = Number(updateData.length) || rug.specifications.length;
      rug.specifications.diameter = Number(updateData.diameter) || rug.specifications.diameter;
      rug.specifications.shape = updateData.shape || rug.specifications.shape;
      // Re-generate the top-level size string
      rug.size = generateSizeString(rug.specifications.shape, rug.specifications.width, rug.specifications.length, rug.specifications.diameter);
  }

  // ... (add any other spec fields you want to be editable) ...

  const updatedRug = await rug.save();
  return updatedRug;
};

// ---------- Delete Rug ----------
export const deleteRug = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Rug ID");
  const rug = await Rug.findById(id);
  if (!rug) return null;

  await rug.deleteOne();
  return { success: true };
};

