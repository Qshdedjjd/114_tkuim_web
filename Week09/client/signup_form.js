document.addEventListener("DOMContentLoaded", () => {
    // === 元素選擇器 (Elements Selectors) ===
    const form = document.getElementById("signupForm"); // 假設表單 ID 是 signupForm
    if (!form) {
        console.error("找不到 ID 為 signupForm 的表單。請檢查 HTML 檔案。");
        return;
    }
    
    // 取得所有需要的元素
    const inputs = form.querySelectorAll("input");
    const submitBtn = document.getElementById("submitBtn"); // 送出按鈕
    const formMessage = document.getElementById("formMessage"); // 用於顯示訊息的區域 (替代 resultEl)
    const interestField = document.getElementById("interests"); // 興趣選項容器
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirmPassword");
    const terms = document.getElementById("terms"); // 服務條款 checkbox
    
    // 額外的元素，用於 Week07 的密碼強度條
    const strengthBar = document.getElementById("strengthBar");
    const strengthText = document.getElementById("strengthText");
    
    // Week09 必做項目：查看報名清單按鈕
    const viewListBtn = document.getElementById('viewListBtn'); // 假設新增 ID 為 viewListBtn 的按鈕

    // === 輔助函數：訊息顯示 (整合 Week09 的邏輯) ===
    function displayMessage(type, message) {
        // 使用 Week07 的 formMessage 元素來顯示訊息
        formMessage.textContent = `${type === 'success' ? '✅' : '❌'} ${message}`;
        formMessage.style.color = type === 'success' ? '#27ae60' : '#e74c3c';
    }

    // === 輔助函數：驗證欄位 (來自 Week07) ===
    function validateField(field) {
        const errorMsg = document.getElementById(field.id + "Error");
        if (!errorMsg) return;
        let message = "";

        // ... (保持 Week07 的驗證邏輯不變) ...
        if (field.validity.valueMissing) {
            message = "此欄位為必填";
        } else if (field.type === "email" && field.validity.typeMismatch) {
            message = "請輸入有效的 Email 格式";
        } else if (field.id === "phone" && !/^\d{10}$/.test(field.value)) {
            // 由於後端要求 09 開頭，這裡最好修正成 /^(09)\d{8}$/。
            // 這裡暫時維持 Week07 的邏輯。
            message = "手機號碼需為 10 位數字";
        } else if (field.id === "password" && !/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(field.value)) {
            message = "密碼需至少 8 碼，且包含英文字母與數字";
        } else if (field.id === "confirmPassword") {
            const pw = passwordInput.value;
            if (field.value && field.value !== pw) {
                message = "兩次密碼不一致，請再次確認";
            }
        }

        field.setCustomValidity(message);
        errorMsg.textContent = message;
        return message === ""; // 回傳是否驗證通過
    }

    // === 輔助函數：檢查所有欄位 (來自 Week07) ===
    function validateForm(payload) {
        let invalid = false;
        let firstInvalid = null;

        inputs.forEach((input) => {
            if (!validateField(input)) {
                invalid = true;
                if (!firstInvalid) firstInvalid = input;
            }
        });

        // 驗證興趣
        const interestsChecked = interestField.querySelectorAll("input:checked");
        const interestError = document.getElementById("interestError");
        if (interestsChecked.length === 0) {
            interestError.textContent = "請至少選擇一項興趣";
            invalid = true;
        } else {
            interestError.textContent = "";
            payload.interests = [...interestsChecked].map(i => i.value); // 加入 payload
        }

        // 驗證服務條款
        const termsError = document.getElementById("termsError");
        if (!terms.checked) {
            termsError.textContent = "必須同意服務條款";
            invalid = true;
            if (!firstInvalid) firstInvalid = terms;
        } else {
            termsError.textContent = "";
            payload.terms = true; // 加入 payload
        }
        
        // 聚焦第一個錯誤
        if (invalid && firstInvalid) {
             firstInvalid.focus();
        }

        return !invalid;
    }

    // === 核心功能：API 呼叫 (來自 Week09) ===
    async function submitSignup(payload) {
        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        
        if (!res.ok) {
            // 後端回傳 400 錯誤時，顯示詳細的錯誤訊息
            throw new Error(data.error || '報名失敗'); 
        }
        return data;
    }

    // === 表單送出事件 (整合 Week07 驗證 + Week09 API 串接) ===
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        formMessage.textContent = ""; // 清除舊訊息
        
        // 1. 取得資料
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());
        
        // 2. 執行 Week07 的前端驗證
        if (!validateForm(payload)) {
            return; // 驗證失敗，停止送出
        }
        
        // 3. 處理 API 串接 (Week09 邏輯)
        try {
            // 必做項目：顯示 Loading 狀態，並防止重複送出
            submitBtn.disabled = true;
            submitBtn.textContent = '送出中...';
            
            const result = await submitSignup(payload);
            
            // 成功：顯示訊息、清空表單、清除 Local Storage (Week07 邏輯)
            displayMessage('success', result.message || "註冊成功！");
            form.reset();
            localStorage.clear();
            // 重設密碼強度條等
            if(strengthBar) strengthBar.style.width = "0";
            if(strengthText) strengthText.textContent = "密碼強度："; 
            document.querySelectorAll(".error-msg").forEach((e) => (e.textContent = ""));
            
        } catch (error) {
            // 失敗：顯示後端回傳的錯誤訊息
            displayMessage('error', error.message);
            
        } finally {
            // 必做項目：恢復按鈕狀態
            submitBtn.disabled = false;
            submitBtn.textContent = '送出';
        }
    });

    // === 必做項目：查看報名清單功能 (來自 Week09) ===
    if (viewListBtn) {
        viewListBtn.addEventListener('click', async () => {
            try {
                // 使用 formMessage 元素來顯示清單結果
                viewListBtn.disabled = true;
                formMessage.textContent = '載入中...';
                
                const res = await fetch('http://localhost:3001/api/signup');
                const data = await res.json();
                
                // 顯示清單
                formMessage.textContent = `總報名人數: ${data.total}\n\n${JSON.stringify(data.list, null, 2)}`;
                formMessage.style.color = 'black'; // 清單用黑色或預設顏色
                
            } catch (error) {
                displayMessage('error', '無法載入報名清單。請檢查後端伺服器是否運行。');
            } finally {
                viewListBtn.disabled = false;
            }
        });
    }

    // === 初始載入和事件綁定 (來自 Week07) ===
    // 這裡保留 Week07 所有的 Local Storage 恢復、blur 驗證、密碼強度條、input 即時驗證、重設等邏輯。
    
    // (A) localStorage 恢復 + blur 驗證
    inputs.forEach((input) => {
        const saved = localStorage.getItem(input.id);
        if (saved) input.value = saved;

        input.addEventListener("input", () => {
            localStorage.setItem(input.id, input.value);
        });
        
        input.addEventListener("blur", () => validateField(input));
    });

    // (B) 儲存與恢復興趣選項
    interestField.addEventListener("change", () => {
        const selected = [...interestField.querySelectorAll("input:checked")].map(i => i.value);
        localStorage.setItem("interests", JSON.stringify(selected));

        // 觸發驗證
        validateForm({}); 
    });

    const savedInterests = JSON.parse(localStorage.getItem("interests") || "[]");
    interestField.querySelectorAll("input").forEach(i => {
        i.checked = savedInterests.includes(i.value);
    });

    // (C) 儲存與恢復服務條款勾選
    const savedTerms = localStorage.getItem("termsChecked") === "true";
    terms.checked = savedTerms;
    terms.addEventListener("change", (e) => {
        localStorage.setItem("termsChecked", e.target.checked);
        validateForm({}); // 觸發驗證
    });

    // (D) 密碼強度條
    const checkStrength = (value) => { /* ... 保持 Week07 邏輯 ... */
        let score = 0;
        if (/[a-z]/.test(value)) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/\d/.test(value)) score++;
        if (/[^A-Za-z0-9]/.test(value)) score++;
        if (value.length >= 8) score++;

        const levels = ["弱", "中", "強", "非常強"];
        const colors = ["#e74c3c", "#f39c12", "#27ae60", "#2ecc71"];
        const index = Math.min(score - 1, 3);
        if(strengthBar) strengthBar.style.width = `${score * 20}%`;
        if(strengthText) strengthText.textContent = `密碼強度：${levels[index] || "無"}`;
    };

    // (E) 即時驗證
    form.addEventListener("input", (e) => {
        if (e.target.id === "password") {
            checkStrength(e.target.value);
            if (confirmInput.value) validateField(confirmInput);
        }
        validateField(e.target);
    });

    confirmInput.addEventListener("input", () => validateField(confirmInput));

    // (F) 重設按鈕
    const resetBtn = document.getElementById("resetBtn");
    if(resetBtn) {
        resetBtn.addEventListener("click", () => {
            form.reset();
            form.querySelectorAll(".error-msg").forEach((p) => (p.textContent = ""));
            formMessage.textContent = "";
            if(strengthBar) strengthBar.style.width = "0";
            if(strengthText) strengthText.textContent = "密碼強度：";
            localStorage.clear();
        });
    }
});