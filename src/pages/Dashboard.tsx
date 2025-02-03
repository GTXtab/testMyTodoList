import React, { useState } from "react";
import { useTaskLists } from "../hooks/useTaskLists";
import { useTasks } from "../hooks/useTasks";

export default function Dashboard() {
  const { taskLists, createTaskList, updateListName, deleteTaskList } = useTaskLists();
  const { tasks, fetchTasks, addTask, updateTask, deleteTask, setSelectedTask, selectedTask } = useTasks();
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [newListName, setNewListName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">To-Do Lists</h1>

      <div className="flex space-x-2 mb-4 w-full max-w-md">
        <input
          type="text"
          placeholder="New List Name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          onClick={() => {
            if (newListName.trim()) {
              createTaskList(newListName);
              setNewListName(""); // Очищаємо поле після створення
            }
          }}
        >
          Add List
        </button>
      </div>

      <ul className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
        {taskLists.map((list) => (
          <li key={list.id} className="flex justify-between items-center border-b py-2">
            <span
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => { setSelectedListId(list.id); fetchTasks(list.id); }}
            >
              {list.name}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => updateListName(list.id, prompt("New name", list.name) || list.name)}
                className="text-yellow-500 hover:text-yellow-700"
              >
                Edit
              </button>
              <button onClick={() => deleteTaskList(list.id)} className="text-red-500 hover:text-red-700">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedListId && (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Tasks in Selected List</h2>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md mt-2 focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => {
                if (taskName.trim() && taskDescription.trim()) {
                  addTask(selectedListId, taskName, taskDescription);
                  setTaskName(""); 
                  setTaskDescription(""); 
                }
              }}
              className="w-full bg-blue-600 text-white py-2 mt-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Task
            </button>
          </div>

          {/* Список задач */}
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center p-2 border-b cursor-pointer hover:bg-gray-100"
                onClick={() => 
                  {console.log("Clicked on task:", task);
                  setSelectedTask(task);}}
              >
                <span className={task.completed ? "line-through text-gray-500" : "text-gray-800"}>{task.name}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateTask(task.id, prompt("Edit name", task.name) || task.name, prompt("Edit description", task.description) || task.description, task.completed)}
                    className="text-green-500 hover:text-green-700"
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedTask &&     
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold">{selectedTask.name}</h2>
        <p className="text-gray-600 mt-2">{selectedTask.description}</p>

        <button
          onClick={() => updateTask(selectedTask.id, selectedTask.name, selectedTask.description, !selectedTask.completed)}
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700 transition"
        >
          {selectedTask.completed ? "Mark as Pending" : "Mark as Completed"}
        </button>

        <button
          onClick={() => setSelectedTask(null)}
          className="w-full bg-gray-300 text-gray-700 py-2 mt-2 rounded-md hover:bg-gray-400 transition"
        >
          Close
        </button>
      </div>
    </div>}
    </div>
  );
}
