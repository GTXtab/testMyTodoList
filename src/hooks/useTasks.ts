import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc } from "firebase/firestore";

interface Task {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  listId: string;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const fetchTasks = async (listId: string) => {
    try {
      const q = query(collection(db, "tasks"), where("listId", "==", listId));
      const querySnapshot = await getDocs(q);
      setTasks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task)));
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  const addTask = async (listId: string, name: string, description: string) => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        userId: auth.currentUser?.uid,
        name,
        description,
        completed: false,
        listId,
      });
      setTasks([...tasks, { id: docRef.id, name, description, completed: false, listId }]);
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  const updateTask = async (taskId: string, newName: string, newDescription: string, newCompleted: boolean) => {
    try {
      await updateDoc(doc(db, "tasks", taskId), { name: newName, description: newDescription, completed: newCompleted });
      setTasks(tasks.map(task => (task.id === taskId ? { ...task, name: newName, description: newDescription, completed: newCompleted } : task)));
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  return {
    tasks,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    selectedTask,
    setSelectedTask,
  };
};
