import React from "react";
import "./TransactionFilter.css";

const TransactionFilter = ({ filters, setFilters }) => {
  const categories = [
    "อาหาร", "ค่าน้ำมัน", "ค่าไฟ", "ค่าน้ำ", "ค่าเช่า", "เงินเดือน", 
    "โบนัส", "ค่าขนส่ง", "ความบันเทิง", "สุขภาพ", "การศึกษา", "อื่นๆ"
  ];

  const paymentMethods = [
    "เงินสด", "บัตรเครดิต", "บัตรเดบิต", "โอนเงิน", "อีวอลเล็ท", "อื่นๆ"
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      type: "",
      paymentMethod: ""
    });
  };

  const hasActiveFilters = filters.category || filters.type || filters.paymentMethod;

  return (
    <div className="transaction-filter">
      <div className="filter-header">
        <h3>กรองรายการ</h3>
        {hasActiveFilters && (
          <button className="clear-filters" onClick={clearFilters}>
            ล้างตัวกรอง
          </button>
        )}
      </div>
      
      <div className="filter-controls">
        <div className="filter-group">
          <label>หมวดหมู่</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">ทุกหมวดหมู่</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>ประเภท</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="">ทุกประเภท</option>
            <option value="income">รายรับ</option>
            <option value="expense">รายจ่าย</option>
          </select>
        </div>

        <div className="filter-group">
          <label>ช่องทางการจ่ายเงิน</label>
          <select
            value={filters.paymentMethod}
            onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
          >
            <option value="">ทุกช่องทาง</option>
            {paymentMethods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="active-filters">
          <span>ตัวกรองที่ใช้งาน:</span>
          {filters.category && (
            <span className="filter-tag">
              หมวดหมู่: {filters.category}
              <button onClick={() => handleFilterChange('category', '')}>×</button>
            </span>
          )}
          {filters.type && (
            <span className="filter-tag">
              ประเภท: {filters.type === 'income' ? 'รายรับ' : 'รายจ่าย'}
              <button onClick={() => handleFilterChange('type', '')}>×</button>
            </span>
          )}
          {filters.paymentMethod && (
            <span className="filter-tag">
              ช่องทาง: {filters.paymentMethod}
              <button onClick={() => handleFilterChange('paymentMethod', '')}>×</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionFilter; 