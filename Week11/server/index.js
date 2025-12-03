// server/index.js

// 1. 引入必要的工具
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import signupRoutes from "./routes/signup.js";

// 載入 .env
dotenv.config();

// 2. 應用程式設定
const PORT = process.env.PORT || 3001;
const app = express();

// 3. 設定中間件 (設定 Express 的規則)
app.use(cors({
    origin: process.env.ALLOW_ORIGIN || "*"
}));

app.use(express.json());

// 4. 設定路由
app.get("/", (req, res) => {
    res.send("Server is running and listening!");
});

app.use("/api/signup", signupRoutes); // 掛載報名 API

// 5. 啟動伺服器與資料庫連線 (總導演喊開始！)
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`\n[DB] Connected to MongoDB`);
            console.log(`🎉 Server is listening on port ${PORT}`);
            console.log("--- 現在可以測試 API 請求了 ---");
        });
    })
    .catch((error) => {
        console.error("❌ 伺服器啟動失敗 (資料庫連線失敗):", error.message);
        process.exit(1);
    });
