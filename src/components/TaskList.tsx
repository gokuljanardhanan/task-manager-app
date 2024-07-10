import React from "react";
import TaskItem from "./TaskItem.tsx";

interface Task {
  title: string;
  description?: string;
  id: number;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  removeTask: (id: number) => void;
  editTask: (
    id: number,
    newTitle: string,
    newDescription?: string,
    newPriority?: "high" | "medium" | "low"
  ) => void;
  toggleCompletion: (id: number) => void;
  filter: string;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  removeTask,
  editTask,
  toggleCompletion,
  filter,
}) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <ul>
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          removeTask={removeTask}
          editTask={editTask}
          toggleCompletion={toggleCompletion}
        />
      ))}
    </ul>
  );
};

export default TaskList;
