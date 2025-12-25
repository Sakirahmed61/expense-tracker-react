import React from 'react'

export default function CurrencySelector({currency, onCurrencyChange}) {

  return (
    <div>
      <select 
        id="currency"
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}>
          <option value="INR">INR</option>
          <option value="USD">USD</option>
      </select>
    </div>
  )
}