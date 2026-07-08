import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import chatRoutes from "./routes/chat.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API is running..."
    });
});

app.use("/api/chat", chatRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: https://localhost:${process.env.PORT}`);
});

export default app;
