import "./TransactionList.css"

export default function TransactionList({transactions, onRemoveTransaction, formatCurrency , onEditTransaction , editingTransaction}) {

  return (
    <div className='transaction-list'>
      <h3>History</h3>

      <ul className='list-container'>

        {
          (Object.entries(transactions).length===0) ? <p className='empty-state'>No transactions yet</p> :
          
          Object.entries(transactions).map(([date, items]) => (
            <div key={date}>
              <h5 className="trans-date-label">{date}</h5>

              {items.map(transaction => (

                <li 
                  key={transaction.id} 
                  className={`list-item 
                    ${transaction.amount < 0 ? "expense" : "income"}
                    ${editingTransaction?.id === transaction.id ? "editing" : ""}
                    `}
                  onClick={() => onEditTransaction(transaction)}
                >
                  
                  <span className='trans-label'>{transaction.label}</span>

                  <div className="trans-item-right">
                    <span className={`trans-amount ${transaction.amount < 0 ? "expense" : "income"}`}>{formatCurrency(transaction.amount)}</span>

                    <button className='remove-btn'
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveTransaction(transaction.id)
                        
                      }}
                    ></button>
                  </div>
                </li>
              ))}
            </div>
            )
          )
        }
      </ul>
    </div>
  )
}
