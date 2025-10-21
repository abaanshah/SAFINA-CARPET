import Rug from "../models/rug.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinaryConfig.js";

// ---------- Helper Function ----------
const generateSizeString = (shape, width, length) => {
  if (shape === "round" && width) return `${width} ft Round`;
  if (width && length) return `${width}x${length} ft`;
  return "Standard";
};

// ---------- Get Rugs (Search + Filters) ----------
export const getRugs = async (filters) => {
  const caseInsensitiveFilters = {};
  for (const key in filters) {
    if (filters[key]) {
      caseInsensitiveFilters[key] = { $regex: new RegExp(filters[key], "i") };
    }
  }
  return await Rug.find(caseInsensitiveFilters);
};

// ---------- Get Rug by ID ----------
export const getRugById = async (rugId) => {
  if (!mongoose.Types.ObjectId.isValid(rugId)) throw new Error("Invalid Rug ID");
  const rug = await Rug.findById(rugId);
  if (!rug) throw new Error("Rug not found");
  return rug;
};

// ---------- Create Rug ----------
export const createRug = async (productData, files, userId) => {
  const imageUrls = [];

  // Upload all images to Cloudinary
  if (files && files.length > 0) {
    for (const file of files) {
      const base64Image = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
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
    diameter,
  } = productData;

  // Combine colors smartly
  let combinedColor = primaryColor || "";
  if (primaryColor && secondaryColor) {
    combinedColor = `${primaryColor} / ${secondaryColor}`;
  } else if (secondaryColor && !primaryColor) {
    combinedColor = secondaryColor;
  }

  const effectiveWidth = shape === "round" ? diameter : width;

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
    shortDescription: description ? description.substring(0, 150) : "",
    description: description || "",
    countInStock: Number(quantity) || 0,
  });

  const createdRug = await rug.save();
  return createdRug;
};

// ---------- Update Rug (Handles Old Rugs Too) ----------
export const updateRug = async (id, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Rug ID");

  const rug = await Rug.findById(id);
  if (!rug) return null;

  // 🧩 Normalize missing fields (for old data)
  rug.price = rug.price ?? 0;
  rug.countInStock = rug.countInStock ?? 0;
  rug.description = rug.description ?? "";
  rug.shortDescription = rug.shortDescription ?? "";
  rug.name = rug.name ?? "Untitled Rug";

  // 🧠 Update only provided fields
  if (updateData.name) rug.name = updateData.name;
  if (updateData.sku) rug.sku = updateData.sku;
  if (updateData.description) {
    rug.description = updateData.description;
    rug.shortDescription = updateData.description.substring(0, 150);
  }
  if (updateData.category) rug.category = updateData.category;
  if (updateData.material) rug.material = updateData.material;
  if (updateData.size) rug.size = updateData.size;
  if (updateData.status) rug.status = updateData.status;
  if (updateData.design) rug.design = updateData.design;
  if (updateData.color) rug.color = updateData.color;

  // Handle numbers safely
  if (updateData.price !== undefined)
    rug.price = Number(updateData.price) || 0;
  if (updateData.countInStock !== undefined)
    rug.countInStock = Number(updateData.countInStock) || 0;

  // Optional: Update images if provided
  if (updateData.images && Array.isArray(updateData.images)) {
    rug.images = updateData.images;
    rug.imageUrl = updateData.images[0] || rug.imageUrl;
  }

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
