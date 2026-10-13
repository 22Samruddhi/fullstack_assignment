
function ExpenseForm({ onAddExpense }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const expense = {
      id: Date.now(),
      title: form.title.value,
      amount: Number(form.amount.value),
      category: form.category.value,
      date: form.date.value,
    };

    onAddExpense(expense);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Expense</h2>

      <label>Expense Title:</label>
      <input
        type="text"
        name="title"
        placeholder="e.g. Groceries"
        required
      />

      <label>Amount (₹):</label>
      <input
        type="number"
        name="amount"
        min="0.01"
        step="0.01"
        placeholder="Enter amount"
        required
      />

      <label>Category:</label>
      <select name="category" defaultValue="" required>
        <option value="" disabled>Select category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Education">Education</option>
        <option value="Other">Other</option>
      </select>

      <label>Date:</label>
      <input type="date" name="date" required />

      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
