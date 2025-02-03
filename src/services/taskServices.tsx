import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

export const addTask = async (listId: string, task: { name: string; completed: boolean }) => {
  await addDoc(collection(db, `lists/${listId}/tasks`), task);
};

export const updateTask = async (listId: string, taskId: string, updates: object) => {
  await updateDoc(doc(db, `lists/${listId}/tasks`, taskId), updates);
};

export const deleteTask = async (listId: string, taskId: string) => {
  await deleteDoc(doc(db, `lists/${listId}/tasks`, taskId));
};
