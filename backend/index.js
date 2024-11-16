import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoute.js";
import cors from "cors";
import { app, server } from "./socket/socket.js";

dotenv.config();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// Define allowed origins
const allowedOrigins = [
  'https://chat-frontend-phi-six.vercel.app',
  'https://chat-frontend-git-main-siddharth-dhodis-projects.vercel.app',
  'https://chat-frontend-k0q8xwu73-siddharth-dhodis-projects.vercel.app',
  'http://localhost:5173',
];

// Configure CORS
const corsOptions = {
  origin: (origin, callback) => {
    console.log("Origin:", origin); // Debugging: log the incoming origin
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error(`Origin not allowed by CORS: ${origin}`)); // Deny the request
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials (e.g., cookies)
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

const PORT = process.env.PORT || 8080;

// Start the server
server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});