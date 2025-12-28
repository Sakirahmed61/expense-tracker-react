import React, { useRef, useState } from 'react'
import "./TransactionInputForm.css"

export default function TransactionInputForm(props) {

  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [hasError, setHasError] = useState(false);

  const amountInputRef = useRef(null)

  const handleAddTransaction = () => {

    if(label.trim() === "" || amount.trim() === "" || isNaN(amount)) {
      setHasError(true);
      return
    }
    
    setHasError(false);

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
    <div className='trans-form-container'>
      <h3>Add Transaction</h3>

      <div className="form-group">
        <label>Description</label>
        <input
          id="trans-description"
          type="text"
          value={label}
          placeholder='Enter the description'
          required

          onChange={(e) => setLabel(e.target.value)}

          onKeyDown={(e) => {
            if(e.key === "Enter")
              amountInputRef.current.focus()}}
        />
      </div>

      <div className="form-group">
        <label>Amount</label>
        <input
          className={hasError && (amount.trim() === "" || isNaN(amount)) ? "input-error" : ""}

          ref={amountInputRef}
          id="trans-amount"
          type="number"
          value={amount}
          placeholder='Enter the amount'
          required
          
          onChange={(e) => setAmount(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === "Enter") handleAddTransaction()
            if(["e","E"].includes(e.key)) e.preventDefault()}}
        />

        <small>Use ( - ) for expenses</small>

      </div>
      <button className='add-trans-btn' onClick={handleAddTransaction}>Add Transaction</button>
    </div>
  )
}

