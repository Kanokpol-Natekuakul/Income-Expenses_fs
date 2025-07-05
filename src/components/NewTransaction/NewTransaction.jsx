import React, { useState } from "react";
import "./NewTransaction.css";

const NewTransaction = ({ setIsShow, addNewTransaction }) => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    type: "expense",
    paymentMethod: "",
    date: new Date().toISOString().split('T')[0],
    description: ""
  });

  const categories = [
    "อาหาร", "ค่าน้ำมัน", "ค่าไฟ", "ค่าน้ำ", "ค่าเช่า", "เงินเดือน", 
    "โบนัส", "ค่าขนส่ง", "ความบันเทิง", "สุขภาพ", "การศึกษา", "อื่นๆ"
  ];

  const paymentMethods = [
    "เงินสด", "บัตรเครดิต", "บัตรเดบิต", "โอนเงิน", "อีวอลเล็ท", "อื่นๆ"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category || !formData.paymentMethod) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    
    addNewTransaction({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    setIsShow(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="new-transaction-overlay">
      <div className="new-transaction-modal">
        <div className="modal-header">
          <h2>เพิ่มรายการใหม่</h2>
          <button className="close-button" onClick={() => setIsShow(false)}>
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <label>จำนวนเงิน (บาท)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>หมวดหมู่</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">เลือกหมวดหมู่</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>ประเภท</label>
            <div className="type-buttons">
              <button
                type="button"
                className={`type-button ${formData.type === 'expense' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
              >
                รายจ่าย
              </button>
              <button
                type="button"
                className={`type-button ${formData.type === 'income' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
              >
                รายรับ
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>ช่องทางการจ่ายเงิน</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">เลือกช่องทางการจ่ายเงิน</option>
              {paymentMethods.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>วันที่</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>รายละเอียด (ไม่บังคับ)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="เพิ่มรายละเอียดเพิ่มเติม..."
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => setIsShow(false)}>
              ยกเลิก
            </button>
            <button type="submit" className="submit-button">
              เพิ่มรายการ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTransaction; 