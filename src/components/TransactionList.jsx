import "./TransactionList.css"

export default function TransactionList({transactions, onRemoveTransaction, formatCurrency}) {

  return (
    <div className='transaction-list'>
      <h3>History</h3>

      <ul className='list-container'>

        {
          (transactions.length===0) ? <p className='empty-state'>No transactions yet</p> :
          
          transactions.map((transaction) => (
            <li key={transaction.id} 
              className={`list-item ${transaction.amount < 0 ? "expense" : "income"}`}>
              
              <span className='trans-label'>{transaction.label}</span>

              <div className="trans-item-right">
                <span className={`trans-amount ${transaction.amount < 0 ? "expense" : "income"}`}>{formatCurrency(transaction.amount)}</span>

                <button className='remove-btn'
                  onClick={() => onRemoveTransaction(transaction.id)}
                ></button>
              </div>
            </li>
            )
          )
        }
      </ul>
    </div>
  )
}
