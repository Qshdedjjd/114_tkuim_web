- # REST Client 腳本（tests/api.http 內容）---
-  1. 建立報名 (POST)
POST http://localhost:3001/api/signup
Content-Type: application/json

{
    "name": "測試報名人",
    "email": "unique_id_test@example.com", 
    "phone": "0988777666"
}
// 關鍵：將回傳的 _id 賦值給變數
@last_id = json.$.id 

- 2. 取得清單 (GET) - 示範分頁
// 測試分頁功能：取得第 1 頁，限制 5 筆
GET http://localhost:3001/api/signup?page=1&limit=5

- 3. 更新資料 (PATCH)
// 使用上一步 POST 獲取的 ID 來更新電話號碼
PATCH http://localhost:3001/api/signup/{{last_id}}
Content-Type: application/json

{
    "phone": "0911000111"
}

- 4. 刪除資料 (DELETE)
// 使用上一步 POST 獲取的 ID 來刪除記錄
DELETE http://localhost:3001/api/signup/{{last_id}}

- 5. 測試唯一索引錯誤 (E11000)
// 再次提交與第一次 POST 相同的 Email，預期回傳 409 Conflict
POST http://localhost:3001/api/signup
Content-Type: application/json

{
    "name": "重複提交者",
    "email": "unique_id_test@example.com", 
    "phone": "0900000000"
}

- # Mongo Shell 指令
- 建立唯一索引:	db.participants.createIndex({ email: 1 }, { unique: true })
- 清空集合:	db.participants.deleteMany({})
- 查詢所有資料	db.participants.find().pretty()
- 檢查索引狀態	db.getCollectionInfos({ name: "participants" })