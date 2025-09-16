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
