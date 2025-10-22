import { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
import SearchBar from "./components/SearchBar";

export default function ExpenseTracker() {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Income");
  const [search, setSearch] = useState("");

  const addTransaction = () => {
    if (!title.trim()) {
      alert("Title must not be empty.");
      return;
    }
    if (amount <= 0) {
      alert("Amount must be a positive number.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type,
    };

    setTransactions([newTransaction, ...transactions]);
    setTitle("");
    setAmount("");
    setType("Income");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const filteredTransactions = transactions.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold">Expense Tracker</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mt-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        {showForm ? "Close Form" : "Open Form"}
      </button>

      {showForm && (
        <TransactionForm
          title={title}
          amount={amount}
          type={type}
          setTitle={setTitle}
          setAmount={setAmount}
          setType={setType}
          addTransaction={addTransaction}
        />
      )}

      <SearchBar search={search} setSearch={setSearch} />

      <Summary balance={balance} income={income} expense={expense} />

      <TransactionList
        transactions={filteredTransactions}
        deleteTransaction={deleteTransaction}
      />
    </div>
  );
}
