import React, { useState } from "react";
import "./TransactionItem.css";

const TransactionItem = ({ 
  transaction, 
  isEditing, 
  onEdit, 
  onCancelEdit, 
  onSave, 
  onDelete 
}) => {
  const [editData, setEditData] = useState({
    amount: transaction.amount,
    category: transaction.category,
    type: transaction.type,
    paymentMethod: transaction.paymentMethod,
    date: transaction.date.toISOString().split('T')[0],
    description: transaction.description || ""
  });

  const categories = [
    "อาหาร", "ค่าน้ำมัน", "ค่าไฟ", "ค่าน้ำ", "ค่าเช่า", "เงินเดือน", 
    "โบนัส", "ค่าขนส่ง", "ความบันเทิง", "สุขภาพ", "การศึกษา", "อื่นๆ"
  ];

  const paymentMethods = [
    "เงินสด", "บัตรเครดิต", "บัตรเดบิต", "โอนเงิน", "อีวอลเล็ท", "อื่นๆ"
  ];

  const handleSave = () => {
    if (!editData.amount || !editData.category || !editData.paymentMethod) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    
    onSave(transaction.id, {
      ...editData,
      amount: parseFloat(editData.amount)
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeIcon = (type) => {
    return type === 'income' ? '📈' : '📉';
  };

  const getTypeColor = (type) => {
    return type === 'income' ? '#059669' : '#dc2626';
  };

  if (isEditing) {
    return (
      <div className="transaction-item editing">
        <div className="edit-form">
          <div className="edit-row">
            <div className="edit-group">
              <label>จำนวนเงิน</label>
              <input
                type="number"
                name="amount"
                value={editData.amount}
                onChange={handleChange}
                step="0.01"
                min="0"
              />
            </div>
            <div className="edit-group">
              <label>หมวดหมู่</label>
              <select
                name="category"
                value={editData.category}
                onChange={handleChange}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="edit-row">
            <div className="edit-group">
              <label>ประเภท</label>
              <div className="type-buttons">
                <button
                  type="button"
                  className={`type-button ${editData.type === 'expense' ? 'active' : ''}`}
                  onClick={() => setEditData(prev => ({ ...prev, type: 'expense' }))}
                >
                  รายจ่าย
                </button>
                <button
                  type="button"
                  className={`type-button ${editData.type === 'income' ? 'active' : ''}`}
                  onClick={() => setEditData(prev => ({ ...prev, type: 'income' }))}
                >
                  รายรับ
                </button>
              </div>
            </div>
            <div className="edit-group">
              <label>ช่องทางการจ่ายเงิน</label>
              <select
                name="paymentMethod"
                value={editData.paymentMethod}
                onChange={handleChange}
              >
                {paymentMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="edit-row">
            <div className="edit-group">
              <label>วันที่</label>
              <input
                type="date"
                name="date"
                value={editData.date}
                onChange={handleChange}
              />
            </div>
            <div className="edit-group">
              <label>รายละเอียด</label>
              <input
                type="text"
                name="description"
                value={editData.description}
                onChange={handleChange}
                placeholder="รายละเอียดเพิ่มเติม..."
              />
            </div>
          </div>
          
          <div className="edit-actions">
            <button className="save-button" onClick={handleSave}>
              บันทึก
            </button>
            <button className="cancel-button" onClick={onCancelEdit}>
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-item">
      <div className="transaction-icon" style={{ backgroundColor: getTypeColor(transaction.type) + '20' }}>
        {getTypeIcon(transaction.type)}
      </div>
      
      <div className="transaction-content">
        <div className="transaction-header">
          <h4 className="transaction-title">
            {transaction.category}
            {transaction.description && (
              <span className="transaction-description"> - {transaction.description}</span>
            )}
          </h4>
          <span 
            className="transaction-amount"
            style={{ color: getTypeColor(transaction.type) }}
          >
            {transaction.type === 'income' ? '+' : '-'}฿{transaction.amount.toLocaleString()}
          </span>
        </div>
        
        <div className="transaction-details">
          <span className="transaction-date">{formatDate(transaction.date)}</span>
          <span className="transaction-payment">{transaction.paymentMethod}</span>
          <span className={`transaction-type ${transaction.type}`}>
            {transaction.type === 'income' ? 'รายรับ' : 'รายจ่าย'}
          </span>
        </div>
      </div>
      
      <div className="transaction-actions">
        <button className="edit-button" onClick={onEdit}>
          ✏️
        </button>
        <button className="delete-button" onClick={() => onDelete(transaction.id)}>
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TransactionItem; 