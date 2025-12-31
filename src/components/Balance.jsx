import React from 'react'
import "./Balance.css"

export default function Balance({balance, formatCurrency}) {
  return (
    <div className='balance-container'>
      <h3>Balance</h3>
      <p className='balance-amount'>{formatCurrency(balance)}</p>
    </div>
  )
}
