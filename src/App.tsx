import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList.tsx";
import TaskForm from "./components/TaskForm.tsx";
import "./App.css";

interface Task {
  title: string;
  description?: string;
  id: number;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (
    id: number,
    newTitle: string,
    newDescription?: string,
    newPriority?: "high" | "medium" | "low"
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: newTitle,
              description: newDescription,
              priority: newPriority!,
            }
          : task
      )
    );
  };

  const toggleCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      {tasks.length > 0 && (
        <div className="filter-container">
          <button
            className={`all-btn ${filter === "all" ? "highlite" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`active-btn ${filter === "active" ? "highlite" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`completed-btn ${
              filter === "completed" ? "highlite" : ""
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
      )}

      <TaskList
        tasks={tasks}
        removeTask={removeTask}
        editTask={editTask}
        toggleCompletion={toggleCompletion}
        filter={filter}
      />
    </div>
  );
};

export default App;
