import mongoose from "mongoose";

const uploadedFileSchema = new mongoose.Schema({
  fileName: String,
  size: Number,
  date: {
    type: Date,
    default: Date.now,
  },
  userEmail: String,
  data: Array,
  columns: Array,
  cloudinaryUrl: String,
  cloudinaryPublicId: String,
});

export default mongoose.model("uploadedFile", uploadedFileSchema);
