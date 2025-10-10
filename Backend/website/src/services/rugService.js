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

// --- UPDATED: The createRug function is now compatible with your specific RugSchema ---

const generateSizeString = (shape, width, length) => {
    if (shape === 'round' && width) return `${width} ft Round`; // Assuming width is used for diameter of round rugs
    if (width && length) return `${width}x${length} ft`;
    return 'Standard';
};

/**
 * Creates a new rug by mapping form data to the existing RugSchema.
 * @param {object} productData - The raw text data from the form.
 * @param {Array<File>} files - The array of image files from the form.
 * @param {string} userId - The ID of the authenticated admin creating the product.
 * @returns {Promise<Document>} The newly created rug document.
 */
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

  // Destructure all relevant fields from the form data
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
      diameter // Note: diameter is used if shape is round
  } = productData;
  
  // Create a combined color string for the 'color' field
  let combinedColor = primaryColor || '';
  if (primaryColor && secondaryColor) { 
      combinedColor = `${primaryColor} / ${secondaryColor}`; 
  } else if (secondaryColor && !primaryColor) {
      combinedColor = secondaryColor;
  }

  // Use diameter for width if the shape is round
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

// NOTE: The incorrect 'export default router;' line has been removed from the end of this file.

