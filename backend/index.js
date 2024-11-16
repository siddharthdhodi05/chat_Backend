import express, { urlencoded } from "express"; // Ensure express is imported
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoute.js";
import cors from "cors";
import { app, server } from "./socket/socket.js"; // Import app and server from socket.js

dotenv.config(); // Ensure dotenv is configured

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

/*const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));*/

const allowedOrigins = [
'https://chat-frontend-phi-six.vercel.app/',
  'https://chat-frontend-git-main-siddharth-dhodis-projects.vercel.app/',
  'https://chat-frontend-k0q8xwu73-siddharth-dhodis-projects.vercel.app/',
  "http://localhost:5173/"
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      // Allow requests with no origin (e.g., mobile apps, postman)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: ['Content-Type', 'Authorization'],
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
