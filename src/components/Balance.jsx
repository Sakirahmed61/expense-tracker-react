import React from 'react'
import "./Balance.css"

export default function Balance({total, formatCurrency}) {
  return (
    <div className='balance-container'>
      <h3>Balance</h3>
      <p className='balance-amount'>{formatCurrency(total)}</p>
    </div>
  )
}
