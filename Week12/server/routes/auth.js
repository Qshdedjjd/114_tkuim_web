import express from 'express';

const router = express.Router();

// 測試用
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route works!' });
});

export default router;
