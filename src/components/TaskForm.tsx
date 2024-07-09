import React, { useState, ChangeEvent, FormEvent } from "react";

interface TaskFormProps {
  addTask: (task: Task) => void;
}

interface Task {
  title: string;
  description?: string;
  id: number;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title) {
      addTask({
        title,
        description,
        id: Date.now(),
      });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        maxLength={100}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        maxLength={200}
      />
      <button type="submit" className="create-btn">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
