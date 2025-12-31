import './App.css';
import Balance from "./components/Balance";
import IncomeExpense from "./components/IncomeExpense";
import TransactionList from "./components/TransactionList";
import TransactionInputForm from "./components/TransactionInputForm";
import CurrencySelector from './components/CurrencySelector';
import { useEffect, useState } from 'react';

function App() {

  // Declaration of main States ===========================

  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("currency") || "INR"
  });

  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    const parsed = stored? JSON.parse(stored) : [];

    return parsed.map(t => ({
      ...t,
      dateCreated: t.dateCreated || new Date(t.id).toISOString()
    }));
  });

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  // Declaration of UseEffect for Storing transactions to memory =========

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
  }, [transactions] );

  useEffect(() => {
    localStorage.setItem("currency", currency)
  }, [currency] );

  // Derived Variables that are stored in memory ==========

  const sortedTransactions = [...transactions]
    .sort((a,b) =>new Date(b.dateCreated) - new Date(a.dateCreated) )

  const filteredTransactions = sortedTransactions.filter(t => {

    // This are the transactions that is visible in the UI.
    const time = new Date(t.dateCreated).getTime()

    if (fromDate && time <= new Date(fromDate).getTime()) return false

    if (toDate) {
      const endOfDay = new Date(toDate);
      endOfDay.setHours(23,59,59,999);
      if (time > endOfDay.getTime()) return false
    }

    return true
  })

  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {

    const dateKey = transaction.dateCreated.split("T")[0];

    if(!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].push(transaction);
    return groups;
  }, {});

  const amounts = filteredTransactions.map(t => t.amount);
  
  const balance = amounts.reduce((acc, val) => acc + val, 0)

  const income = amounts
    .filter(val => val > 0)
    .reduce((acc, val) => acc + val, 0)

  const expense = Math.abs(amounts
    .filter(val => val < 0)
    .reduce((acc, val) => acc + val, 0))

  // Functions ===========================================

  const addTransaction = (transaction) => {
    setTransactions(prev => [...prev, transaction])
  }

  const removeTransaction = (id) => {
    setTransactions(prev => 
    prev.filter(transaction => transaction.id !== id)
    )
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat(
      currency === "INR"? "en-IN" : "en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  // UI starts from here =================================

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>Expense Tracker</h1>
          <CurrencySelector
            currency={currency}
            onCurrencyChange={setCurrency}></CurrencySelector>
        </header>
        <div className="date-selectors">

          <div className="date-group">
            <h4>From</h4>
            <input
              type='date'
              className='date-box'
              value={fromDate || ""}
              onChange={(e) => setFromDate(e.target.value || null)}
            />
          </div>

          <div className="date-group">
            <h4>To</h4>
            <input
              type='date'
              className='date-box'
              value={toDate || ""}
              onChange={(e) => setToDate(e.target.value || null)}
            />
          </div>

          <button
            className='reset-date-btn'
            onClick={() => {
              setFromDate(null);
              setToDate(null);
            }}
          >Reset</button>
        </div>
        
        <section className='upper-app'>

          <Balance
            balance = {balance}
            formatCurrency = {formatCurrency}
          ></Balance>

          <IncomeExpense 
            income={income} 
            expense={expense}
            formatCurrency = {formatCurrency}
          ></IncomeExpense>

        </section>

        <section className='lower-app'>

          <TransactionList
            transactions={groupedTransactions}
            onRemoveTransaction={removeTransaction}
            formatCurrency = {formatCurrency}></TransactionList>       

          <TransactionInputForm
            onAddTransaction = {addTransaction}>
          </TransactionInputForm>

        </section>
      </div>
    </div>
  );
}

export default App;