import React, { useState } from "react";
import "./TransactionList.css";
import TransactionItem from "./TransactionItem/TransactionItem";

const TransactionList = ({ transactions, editHandler, deleteHandler }) => {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id, transaction) => {
    editHandler(id, transaction);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (sortedTransactions.length === 0) {
    return (
      <div className="transaction-list">
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h3>ไม่มีรายการ</h3>
          <p>ยังไม่มีรายการรายรับ-รายจ่ายในปีนี้</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <div className="list-header">
        <h3>รายการทั้งหมด ({sortedTransactions.length})</h3>
      </div>
      
      <div className="transactions-container">
        {sortedTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            isEditing={editingId === transaction.id}
            onEdit={() => setEditingId(transaction.id)}
            onCancelEdit={handleCancelEdit}
            onSave={handleEdit}
            onDelete={deleteHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionList; 