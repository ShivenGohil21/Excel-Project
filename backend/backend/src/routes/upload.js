// src/routes/upload.js
import express from "express";
import multer from "multer";
import xlsx from "xlsx";
import cloudinary from "../config/cloudinary.config.js";
import UploadedFileModel from "../models/uploadedFile.js";
import stream from "stream";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("=== /api/upload called ===");
    console.log("file present:", !!req.file);
    console.log("req.body:", req.body);

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded (req.file is undefined)" });
    }

    // Optional: quick mimetype/extension check
    console.log("file.mimetype:", req.file.mimetype);
    console.log("originalName:", req.file.originalname);

    // Parse Excel buffer safely
    let data = [];
    try {
      const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
      const firstSheet = workbook.SheetNames[0];
      data = xlsx.utils.sheet_to_json(workbook.Sheets[firstSheet] || {});
    } catch (parseErr) {
      console.error("XLSX parse error:", parseErr);
      return res.status(400).json({ success: false, message: "Failed to parse Excel file: " + parseErr.message });
    }

    // Upload to cloudinary via stream
    const cloudinaryUpload = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "excel-files",
          public_id: `${Date.now()}-${req.file.originalname.replace(/\.[^/.]+$/, "")}`,
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject(error);
          }
          resolve(result);
        }
      );

      const bufferStream = new stream.PassThrough();
      bufferStream.end(req.file.buffer);
      bufferStream.pipe(uploadStream);
    });

    console.log("cloudinaryUpload:", cloudinaryUpload);

    const newDoc = new UploadedFileModel({
      fileName: req.file.originalname,
      size: req.file.size,
      userEmail: req.body.userEmail,
      data,
      columns: Object.keys(data[0] || {}),
      cloudinaryUrl: cloudinaryUpload.secure_url,
      cloudinaryPublicId: cloudinaryUpload.public_id,
    });

    await newDoc.save();

    return res.status(200).json({ success: true, data, cloudinaryUrl: cloudinaryUpload.secure_url });
  } catch (err) {
    console.error("Upload route error:", err);
    // In dev return the message; in prod you can hide it.
    return res.status(500).json({ success: false, message: err.message || "Error uploading file" });
  }
});

export default router;
