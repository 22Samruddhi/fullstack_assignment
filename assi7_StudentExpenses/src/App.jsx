
import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses((previousExpenses) => [
      ...previousExpenses,
      expense,
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses((previousExpenses) =>
      previousExpenses.filter((expense) => expense.id !== id)
    );
  };

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div className="container">
      <h1>Personal Expense Tracker</h1>

      <div className="total-card">
        <h2>Total Expenses</h2>
        <h1>₹{totalExpenses.toFixed(2)}</h1>
      </div>

      <ExpenseForm onAddExpense={addExpense} />

      <ExpenseList
        expenses={expenses}
        onDeleteExpense={deleteExpense}
      />
    </div>
  );
}

export default App;
