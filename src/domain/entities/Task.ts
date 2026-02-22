export type SyncStatus = "synced" | "pending" | "error";

export interface Task {
  id: string; // Usaremos nanoid()
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: number; // Timestamp
  updatedAt: number; // Para control de versiones
  syncStatus: SyncStatus; // Clave para el Offline-First
}
