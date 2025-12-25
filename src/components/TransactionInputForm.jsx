import React, { useState } from 'react'

export default function TransactionInputForm(props) {

  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddTransaction = () => {

    if(label.trim() === "" || amount === 0)
      return

    const transaction = {
      id: Date.now(),
      label: label,
      amount: Number(amount)
    }

    props.onAddTransaction(transaction)
    setLabel("")
    setAmount("")
  }

  return (
    <div>
      <h3>Add Transaction</h3>
      <div className="form-group">
        <label>Description</label>
        <input
          onChange={(e) => setLabel(e.target.value)}
          id="trans-description"
          type="text"
          value={label}
          required
        />
      </div>
      <div className="form-group">
        <label>Amount</label>
        <input
          onChange={(e) => setAmount(e.target.value)}
          id="trans-amount"
          type="number"
          value={amount}
          required
        />
        <small>Use (-) for expenses</small>
      </div>
      <button onClick={handleAddTransaction}>Add Transaction</button>
    </div>
  )
}

