import React, { useState, ChangeEvent } from "react";

interface Task {
  title: string;
  description?: string;
  id: number;
}

interface TaskItemProps {
  task: Task;
  removeTask: (id: number) => void;
  editTask: (id: number, newTitle: string, newDescription?: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, removeTask, editTask }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(task.title);
  const [newDescription, setNewDescription] = useState<string>(
    task.description || ""
  );

  const handleEdit = () => {
    editTask(task.id, newTitle, newDescription);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <div>
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
          <button className="save-btn" onClick={handleEdit}>
            Save
          </button>
        </div>
      ) : (
        <div className="item-container">
          <div className="item-content">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
          <div className="btn-container">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => removeTask(task.id)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
