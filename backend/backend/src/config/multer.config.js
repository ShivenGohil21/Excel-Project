// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "./cloudinary.config";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "excel_files", // Folder name in Cloudinary
//     resource_type: "raw", // For non-image files like Excel
//   },
// });

// export const upload = multer({ storage });


// src/config/multer.config.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "excel_files",
    resource_type: "raw", // for Excel and non-image files
  },
});

export const upload = multer({ storage });
