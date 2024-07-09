import React from "react";
import TaskItem from "./TaskItem.tsx";

interface Task {
  title: string;
  description?: string;
  id: number;
}

interface TaskListProps {
  tasks: Task[];
  removeTask: (id: number) => void;
  editTask: (id: number, newTitle: string, newDescription?: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, removeTask, editTask }) => {
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
