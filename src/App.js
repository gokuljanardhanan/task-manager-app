import React, { useState } from "react";
import TodoForm from "./components/TodoForm";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTask = (todo) => {
    setTodos([...todos, todo]);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TodoForm addTask={addTask} />
    </div>
  );
};

export default App;
