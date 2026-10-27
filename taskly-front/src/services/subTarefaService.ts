import { createCrud, request } from "./api";
import type { SubTarefa, SubTarefaDTO } from "../types";

const base = createCrud<SubTarefa, SubTarefaDTO>("subtarefa");

export const subTarefaService = {
  ...base,
  // GET /api/subtarefa/listar/{idTarefa}
  listarPorTarefa: (idTarefa: number) =>
    request<SubTarefa[]>(`/subtarefa/listar/${idTarefa}`),
};
