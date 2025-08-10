
import express from "express";
import multer from "multer";
import xlsx from "xlsx";
import UploadedFileModel from "../models/uploadedFile.js"; // ✅ adjust path if needed

const router = express.Router();

// Configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Route to upload and parse Excel
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Save file info (optional)
    const fileMeta = new UploadedFileModel({
      fileName: req.file.originalname,
      size: req.file.size,
      date: new Date(),
      userEmail: req.body.userEmail, 
      data,
      columns: Object.keys(data[0] || {}),
    });

    await fileMeta.save();

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Excel Parse Error:", err);
    return res.status(500).json({ success: false, message: "Error parsing Excel file" });
  }
});


// ✅ Route to fetch uploaded files for a user
router.get("/uploads", async (req, res) => {
  const user = req.query.user;
  if (!user) return res.status(400).json({ message: "User email required" });

  try {
    const files = await UploadedFileModel.find({ userEmail: user });
    res.status(200).json({ files });
  } catch (err) {
    console.error("Fetch Uploads Error:", err);
    res.status(500).json({ message: "Error fetching uploaded files" });
  }
});

export default router;
