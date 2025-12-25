import React from 'react'

export default function IncomeExpense({income, expense, formatCurrency}) {
  return (
    <div>
      <div className="value-group">
        <h3>Income</h3>
        <p>{formatCurrency(income)}</p>
      </div>
      <div className="value-group">
        <h3>Expense</h3>
        <p>{formatCurrency(expense)}</p>
      </div>
    </div>
  )
}
