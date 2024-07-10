import React, { useState, ChangeEvent } from "react";

interface Task {
  title: string;
  description?: string;
  id: number;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  removeTask: (id: number) => void;
  editTask: (
    id: number,
    newTitle: string,
    newDescription?: string,
    newPriority?: "high" | "medium" | "low"
  ) => void;
  toggleCompletion: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  removeTask,
  editTask,
  toggleCompletion,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(task.title);
  const [newDescription, setNewDescription] = useState<string>(
    task.description || ""
  );
  const [newPriority, setNewPriority] = useState<"high" | "medium" | "low">(
    task.priority
  );
  const [error, setError] = useState<string>("");

  const handleEdit = () => {
    if (!newTitle.trim()) {
      setError("Title is required.");
      return;
    }
    editTask(task.id, newTitle, newDescription, newPriority);
    setIsEditing(false);
    setError("");
  };

  return (
    <li>
      {isEditing ? (
        <div>
          {error && <div className="error">{error}</div>}
          <input
            type="text"
            value={newTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewTitle(e.target.value)
            }
            maxLength={100}
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewDescription(e.target.value)
            }
            maxLength={200}
          />
          <select
            value={newPriority}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setNewPriority(e.target.value as "high" | "medium" | "low")
            }
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button className="save-btn" onClick={handleEdit}>
            Save
          </button>
        </div>
      ) : (
        <div className={`item-container ${task.completed ? "completed" : ""}`}>
          <div className="item-content">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span className={`priority ${task.priority}`}>{task.priority}</span>
          </div>
          <div className="btn-container">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => removeTask(task.id)}>
              Delete
            </button>
            <button
              className={`complete-btn ${task.completed ? "unmark" : "mark"}`}
              onClick={() => toggleCompletion(task.id)}
            >
              {task.completed ? "Unmark" : "Complete"}
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
