import { useMemo } from "react";
import { useAsync } from "./useAsync";
import { categoriaService } from "../services/categoriaService";
import { statusService } from "../services/statusService";
import { tarefaService } from "../services/tarefaService";
import { projetoIdDaTarefa } from "../utils/tarefa";

// Carrega tarefas, status e categorias e já filtra pelo projeto atual
export function useProjetoData(projetoId: number) {
  const t = useAsync(() => tarefaService.list(), [projetoId]);
  const s = useAsync(() => statusService.list(), [projetoId]);
  const c = useAsync(() => categoriaService.list(), [projetoId]);

  const tarefas = useMemo(
    () =>
      (t.data ?? [])
        .filter((x) => projetoIdDaTarefa(x) === projetoId)
        .sort((a, b) => (a.posicao ?? 0) - (b.posicao ?? 0)),
    [t.data, projetoId]
  );
  const statusList = useMemo(
    () =>
      (s.data ?? [])
        .filter((x) => x.projeto?.id === projetoId)
        .sort((a, b) => (a.posicao ?? 0) - (b.posicao ?? 0)),
    [s.data, projetoId]
  );
  const categorias = useMemo(
    () => (c.data ?? []).filter((x) => x.projeto?.id === projetoId),
    [c.data, projetoId]
  );

  return {
    tarefas,
    statusList,
    categorias,
    loading: t.loading || s.loading || c.loading,
    error: t.error || s.error || c.error,
    reload: t.reload,
  };
}