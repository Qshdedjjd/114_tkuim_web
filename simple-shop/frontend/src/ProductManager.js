import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// ✅ Factory Pattern: 根據輸入的類型生產對應的 Alert 元件
const AlertFactory = ({ type, message }) => {
  const styles = {
    success: { backgroundColor: "#d4edda", color: "#155724", border: "1px solid #c3e6cb" },
    danger: { backgroundColor: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb" }
  };

  const currentStyle = styles[type] || styles.success;

  return (
    <div style={{ ...currentStyle, padding: "15px", marginBottom: "20px", borderRadius: "8px", textAlign: "center" }}>
      {message}
    </div>
  );
};

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", stock: "" });
  const [editingId, setEditingId] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

  // 取得所有商品 (公開)
  const fetchProducts = async () => {
    const res = await axios.get(API_URL);
    setProducts(res.data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // 提交：新增或更新 (需 Token)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form, config);
        setAlert({ show: true, message: "✅ 商品更新成功！", type: "success" });
        setEditingId(null);
      } else {
        await axios.post(API_URL, form, config);
        setAlert({ show: true, message: "✅ 商品新增成功！", type: "success" });
      }
      setForm({ name: "", description: "", price: "", stock: "" });
      fetchProducts();
      setTimeout(() => setAlert({ show: false, message: "", type: "success" }), 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "操作失敗，請檢查權限";
      setAlert({ show: true, message: errorMsg, type: "danger" });
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({ name: product.name, description: product.description, price: product.price, stock: product.stock });
  };

  // 刪除 (需 Token)
  const handleDelete = async (id) => {
    if (window.confirm("確定要刪除嗎？")) {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      };
      try {
        await axios.delete(`${API_URL}/${id}`, config);
        fetchProducts();
        setAlert({ show: true, message: "🗑️ 商品已成功刪除", type: "danger" });
        setTimeout(() => setAlert({ show: false, message: "", type: "success" }), 3000);
      } catch (err) {
        setAlert({ show: true, message: "刪除失敗，請檢查權限", type: "danger" });
      }
    }
  };

  return (
    <div className="container">
      <h2>📦 商城管理系統</h2>
      
      {alert.show && <AlertFactory type={alert.type} message={alert.message} />}

      <form onSubmit={handleSubmit} className="product-form">
        <input name="name" placeholder="商品名稱" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="描述" value={form.description} onChange={handleChange} required />
        <input name="price" type="number" placeholder="價格" value={form.price} onChange={handleChange} required />
        <input name="stock" type="number" placeholder="庫存" value={form.stock} onChange={handleChange} required />
        <button type="submit">{editingId ? "💾 更新商品" : "➕ 新增商品"}</button>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr><th>名稱</th><th>描述</th><th>價格</th><th>庫存</th><th>操作</th></tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td><strong>{product.name}</strong></td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(product)}>編輯</button>
                  <button className="btn-delete" onClick={() => handleDelete(product._id)}>刪除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManager;