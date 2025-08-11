import express from "express";
import UploadedFile from "../models/uploadedFile.js";
import cloudinary from "../config/cloudinary.config.js";

const router = express.Router();

router.get("/uploads", async (req, res) => {
  const user = req.query.user;
  if (!user) return res.status(400).json({ message: "User email required" });

  try {
    const files = await UploadedFile.find({ userEmail: user }).sort({ date: -1 });

    const filteredFiles = files.filter(file =>
      file.fileName.endsWith(".xls") || file.fileName.endsWith(".xlsx")
    );

    res.status(200).json({ files: filteredFiles });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete file from both Cloudinary and database
router.delete("/uploads/:fileId", async (req, res) => {
  try {
    const file = await UploadedFile.findById(req.params.fileId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Delete from Cloudinary if public_id exists
    if (file.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(file.cloudinaryPublicId);
      } catch (cloudinaryError) {
        console.error("Cloudinary delete error:", cloudinaryError);
        // Continue with database deletion even if Cloudinary fails
      }
    }

    // Delete from database
    await UploadedFile.findByIdAndDelete(req.params.fileId);

    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    console.error("Delete File Error:", err);
    res.status(500).json({ message: "Error deleting file" });
  }
});

export default router;
