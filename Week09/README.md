# Week09 Lab: 報名 API 串接與測試流程

這個專案實作了一個基礎的 Node.js/Express 後端 API (`/api/signup`)，並整合了前端表單 (Fetch API) 進行資料傳輸，同時包含了完整的測試腳本。

##  環境需求

* **Node.js**: 建議使用 v18 或以上版本。
* **VS Code 延伸模組**:
    * **Live Server** (用於運行前端 `client/` 資料夾)。
    * **REST Client** 或 **Thunder Client** (用於執行 `tests/api.http` 檔案)。

## 啟動步驟

請依序啟動後端伺服器和前端服務。

### 1. 啟動後端伺服器 (Node.js)

1.  進入 `server` 資料夾：
    ```bash
    cd server
    ```
2.  安裝所有依賴套件：
    ```bash
    npm install
    ```
3.  確認 `.env` 檔案中 `PORT` (預設 3001) 和 `ALLOWED_ORIGIN` (需設定為你的 Live Server 位址，例如 `http://127.0.0.1:5500`) 已正確設定。
4.  啟動伺服器 (使用 `nodemon` 進行開發時熱重載)：
    ```bash
    npm start 
    # 或直接使用 nodemon app.js
    ```
    伺服器啟動成功後，終端機將顯示類似 `Server running on port 3001. Allowed origin: ...` 的訊息。

### 2. 啟動前端服務 (Live Server)

1.  回到專案根目錄。
2.  開啟 `client/signup_form.html` 檔案。
3.  在 VS Code 中，使用 **Live Server** 延伸模組來運行此 HTML 頁面。

## API 端點文件

後端 API 統一以 `http://localhost:3001/api/signup` 作為基礎路徑。

| 方法 | 路徑 | 說明 | 成功狀態碼 | 失敗狀態碼 |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/signup` | **報名註冊**。接收 JSON 資料，包含 `name`, `email`, `phone` 等必填欄位。 | 201 Created | 400 Bad Request (欄位驗證失敗) |
| `GET` | `/api/signup` | **查看清單**。回傳當前所有報名參與者的列表和總數。 | 200 OK | 500 Internal Error |
| `DELETE` | `/api/signup/:id` | **取消報名** (加分項目)。根據 ID 刪除參與者。 | 200 OK | 404 Not Found |

## 測試方式

提供兩種測試方式：API 測試腳本與前端頁面測試。

### 1. API 測試 (推薦使用 REST Client)

使用 VS Code 延伸模組 **REST Client** (或 Thunder Client) 執行 `tests/api.http` 檔案：

* 開啟 `tests/api.http` 檔案。
* 點擊每個請求上方的 "Send Request" 按鈕，可以驗證：
    * `測試 1`: 成功報名 (201 狀態碼)。
    * `測試 2`: 欄位驗證失敗 (400 狀態碼與錯誤訊息)。
    * `測試 3`: 查看清單。

### 2. 前端介面測試

* 在瀏覽器中開啟 `signup_form.html`。
* **成功測試**: 填入所有正確資訊並點擊「送出」，頁面應顯示綠色的成功訊息，且表單清空。
* **失敗測試**: 故意空下必填欄位或輸入不正確的格式 (例如：手機號碼格式錯誤)，頁面應顯示紅色的錯誤提示，且訊息來自後端。
* 點擊「查看報名清單」按鈕，驗證最新的報名資料是否被成功記錄。