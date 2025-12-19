import express from 'express';
import authRouter from './routes/auth.js'; // 🔴 新增

const app = express();
const PORT = 3001;

app.use(express.json());

app.use('/auth', authRouter); // 🔴 新增

app.get('/', (req, res) => {
  res.send('Week12 server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
