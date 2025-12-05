// server/routes/signup.js
import express from 'express';
import {
  createParticipant,
  listParticipants,
  updateParticipant,
  deleteParticipant
} from '../repositories/participants.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        // ... (欄位驗證保持不變) ...

        const id = await createParticipant({ name, email, phone });
        res.status(201).json({ id });
    } catch (error) {
        //  修正：捕捉 E11000 錯誤並回傳 409 Conflict 
        if (error.code === 11000) {
            return res.status(409).json({ error: '此 Email 已被報名，請勿重複提交！' });
        }
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        //  修正：從 req.query 取得 page 和 limit 
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        // 呼叫新的分頁函式
        const { participants, total } = await listParticipants(page, limit);
        
        res.json({ items: participants, total, page, limit });
    } catch (error) {
        next(error);
    }
});

// server/routes/signup.js (router.patch 裡)
router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    // 驗證 ID 格式 (保留您新增的部分) 
    if (id.length !== 24 || !id.match(/^[0-9a-fA-F]{24}$/)) {
        // 如果 ID 無效，返回 400 錯誤
        return res.status(400).json({ error: '無效的 ID 格式' });
    }

    const result = await updateParticipant(id, req.body);
    
    // 關鍵修正：補上 404 檢查和成功回應！ 
    if (!result.matchedCount) {
        return res.status(404).json({ error: '找不到資料' });
    }
    
    res.status(204).end();
    //  這是正確的回應結束點 

  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await deleteParticipant(req.params.id);
    if (!result.deletedCount) {
      return res.status(404).json({ error: '找不到資料' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
