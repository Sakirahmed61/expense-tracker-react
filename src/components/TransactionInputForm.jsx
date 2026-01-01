import React, { useRef, useState , useEffect} from 'react'
import "./TransactionInputForm.css"

export default function TransactionInputForm({onAddTransaction ,
editingTransaction , setEditingTransaction , onUpdateTransaction}) {

  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [hasError, setHasError] = useState(false);

  const amountInputRef = useRef(null)
  const labelInputRef = useRef(null)

  useEffect(() => {
    if(editingTransaction) {
      setLabel(editingTransaction.label)
      setAmount(editingTransaction.amount.toString());
    } else {
      setLabel("");
      setAmount("");
    }
  }, [editingTransaction])

  const handleSubmit = () => {

    if(label.trim() === "" || amount.trim() === "" || isNaN(amount)) {
      setHasError(true);
      return
    }
    
    setHasError(false)

    if (editingTransaction) {
      const updatedTransaction = {
        ...editingTransaction,
        label: label,
        amount: Number(amount)
      };

      onUpdateTransaction(updatedTransaction);
      setEditingTransaction(null)
    } else {
      const transaction = {
        id: Date.now(),
        label: label,
        amount: Number(amount),
        dateCreated: new Date().toISOString()
      }

      onAddTransaction(transaction)
    }
    
    setLabel("")
    setAmount("")
  }

  return (
    <div className='trans-form-container'>
      <h3>{editingTransaction ? "Edit Transaction" : "Add Transaction"}</h3>

      <div className="form-group">
        <label>Description</label>
        <input
          className={hasError && (label.trim() === "" || isNaN(label)) ? "input-error" : ""}
          id="trans-description"
          type="text"
          value={label}
          placeholder='Enter the description'
          ref={labelInputRef}
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
            if(e.key === "Enter") {
              handleSubmit()
              labelInputRef.current.focus()}
            if(["e","E"].includes(e.key)) e.preventDefault()
            
          }}
        />

        <small>Use ( - ) for expenses</small>

      </div>
      <button 
        className='add-trans-btn' 
        onClick={handleSubmit}>
          {editingTransaction ? "Edit Transaction" : "Add Transaction"}
      </button>
      
      <button
        className={`cancel-edit-btn ${editingTransaction ? "show" : ""}`}
        onClick={() => {
          setEditingTransaction(null);
          setLabel("");
          setAmount("");
        }}
      >
        Cancel
      </button>
    </div>
  )
}

