import { FormEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import TarefaForm from "../components/TarefaForm";
import { ErrorMsg, Loading } from "../components/Feedback";
import { btnDanger, btnGhost, btnPrimary, inputCls } from "../components/ui";
import { useAsync } from "../hooks/useAsync";
import { useProjetoAtual } from "../hooks/useProjetoAtual";
import { useProjetoData } from "../hooks/useProjetoData";
import { subTarefaService } from "../services/subTarefaService";
import { tarefaService } from "../services/tarefaService";
import { chipStyle } from "../utils/cor";
import { prioridadeLabel, prioridadeStyle } from "../utils/prioridade";
import { formatarData } from "../utils/tarefa";
import type { SubTarefa } from "../types";

export default function TarefaDetalhe() {
  const { id } = useParams();
  const tarefaId = Number(id);
  const projeto = useProjetoAtual();
  const navigate = useNavigate();

  const { tarefas, statusList, categorias, loading, error, reload } = useProjetoData(projeto.id);
  const { data: subsData, reload: reloadSubs } = useAsync(
    () => subTarefaService.listarPorTarefa(tarefaId),
    [tarefaId]
  );
  const subs = [...(subsData ?? [])].sort((a, b) => (a.posicao ?? 0) - (b.posicao ?? 0));

  const tarefa = tarefas.find((t) => t.id === tarefaId);
  const [editando, setEditando] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState("");

  async function adicionar(e: FormEvent) {
    e.preventDefault();
    if (!novoTitulo.trim()) return;
    try {
      await subTarefaService.create({
        id_tarefa: tarefaId,
        titulo: novoTitulo,
        completado: false,
        posicao: subs.length,
      });
      setNovoTitulo("");
      reloadSubs();
    } catch (err) {
      alert((err as Error).message);
    }
  }

  async function alternar(s: SubTarefa) {
    try {
      await subTarefaService.update(s.id, {
        id_tarefa: tarefaId,
        titulo: s.titulo,
        completado: !s.completado,
        posicao: s.posicao ?? 0,
      });
      reloadSubs();
    } catch (err) {
      alert((err as Error).message);
    }
  }

  async function removerSub(s: SubTarefa) {
    try {
      await subTarefaService.remove(s.id);
      reloadSubs();
    } catch (err) {
      alert((err as Error).message);
    }
  }

  async function excluirTarefa() {
    if (!confirm("Excluir esta tarefa?")) return;
    try {
      await tarefaService.remove(tarefaId);
      navigate(`/projeto/${projeto.id}`);
    } catch (err) {
      alert((err as Error).message);
    }
  }

  if (loading) return <Loading />;
  if (error) return <ErrorMsg message={error} />;
  if (!tarefa) return <ErrorMsg message="Tarefa não encontrada neste projeto." />;

  const total = subs.length;
  const feitas = subs.filter((s) => s.completado).length;
  const pct = total === 0 ? 0 : Math.round((feitas / total) * 100);

  return (
    <div className="max-w-3xl">
      <Link
        to={`/projeto/${projeto.id}`}
        className="mb-2 inline-block text-sm text-slate-400 transition hover:text-violet-300"
      >
        ← Voltar ao quadro
      </Link>
      <PageHeader title={tarefa.titulo}>
        <button className={btnGhost} onClick={() => setEditando(true)}>
          Editar
        </button>
        <button className={btnDanger} onClick={excluirTarefa}>
          Excluir
        </button>
      </PageHeader>

      <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="whitespace-pre-wrap text-sm text-slate-300">
          {tarefa.descricao || "Sem descrição."}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          {tarefa.status && (
            <span className="rounded bg-white/10 px-2 py-1 text-slate-200">{tarefa.status.nome}</span>
          )}
          {tarefa.prioridade && (
            <span
              className={`rounded px-2 py-1 ${
                prioridadeStyle[tarefa.prioridade] ?? "bg-white/10 text-slate-300"
              }`}
            >
              {prioridadeLabel[tarefa.prioridade] ?? tarefa.prioridade}
            </span>
          )}
          {tarefa.categoria && (
            <span className="rounded border px-2 py-1" style={chipStyle(tarefa.categoria.hexColor)}>
              {tarefa.categoria.nome}
            </span>
          )}
          {tarefa.dataFinal && (
            <span className="text-slate-400">Prazo: {formatarData(tarefa.dataFinal)}</span>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-white">Subtarefas</h3>
          <span className="text-xs text-slate-400">
            {feitas}/{total} ({pct}%)
          </span>
        </div>
        <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>

        <ul className="mb-4 divide-y divide-white/10">
          {subs.map((s) => (
            <li key={s.id} className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                checked={!!s.completado}
                onChange={() => alternar(s)}
                className="h-4 w-4 accent-violet-500"
              />
              <span
                className={`flex-1 text-sm ${
                  s.completado ? "text-slate-500 line-through" : "text-slate-200"
                }`}
              >
                {s.titulo}
              </span>
              <button className={btnDanger} onClick={() => removerSub(s)}>
                Remover
              </button>
            </li>
          ))}
          {total === 0 && <li className="py-2 text-sm text-slate-500">Nenhuma subtarefa.</li>}
        </ul>

        <form onSubmit={adicionar} className="flex gap-2">
          <input
            className={inputCls}
            placeholder="Nova subtarefa..."
            value={novoTitulo}
            onChange={(e) => setNovoTitulo(e.target.value)}
          />
          <button className={btnPrimary}>Adicionar</button>
        </form>
      </div>

      {editando && (
        <TarefaForm
          projeto={projeto}
          tarefa={tarefa}
          statusList={statusList}
          categorias={categorias}
          tarefas={tarefas}
          onClose={() => setEditando(false)}
          onSaved={() => {
            setEditando(false);
            reload();
          }}
        />
      )}
    </div>
  );
}