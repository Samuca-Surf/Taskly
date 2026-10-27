import type { Tarefa, TarefaDTO } from "../types";

export function projetoIdDaTarefa(t: Tarefa): number | undefined {
  return t.projeto?.id ?? t.status?.projeto?.id ?? t.categoria?.projeto?.id;
}

export function tarefaToDTO(
  t: Tarefa,
  projetoId: number,
  override: Partial<TarefaDTO> = {}
): TarefaDTO {
  return {
    id_projeto: projetoId,
    id_categoria: t.categoria?.id ?? 0,
    id_status: t.status?.id ?? 0,
    titulo: t.titulo,
    descricao: t.descricao ?? "",
    prioridade: t.prioridade ?? "MEDIA",
    data_final: t.dataFinal ?? null,
    posicao: t.posicao ?? 0,
    ...override,
  };
}

export function formatarData(iso?: string | null): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}