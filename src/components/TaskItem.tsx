import React from "react";
import { updateTask, deleteTask } from "../services/taskServices";

interface TaskItemProps {
  listId: string;
  task: { id: string; name: string; completed: boolean };
}

export default function TaskItem({ listId, task }: TaskItemProps) {
  return (
    <div className="flex justify-between items-center p-3 border-b">
      <span className={task.completed ? "line-through text-gray-500" : ""}>{task.name}</span>
      <div>
        <button
          onClick={() => updateTask(listId, task.id, { completed: !task.completed })}
          className={`px-2 py-1 rounded ${task.completed ? "bg-green-500" : "bg-gray-300"} text-white`}
        >
          {task.completed ? "✅" : "⬜"}
        </button>
        <button
          onClick={() => deleteTask(listId, task.id)}
          className="px-2 py-1 rounded bg-red-500 text-white ml-2"
        >
          🗑
        </button>
      </div>
    </div>
  );
}
