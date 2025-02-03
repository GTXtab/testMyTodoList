import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import TaskItem from "./TaskItem";
import Input from "./Input";
import Button from "./Button";

interface TaskListProps {
  listId: string;
}

export default function TaskList({ listId }: TaskListProps) {
  const [tasks, setTasks] = useState<{ id: string; name: string; completed: boolean }[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, `lists/${listId}/tasks`), (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as any)));
    });
    return () => unsubscribe();
  }, [listId]);

  const addTask = async () => {
    if (!newTask) return;
    await addDoc(collection(db, `lists/${listId}/tasks`), { name: newTask, completed: false });
    setNewTask("");
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Tasks</h2>
      <div className="flex gap-2">
        <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="New Task" />
        <Button onClick={addTask}>Add</Button>
      </div>
      <div className="mt-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} listId={listId} task={task} />
        ))}
      </div>
    </div>
  );
}
