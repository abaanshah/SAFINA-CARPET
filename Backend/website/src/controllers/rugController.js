import * as rugService from "../services/rugService.js";

// Get all rugs (with filters via query params)
export const getRugs = async (req, res) => {
  try {
    const rugs = await rugService.getRugs(req.query);
    return res.status(200).json(rugs);
  } catch (error) {
    console.error("Error fetching rugs:", error.message);
    return res.status(500).json({ message: "Server error while fetching rugs" });
  }
};

// Get single rug by ID
export const getRugById = async (req, res) => {
  try {
    const { id } = req.params;
    const rug = await rugService.getRugById(id);

    if (!rug) {
      return res.status(404).json({ message: "Rug not found" });
    }

    return res.status(200).json(rug);
  } catch (error) {
    console.error("Error fetching rug:", error.message);

    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid Rug ID" });
    }

    return res.status(500).json({ message: "Server error while fetching rug" });
  }
};

// Controller function to handle creating a new rug
export const createRug = async (req, res) => {
  try {
    const newRug = await rugService.createRug(req.body, req.files, req.user._id);
    res.status(201).json(newRug);
  } catch (error) {
    console.error("Error in createRug controller:", error);
    res.status(400).json({ message: error.message });
  }
};

// --- NEW: Controller function to update a rug ---
export const updateRug = async (req, res) => {
  try {
    const updatedRug = await rugService.updateRug(req.params.id, req.body);
    if (!updatedRug) {
      return res.status(404).json({ message: "Rug not found" });
    }
    res.json(updatedRug);
  } catch (error) {
    console.error("Error updating rug:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// --- NEW: Controller function to delete a rug ---
export const deleteRug = async (req, res) => {
  try {
    const result = await rugService.deleteRug(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Rug not found" });
    }
    res.json({ message: "Rug deleted successfully" });
  } catch (error) {
    console.error("Error deleting rug:", error.message);
    res.status(500).json({ message: "Server error while deleting rug" });
  }
};

