# tests/test.sh (範例)
echo "--- 測試 1: 成功報名 ---"
curl -X POST http://localhost:3001/api/signup -H "Content-Type: application/json" -d '{"name": "小華", "email": "test@mail.com", "phone": "0912345678", "password": "demoPass88", "interests": ["後端入門"], "terms": true}'

echo -e "\n\n--- 測試 2: 查看清單 ---"
curl http://localhost:3001/api/signup