import { useTaskStore } from "../useTaskStore";

// Limpiamos los mocks antes de empezar
jest.useFakeTimers();

describe("TaskStore Logic", () => {
  it("debería añadir una nueva tarea al estado", async () => {
    // Accedemos directamente a las acciones del store
    const { addTask } = useTaskStore.getState();

    await addTask("Tarea de prueba", "Esta es una descripción");

    const state = useTaskStore.getState();
    expect(state.tasks.length).toBe(1);
    expect(state.tasks[0].title).toBe("Tarea de prueba");
  });

  it("debería cambiar el estado de completado", async () => {
    const state = useTaskStore.getState();
    const taskId = state.tasks[0].id;

    await state.toggleTask(taskId);

    const updatedState = useTaskStore.getState();
    expect(updatedState.tasks[0].isCompleted).toBe(true);
  });
});
