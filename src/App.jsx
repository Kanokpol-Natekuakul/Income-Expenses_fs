import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import NewTransaction from "./components/NewTransaction/NewTransaction";
import TransactionList from "./components/TransactionList/TransactionList";
import TransactionFilter from "./components/TransactionFilter/TransactionFilter";

let count = 4;

function uniqueId() {
  count = count + 1;
  return count;
}

const INITIAL_TRANSACTIONS = [
  {
    id: 1,
    amount: 1500,
    category: "เงินเดือน",
    type: "income",
    paymentMethod: "โอนเงิน",
    date: new Date("2024-01-15"),
    description: "เงินเดือนเดือนมกราคม"
  },
  {
    id: 2,
    amount: 200,
    category: "อาหาร",
    type: "expense",
    paymentMethod: "เงินสด",
    date: new Date("2024-01-16"),
    description: "อาหารกลางวัน"
  },
  {
    id: 3,
    amount: 500,
    category: "ค่าน้ำมัน",
    type: "expense",
    paymentMethod: "บัตรเครดิต",
    date: new Date("2024-01-17"),
    description: "เติมน้ำมันรถ"
  },
  {
    id: 4,
    amount: 3000,
    category: "โบนัส",
    type: "income",
    paymentMethod: "โอนเงิน",
    date: new Date("2024-01-18"),
    description: "โบนัสปีใหม่"
  },
];

function App() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [curYear, setCurYear] = useState("2024");
  const [isShow, setIsShow] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    type: "",
    paymentMethod: ""
  });

  const addNewTransaction = (newTransaction) => {
    const newTransactionItem = {
      ...newTransaction,
      id: uniqueId(),
      date: new Date(newTransaction.date)
    };

    setTransactions([...transactions, newTransactionItem]);
  };

  const deleteHandler = (id) => {
    const newTransactionList = transactions.filter((e) => e.id !== id);
    setTransactions(newTransactionList);
  };

  const editHandler = (id, transaction) => {
    const newTransactionList = [...transactions];
    const index = newTransactionList.findIndex((e) => e.id === id);
    newTransactionList[index] = {
      ...transaction,
      date: new Date(transaction.date)
    };
    setTransactions(newTransactionList);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const year = transaction.date.getFullYear().toString();
    const matchesYear = year === curYear;
    const matchesCategory = !filters.category || transaction.category === filters.category;
    const matchesType = !filters.type || transaction.type === filters.type;
    const matchesPaymentMethod = !filters.paymentMethod || transaction.paymentMethod === filters.paymentMethod;
    
    return matchesYear && matchesCategory && matchesType && matchesPaymentMethod;
  });

  const totalIncome = filteredTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="App">
      <Header value={curYear} onChange={(e) => setCurYear(e.target.value)} />
      
      <div className="summary-cards">
        <div className="summary-card income">
          <h3>รายรับรวม</h3>
          <p className="amount">฿{totalIncome.toLocaleString()}</p>
        </div>
        <div className="summary-card expense">
          <h3>รายจ่ายรวม</h3>
          <p className="amount">฿{totalExpense.toLocaleString()}</p>
        </div>
        <div className="summary-card balance">
          <h3>ยอดคงเหลือ</h3>
          <p className="amount">฿{balance.toLocaleString()}</p>
        </div>
      </div>

      <TransactionFilter filters={filters} setFilters={setFilters} />
      
      {isShow ? (
        <NewTransaction setIsShow={setIsShow} addNewTransaction={addNewTransaction} />
      ) : (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button className="add-button" onClick={() => setIsShow(true)}>
            เพิ่มรายการใหม่
          </button>
        </div>
      )}
      
      <TransactionList
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        transactions={filteredTransactions}
      />
    </div>
  );
}

export default App;
