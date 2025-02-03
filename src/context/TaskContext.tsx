import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (name: string) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Task)));
    });
    return () => unsubscribe();
  }, []);

  const addTask = async (name: string) => {
    await addDoc(collection(db, "tasks"), { name, completed: false });
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    await updateDoc(doc(db, "tasks", taskId), updates);
  };

  const deleteTask = async (taskId: string) => {
    await deleteDoc(doc(db, "tasks", taskId));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};


async function testFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Firestore error:", error);
  }
}

testFirestore();
