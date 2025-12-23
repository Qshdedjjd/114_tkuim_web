#  精品商城管理系統 (Simple Shop Management System)

本專案為「網路程式設計」期末專題，是一個基於 **MERN Stack** (MongoDB, Express, React, Node.js) 開發的完整前後端分離商城管理平台。

##  專案說明與目標
本系統旨在提供管理員一個視覺化介面，針對商城商品進行完整的 **CRUD**（新增、讀取、更新、刪除）操作。系統整合了使用者驗證機制，確保只有授權的管理員能修改商品資訊。

##  技術選型原因
* **前端 (React)**：採用元件化開發，提升程式碼複用性，並透過 `useState` 進行高效的狀態管理。
* **後端 (Node.js/Express)**：輕量且具備高性能，適合開發 RESTful API。
* **資料庫 (MongoDB)**：NoSQL 的靈活性適合快速更迭的商品資料結構。
* **認證 (JWT)**：實現無狀態身分驗證，增強系統安全性。



[Image of MERN stack architecture diagram]


---

##  系統架構與設計模式 (加分項目)

### 1. 後端設計模式 (Backend Patterns)
* **Repository Pattern**：透過 `productRepository.js` 封裝資料庫 CRUD 操作，實現邏輯與資料存取的解耦。
* **Service Pattern**：核心業務邏輯位於 `productService.js`，使 Controller 僅負責處理請求與回應。
* **Singleton Pattern**：Repository 與 Service 均以單一實例匯出，優化記憶體使用。
* **Middleware Pattern**：實作 `auth.js` 攔截器，檢查 JWT Token 以達成權限控管。

### 2. 前端設計模式 (Frontend Patterns)
* **Observer Pattern (狀態管理)**：利用 React `useState` 監聽資料變化，當狀態更新時自動觸發 UI 重新渲染。
* **Factory Pattern (元件生成)**：實作 `AlertFactory` 函式，根據 API 回傳狀態動態生成對應樣式的提示元件。

---

##  API 規格說明 (API Spec)

| 方法 | 路由 | 功能描述 | 權限 |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/register` | 註冊新管理員帳號 | 公開 |
| POST | `/api/auth/login` | 管理員登入並取得 Token | 公開 |
| GET | `/api/products` | 取得所有商品資料 | 公開 |
| POST | `/api/products` | 新增單筆商品資料 | 管理員 (JWT) |
| PUT | `/api/products/:id` | 更新特定商品資料 | 管理員 (JWT) |
| DELETE | `/api/products/:id` | 刪除特定商品資料 | 管理員 (JWT) |



---

##  前端體驗與 RWD 設計
* **介面一致性**：使用統一色調與陰影效果，提升視覺舒適度。
* **響應式設計 (RWD)**：支援手機、平板與桌機，表單與表格會自動依螢幕寬度調整排版。
* **使用者提示**：所有 CRUD 操作均有即時的 Alert 訊息反饋。

---

## 本機安裝與執行指引

### 1. 下載專案
```bash
git clone <你的Repo連結>
cd <專案目錄>

###後端設定 (Backend)
cd backend
npm install
# 請確保 .env 檔案中有 MONGO_URI 與 JWT_SECRET
npm run dev

###前端設定 (Frontend)
cd frontend
npm install
npm start

---
###專案結構
backend/：內含 Controllers, Models, Routes, Repositories, Services。

frontend/：內含 React 元件、樣式表與狀態邏輯。

docs/：存放架構圖、流程圖等說明文件。