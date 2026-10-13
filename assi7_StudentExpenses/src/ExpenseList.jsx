
function ExpenseList({ expenses, onDeleteExpense }) {
  return (
    <div>
      <h2>Expense History</h2>

      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        expenses.map((expense) => (
          <div className="expense-card" key={expense.id}>
            <h3>{expense.title}</h3>
            <p>Amount: ₹{expense.amount.toFixed(2)}</p>
            <p>Category: {expense.category}</p>
            <p>Date: {expense.date}</p>

            <button
              type="button"
              onClick={() => onDeleteExpense(expense.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;
