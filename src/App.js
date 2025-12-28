import './App.css';
import Balance from "./components/Balance";
import IncomeExpense from "./components/IncomeExpense";
import TransactionList from "./components/TransactionList";
import TransactionInputForm from "./components/TransactionInputForm";
import CurrencySelector from './components/CurrencySelector';
import { useEffect, useState } from 'react';

function App() {

  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("currency") || "INR"
  });

  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    return stored? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
  },[transactions]);

  useEffect(() => {
    localStorage.setItem("currency", currency)
  },[currency]);

  const amounts = transactions.map(t => t.amount);
  
  const total = amounts.reduce((acc, val) => acc + val, 0)

  const income = amounts
    .filter(val => val > 0)
    .reduce((acc, val) => acc + val, 0)

  const expense = Math.abs(amounts
    .filter(val => val < 0)
    .reduce((acc, val) => acc + val, 0))

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

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>Expense Tracker</h1>
          <CurrencySelector
            currency={currency}
            onCurrencyChange={setCurrency}></CurrencySelector>
        </header>
        
        <section className='upper-app'>
          <Balance
            total = {total}
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
            transactions={transactions}
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