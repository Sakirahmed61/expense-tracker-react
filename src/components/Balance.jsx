import React from 'react'

export default function Balance({total, formatCurrency}) {
  return (
    <div>
      <h3>Balance</h3>
      <p>{formatCurrency(total)}</p>
    </div>
  )
}
