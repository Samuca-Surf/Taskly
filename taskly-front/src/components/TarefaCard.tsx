import { Link } from "react-router-dom";
import { useProjetoAtual } from "../hooks/useProjetoAtual";
import { chipStyle } from "../utils/cor";
import { prioridadeLabel, prioridadeStyle } from "../utils/prioridade";
import { formatarData } from "../utils/tarefa";
import type { Tarefa } from "../types";

interface Props {
  tarefa: Tarefa;
  onDragStart: (id: number) => void;
}

export default function TarefaCard({ tarefa, onDragStart }: Props) {
  const projeto = useProjetoAtual();

  return (
    <div
      draggable
      onDragStart={() => onDragStart(tarefa.id)}
      className="cursor-grab rounded-xl border border-white/10 bg-[#1a1636] p-3 shadow-md shadow-black/20 transition hover:border-violet-500/50 active:cursor-grabbing"
    >
      <Link
        to={`/projeto/${projeto.id}/tarefa/${tarefa.id}`}
        className="font-medium text-slate-100 hover:text-violet-300"
      >
        {tarefa.titulo}
      </Link>
      {tarefa.descricao && (
        <p className="mt-1 line-clamp-2 text-xs text-slate-400">{tarefa.descricao}</p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {tarefa.prioridade && (
          <span
            className={`rounded px-2 py-0.5 text-[11px] ${
              prioridadeStyle[tarefa.prioridade] ?? "bg-white/10 text-slate-300"
            }`}
          >
            {prioridadeLabel[tarefa.prioridade] ?? tarefa.prioridade}
          </span>
        )}
        {tarefa.categoria && (
          <span
            className="rounded border px-2 py-0.5 text-[11px]"
            style={chipStyle(tarefa.categoria.hexColor)}
          >
            {tarefa.categoria.nome}
          </span>
        )}
        {tarefa.dataFinal && (
          <span className="ml-auto text-[11px] text-slate-500">
            {formatarData(tarefa.dataFinal)}
          </span>
        )}
      </div>
    </div>
  );
}