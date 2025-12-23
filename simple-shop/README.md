# 簡易商城 (Simple Shop)

## 專案主題與目標
建立一個簡易的線上商城，使用者可以新增、查看、修改、刪除商品。  
目標是學習前後端整合，實作完整 CRUD 功能。

## 技術選擇
- **前端**：React (元件化開發、狀態管理)  
- **後端**：Node.js + Express (RESTful API)  
- **資料庫**：MongoDB (文件型資料庫)  
- **HTTP 請求**：Axios

## 架構說明
- 前端 React 負責使用者介面與操作  
- 後端 Express 提供 API，處理資料邏輯  
- MongoDB 存儲商品資料  

## 安裝與執行指引
### 後端
```bash
cd backend
npm install
npm run dev

### 前端
cd frontend
npm install
npm start


---

# 2️⃣ API 規格說明文件 (api-spec.md 範例)

| HTTP 方法 | 路由 | 參數 | 說明 | 範例 Request | 範例 Response |
|-----------|------|------|------|--------------|---------------|
| POST | /api/products | JSON body: name, description, price, stock | 新增商品 | `{ "name": "iPhone 15", "description": "Apple smartphone", "price": 29900, "stock": 10 }` | `{ "_id": "123", "name": "iPhone 15", ... }` |
| GET | /api/products | - | 取得所有商品 | - | `[ { "_id": "123", "name": "iPhone 15", ... } ]` |
| GET | /api/products/:id | URL param: id | 取得單一商品 | - | `{ "_id": "123", "name": "iPhone 15", ... }` |
| PUT | /api/products/:id | URL param: id, JSON body: 更新欄位 | 更新商品資料 | `{ "price": 28900 }` | `{ "_id": "123", "name": "iPhone 15", "price": 28900, ... }` |
| DELETE | /api/products/:id | URL param: id | 刪除商品 | - | `{ "message": "Product deleted" }` |

---

# 3️⃣ 架構圖 (architecture.png)

