import React, { useState, ChangeEvent, FormEvent } from "react";

interface TaskFormProps {
  addTask: (task: Task) => void;
}

interface Task {
  title: string;
  description?: string;
  id: number;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("low");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    addTask({
      title,
      description,
      id: Date.now(),
      priority,
      completed: false,
    });
    setTitle("");
    setDescription("");
    setPriority("low");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
          if (error && e.target.value) {
            setError("");
          }
        }}
        maxLength={100}
      />
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        maxLength={200}
      />
      <select
        value={priority}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setPriority(e.target.value as "high" | "medium" | "low")
        }
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit" className="create-btn">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
