import Rug from "../models/rug.js";
import mongoose from "mongoose";

export const getRugs = async (filters) => {
  const caseInsensitiveFilters = {};
  for (const key in filters) {
    if (filters[key]) {
      caseInsensitiveFilters[key] = { 
        $regex: new RegExp(`^${filters[key]}$`, "i")  // exact, case-insensitive
      };
    }
  }
  return await Rug.find(caseInsensitiveFilters);
};

// services/rugService.js
export const getRugById = async (rugId) => {
  if (!mongoose.Types.ObjectId.isValid(rugId)) throw new Error("Invalid Rug ID");
  const rug = await Rug.findById(rugId);   // returns all fields now including images/descriptions
  if (!rug) throw new Error("Rug not found");
  return rug;
};

