import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
  })
);

// Routes
import authRoutes from "./src/routes/auth.routes.js";
import uploadRoutes from "./src/routes/upload.js";
import filesRoutes from "./src/routes/file.routes.js";

// Use routes
app.use("/auth", authRoutes);
app.use("/api", uploadRoutes);
app.use("/api", filesRoutes);

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    console.log("Connecting to:", process.env.MONGODB_URI); // ✅ log it
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () =>
      console.log(`✅ Server running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

startServer();



// index.js (or server entry)


const allowedOrigins = [
  process.env.FRONTEND,        // production origin (https://excel-project-2.onrender.com)
  "http://localhost:5173",     // your react dev origin
  "http://localhost:3000",     // optional common dev port
];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("CORS policy: Origin not allowed: " + origin));
  },
  credentials: true,
}));
