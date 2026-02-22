import NetInfo from "@react-native-community/netinfo";
import * as Crypto from "expo-crypto";
import { create } from "zustand";
import { TaskRepositoryImpl } from "../../data/repositories/TaskRepositoryImpl";
import { Task } from "../../domain/entities/Task";

interface TaskState {
  tasks: Task[];
  isOnline: boolean;
  loadTasks: () => Promise<void>;
  addTask: (title: string, description?: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  syncPendingTasks: () => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isOnline: true,

  loadTasks: async () => {
    const tasks = await TaskRepositoryImpl.getAll();
    set({ tasks });

    NetInfo.addEventListener((state) => {
      const wasOffline = !get().isOnline;
      const isNowOnline = state.isConnected ?? false;

      set({ isOnline: isNowOnline });

      if (wasOffline && isNowOnline) {
        get().syncPendingTasks();
      }
    });
  },

  addTask: async (title, description) => {
    const newTask: Task = {
      id: Crypto.randomUUID(),
      title,
      description,
      isCompleted: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      syncStatus: get().isOnline ? "synced" : "pending",
    };

    await TaskRepositoryImpl.save(newTask);
    set({ tasks: [newTask, ...get().tasks] });
  },

  toggleTask: async (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;

    const updatedTask: Task = {
      ...task,
      isCompleted: !task.isCompleted,
      updatedAt: Date.now(),
      syncStatus: get().isOnline ? "synced" : "pending",
    };

    await TaskRepositoryImpl.save(updatedTask);
    set({
      tasks: get().tasks.map((t) => (t.id === id ? updatedTask : t)),
    });
  },

  deleteTask: async (id) => {
    await TaskRepositoryImpl.delete(id);
    set({ tasks: get().tasks.filter((t) => t.id !== id) });
  },

  syncPendingTasks: async () => {
    const pending = get().tasks.filter((t) => t.syncStatus === "pending");
    if (pending.length === 0) return;

    console.log(`📡 Sincronizando ${pending.length} tareas...`);

    // latencia de red
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const syncedTasks = get().tasks.map((t) => ({
      ...t,
      syncStatus: "synced" as const,
    }));

    for (const task of syncedTasks) {
      await TaskRepositoryImpl.save(task);
    }

    set({ tasks: syncedTasks });
    console.log("✅ Sincronización completada");
  },
}));
