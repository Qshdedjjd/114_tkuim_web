// client/signup_form.js
async function submitForm(payload) {
  // 🌟 使用相對路徑，如果啟用了 Proxy
  const response = await fetch('/api/signup', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    // 🌟 處理錯誤訊息，顯示給使用者
    throw new Error(data.error || '送出失敗');
  }
  return data;
}