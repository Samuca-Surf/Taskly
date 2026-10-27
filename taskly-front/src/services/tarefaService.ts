import { createCrud } from "./api";
import type { Tarefa, TarefaDTO } from "../types";

export const tarefaService = createCrud<Tarefa, TarefaDTO>("tarefa");
