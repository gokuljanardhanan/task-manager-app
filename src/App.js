import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newTitle, newDescription) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, description: newDescription }
          : task
      )
    );
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} removeTask={removeTask} editTask={editTask} />
    </div>
  );
};

export default App;
