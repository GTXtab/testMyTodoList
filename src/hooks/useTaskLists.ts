import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc } from "firebase/firestore";

interface TaskList {
  id: string;
  name: string;
}

export const useTaskLists = () => {
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTaskLists = async () => {
    try {
      const q = query(collection(db, "taskLists"), where("userId", "==", auth.currentUser?.uid));
      const querySnapshot = await getDocs(q);
      setTaskLists(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TaskList)));
    } catch (err) {
      setError("Error fetching task lists");
      console.error(err);
    }
  };

  const createTaskList = async (name: string) => {
    try {
      const docRef = await addDoc(collection(db, "taskLists"), {
        userId: auth.currentUser?.uid,
        name,
      });
      setTaskLists([...taskLists, { id: docRef.id, name }]);
    } catch (err) {
      setError("Error creating task list");
      console.error(err);
    }
  };

  const updateListName = async (listId: string, newName: string) => {
    try {
      await updateDoc(doc(db, "taskLists", listId), { name: newName });
      setTaskLists(taskLists.map(list => (list.id === listId ? { ...list, name: newName } : list)));
    } catch (err) {
      setError("Error updating task list name");
      console.error(err);
    }
  };

  const deleteTaskList = async (listId: string) => {
    try {
      await deleteDoc(doc(db, "taskLists", listId));
      setTaskLists(taskLists.filter(list => list.id !== listId));
    } catch (err) {
      setError("Error deleting task list");
      console.error(err);
    }
  };

  return {
    taskLists,
    createTaskList,
    updateListName,
    deleteTaskList,
    fetchTaskLists,
    error,
  };
};
