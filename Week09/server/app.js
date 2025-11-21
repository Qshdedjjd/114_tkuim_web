// server/app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { signupRouter } from './routes/signup.js';

dotenv.config(); // 載入 .env 變數

const app = express();
const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

// --- 中介軟體 (Middleware) ---

// 啟用 CORS
const corsOptions = {
    origin: ALLOWED_ORIGIN,
    optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));

// 啟用 JSON 請求解析
app.use(express.json()); 

// --- 路由 (Routes) ---

app.use('/api/signup', signupRouter);

// --- 必做項目：基礎錯誤處理 ---

// 404 處理
app.use((req, res, next) => {
    res.status(404).json({ error: '找不到資源 (404 Not Found)' });
});

// 500 錯誤處理 (基礎)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '伺服器內部錯誤 (500 Internal Server Error)' });
});

// --- 啟動伺服器 ---

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}. Allowed origin: ${ALLOWED_ORIGIN}`);
});