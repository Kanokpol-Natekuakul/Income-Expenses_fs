import React from "react";
import "./Header.css"

function Header({ value, onChange }) {
    return (
        <div className="header-container">
            <div className="header-content">
                <h1 className="header-title">ระบบจัดการรายรับ-รายจ่าย</h1>
                <div className="year-filter">
                    <label className="year-label">ปี:</label>
                    <select value={value} onChange={onChange} className="year-select">
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Header;
