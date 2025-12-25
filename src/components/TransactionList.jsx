import React from 'react'

export default function TransactionList({transactions, onRemoveTransaction, formatCurrency}) {

  return (
    <div>
      <h3>History</h3>

      <ul>
        {transactions.map((transaction) => (
        <li key={transaction.id}>
          <span>{transaction.label}</span>
          <span>{formatCurrency(transaction.amount)}</span>
          <button
            onClick={() => onRemoveTransaction(transaction.id)}
          >X</button>
        </li>
        )
        )}
      </ul>
    </div>
  )
}
