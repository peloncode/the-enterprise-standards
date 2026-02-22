import { Task } from "../../domain/entities/Task";
import { initDatabase } from "../datasources/local/database";

export const TaskRepositoryImpl = {
  async getAll(): Promise<Task[]> {
    try {
      const db = await initDatabase();
      const allRows = await db.getAllAsync<any>(
        "SELECT * FROM tasks ORDER BY createdAt DESC",
      );
      return allRows.map((row) => ({
        ...row,
        isCompleted: Boolean(row.isCompleted),
      }));
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      return [];
    }
  },

  async save(task: Task): Promise<void> {
    try {
      const db = await initDatabase();
      await db.runAsync(
        "INSERT OR REPLACE INTO tasks (id, title, description, isCompleted, createdAt, updatedAt, syncStatus) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          task.id,
          task.title,
          task.description || "",
          task.isCompleted ? 1 : 0,
          task.createdAt,
          task.updatedAt,
          task.syncStatus,
        ],
      );
    } catch (error) {
      console.error("Error al guardar tarea:", error);
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const db = await initDatabase();
      // Usamos runAsync con manejo de errores para asegurar el borrado
      await db.runAsync("DELETE FROM tasks WHERE id = ?", [id]);
      console.log(`✅ Tarea ${id} eliminada de SQLite`);
    } catch (error) {
      console.error("Error crítico al eliminar tarea:", error);
    }
  },

  // FUNCIÓN EXTRA: Úsala solo si quieres borrar TODO y empezar de cero
  async deleteAllData(): Promise<void> {
    const db = await initDatabase();
    await db.runAsync("DELETE FROM tasks");
  },
};
