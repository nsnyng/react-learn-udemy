import { useState } from "react";
import ExpenseList from "./ExpensesList";
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import Card from "../UI/Card";
import "./Expenses.css";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.items.filter((item) => {
    return item.date.getFullYear().toString() === filteredYear;
  });

  return (
    <Card className="expenses">
      <ExpensesFilter
        onChangeExpenseDateFilter={filterChangeHandler}
        defaultYear={filteredYear}
      />
      <ExpenseList items={filteredExpenses}/>
    </Card>
  );
};

export default Expenses;
