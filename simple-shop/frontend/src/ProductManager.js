import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", stock: "" });
  const [editingId, setEditingId] = useState(null);

  // 取得商品列表
  const fetchProducts = async () => {
    const res = await axios.get(API_URL);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 表單改變
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 新增 / 更新
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // 更新商品邏輯
        await axios.put(`${API_URL}/${editingId}`, form);
        console.log("更新成功");
        setEditingId(null); // 清除編輯狀態
      } else {
        // 新增商品邏輯 (把原本報錯的 formData 改成 form)
        const response = await axios.post(API_URL, form); 
        console.log("新增成功:", response.data);
      }
      
      // 重置表單
      setForm({ name: "", description: "", price: "", stock: "" });
      // 重新抓取清單
      fetchProducts(); 
    } catch (err) {
      console.error("操作失敗:", err);
      alert("連線失敗，請檢查後端伺服器是否運行中");
    }
  };

  // 編輯
  const handleEdit = product => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock
    });
  };

  // 刪除
  const handleDelete = async id => {
    await axios.delete(`${API_URL}/${id}`);
    fetchProducts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>商品管理</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="名稱" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="描述" value={form.description} onChange={handleChange} required />
        <input name="price" type="number" placeholder="價格" value={form.price} onChange={handleChange} required />
        <input name="stock" type="number" placeholder="庫存" value={form.stock} onChange={handleChange} required />
        <button type="submit">{editingId ? "更新商品" : "新增商品"}</button>
      </form>

      <h3>商品列表</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>名稱</th>
            <th>描述</th>
            <th>價格</th>
            <th>庫存</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {/* 這裡加入 Array.isArray 的判斷，確保 products 是個陣列才執行渲染 */}
            {Array.isArray(products) ? (
                products.map((product) => (
                    // ProductManager.js 裡面的表格部分
                    <tr key={product._id || product.id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td> {/* 這裡要改成 stock 才能對應到你傳的資料 */}
                        <td>
                        {/* 這裡建議加上刪除按鈕測試 CRUD */}
                            <button onClick={() => handleEdit(product)}>編輯</button>
                            <button onClick={() => handleDelete(product._id)}>刪除</button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr><td colSpan="5">正在載入商品或目前無資料...</td></tr>
            )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManager;
