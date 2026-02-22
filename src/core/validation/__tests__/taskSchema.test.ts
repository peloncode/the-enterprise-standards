import { taskSchema } from "../taskSchema";

describe("TaskSchema Validation", () => {
  it("debería aceptar un título válido", () => {
    const result = taskSchema.safeParse({ title: "Comprar pan" });
    expect(result.success).toBe(true);
  });

  it("debería rechazar un título muy corto", () => {
    const result = taskSchema.safeParse({ title: "ok" });
    expect(result.success).toBe(false);
  });
});
