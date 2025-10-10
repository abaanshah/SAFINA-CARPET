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

// --- ADDED: Controller function to handle creating a new rug ---
/**
 * Controller for creating a new rug.
 * It receives text data from req.body, files from req.files (via uploadMiddleware),
 * and the user's ID from req.user (via protect middleware).
 */
export const createRug = async (req, res) => {
  try {
    // We pass all the necessary parts to the service layer to handle the logic
    const newRug = await rugService.createRug(req.body, req.files, req.user._id);
    
    // Respond with a 201 (Created) status and the new rug data
    res.status(201).json(newRug);
  } catch (error) {
    console.error("Error in createRug controller:", error);
    // Send a 400 (Bad Request) for validation or upload errors
    res.status(400).json({ message: error.message });
  }
};

