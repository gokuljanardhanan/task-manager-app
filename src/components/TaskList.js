import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, removeTask, editTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          removeTask={removeTask}
          editTask={editTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
