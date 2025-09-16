import { getAllMaterials, createMaterial } from "../services/materialService.js";

// Controller to get all materials
export const fetchAllMaterials = async (req, res) => {
  try {
    const materials = await getAllMaterials();
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to add new material
export const addMaterial = async (req, res) => {
  try {
    const savedMaterial = await createMaterial(req.body);
    res.status(201).json(savedMaterial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
