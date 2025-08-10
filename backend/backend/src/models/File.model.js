import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  fileName: String,
  size: Number,
  date: { type: Date, default: Date.now },
  data: Array,
  columns: Array,
  uploadedBy: String, // the user's email
});

export default mongoose.model("File", fileSchema);
