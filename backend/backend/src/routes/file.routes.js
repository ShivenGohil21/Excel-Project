import express from "express";
import UploadedFile from "../models/uploadedFile.js";

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

export default router;
