import React from 'react'
import "./CurrencySelector.css"

export default function CurrencySelector({currency, onCurrencyChange}) {

  return (
    <div className='currency-selector'>
      <select
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}>
          <option value="INR">INR</option>
          <option value="USD">USD</option>
      </select>
    </div>
  )
}