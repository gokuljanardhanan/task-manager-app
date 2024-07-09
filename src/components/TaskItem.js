import React, { useState } from "react";

const TaskItem = ({ task, removeTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

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
            onChange={(e) => setNewTitle(e.target.value)}
            maxLength={100}
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
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
