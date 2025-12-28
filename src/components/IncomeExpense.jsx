import React from 'react'
import "./IncomeExpense.css"

export default function IncomeExpense({income, expense, formatCurrency}) {
  return (
    <div className='income-expense-container'>
      <div className="value-group">
        <h3 className='label income'>Income</h3>
        <p className='amount income'>{formatCurrency(income)}</p>
      </div>
      <div className="value-group">
        <h3 className='label expense'>Expense</h3>
        <p className='amount expense'>{formatCurrency(expense)}</p>
      </div>
    </div>
  )
}
