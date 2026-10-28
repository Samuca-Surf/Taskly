import { FormEvent, useEffect, useState } from "react";
import TarefaForm from "./TarefaForm";
import { ErrorMsg } from "./Feedback";
import { btnDanger, btnGhost, btnPrimary, inputCls } from "./ui";
import { useAsync } from "../hooks/useAsync";
import { useProjetoAtual } from "../hooks/useProjetoAtual";
import { subTarefaService } from "../services/subTarefaService";
import { tarefaService } from "../services/tarefaService";
import { chipStyle } from "../utils/cor";
import { prioridadeLabel, prioridadeStyle } from "../utils/prioridade";
import { formatarData } from "../utils/tarefa";
import type { SubTarefa, Tarefa } from "../types";

type Props = {
  tarefa: Tarefa;
  projeto: ReturnType<typeof useProjetoAtual>;
  statusList: any[];
  categorias: any[];
  tarefas: Tarefa[];
  onClose: () => void;
  /** chamado após editar/excluir para o Quadro recarregar */
  onChanged: () => void;
};

export default function TarefaModal({
  tarefa,
  projeto,
  statusList,
  categorias,
  tarefas,
  onClose,
  onChanged,
}: Props) {
  const { data, reload: reloadSubs } = useAsync(
    () => subTarefaService.listarPorTarefa(tarefa.id),
    [tarefa.id]
  );
  const subs = [...(data ?? [])].sort((a, b) => (a.posicao ?? 0) - (b.posicao ?? 0));

  const [editandoTarefa, setEditandoTarefa] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [subEditando, setSubEditando] = useState<number | null>(null);
  const [tituloEdit, setTituloEdit] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  // fecha com ESC
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && !editandoTarefa && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, editandoTarefa]);

  const total = subs.length;
  const feitas = subs.filter((s) => s.completado).length;
  const pct = total === 0 ? 0 : Math.round((feitas / total) * 100);

  async function adicionar(e: FormEvent) {
    e.preventDefault();
    if (!novoTitulo.trim()) return;
    try {
      await subTarefaService.create({
        id_tarefa: tarefa.id,
        titulo: novoTitulo.trim(),
        completado: false,
        posicao: subs.length,
      });
      setNovoTitulo("");
      setErro(null);
      reloadSubs();
    } catch (err) {
      setErro((err as Error).message);
    }
  }

  async function alternar(s: SubTarefa) {
    try {
      await subTarefaService.update(s.id, {
        id_tarefa: tarefa.id,
        titulo: s.titulo,
        completado: !s.completado,
        posicao: s.posicao ?? 0,
      });
      reloadSubs();
    } catch (err) {
      setErro((err as Error).message);
    }
  }

  function iniciarEdicao(s: SubTarefa) {
    setSubEditando(s.id);
    setTituloEdit(s.titulo);
  }

  async function salvarEdicao(s: SubTarefa) {
    if (!tituloEdit.trim()) return;
    try {
      await subTarefaService.update(s.id, {
        id_tarefa: tarefa.id,
        titulo: tituloEdit.trim(),
        completado: !!s.completado,
        posicao: s.posicao ?? 0,
      });
      setSubEditando(null);
      reloadSubs();
    } catch (err) {
      setErro((err as Error).message);
    }
  }

  async function removerSub(s: SubTarefa) {
    try {
      await subTarefaService.remove(s.id);
      reloadSubs();
    } catch (err) {
      setErro((err as Error).message);
    }
  }

  async function excluirTarefa() {
    if (!confirm(`Excluir a tarefa "${tarefa.titulo}"?`)) return;
    try {
      await tarefaService.remove(tarefa.id);
      onChanged();
      onClose();
    } catch (err) {
      setErro((err as Error).message);
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="my-8 w-full max-w-4xl rounded-2xl border border-white/10 bg-slate-900 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cabeçalho */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
            <h2 className="text-xl font-semibold text-white">{tarefa.titulo}</h2>
            <div className="flex shrink-0 gap-1">
              <button className={btnGhost} onClick={() => setEditandoTarefa(true)}>
                Editar
              </button>
              <button className={btnDanger} onClick={excluirTarefa}>
                Excluir
              </button>
              <button className={btnGhost} onClick={onClose} title="Fechar (Esc)">
                ✕
              </button>
            </div>
          </div>

          <div className="grid gap-6 p-5 md:grid-cols-[1fr_16rem]">
            {/* Coluna principal */}
            <div className="min-w-0">
              <h3 className="mb-2 text-sm font-semibold text-slate-300">Descrição</h3>
              <p className="mb-6 whitespace-pre-wrap rounded-xl bg-white/5 p-4 text-sm text-slate-300">
                {tarefa.descricao || "Sem descrição."}
              </p>

              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-300">Subtarefas</h3>
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
                    {subEditando === s.id ? (
                      <>
                        <input
                          className={inputCls}
                          value={tituloEdit}
                          autoFocus
                          onChange={(e) => setTituloEdit(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") salvarEdicao(s);
                            if (e.key === "Escape") setSubEditando(null);
                          }}
                        />
                        <button className={btnPrimary} onClick={() => salvarEdicao(s)}>
                          Salvar
                        </button>
                        <button className={btnGhost} onClick={() => setSubEditando(null)}>
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <span
                          className={`flex-1 text-sm ${
                            s.completado ? "text-slate-500 line-through" : "text-slate-200"
                          }`}
                        >
                          {s.titulo}
                        </span>
                        <button className={btnGhost} onClick={() => iniciarEdicao(s)}>
                          Editar
                        </button>
                        <button className={btnDanger} onClick={() => removerSub(s)}>
                          Remover
                        </button>
                      </>
                    )}
                  </li>
                ))}
                {total === 0 && (
                  <li className="py-2 text-sm text-slate-500">Nenhuma subtarefa.</li>
                )}
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

              {erro && (
                <div className="mt-3">
                  <ErrorMsg message={erro} />
                </div>
              )}
            </div>

            {/* Coluna lateral (detalhes) */}
            <aside className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              <Campo label="Status">
                {tarefa.status ? (
                  <span className="rounded bg-white/10 px-2 py-1 text-xs text-slate-200">
                    {tarefa.status.nome}
                  </span>
                ) : (
                  "—"
                )}
              </Campo>
              <Campo label="Prioridade">
                {tarefa.prioridade ? (
                  <span
                    className={`rounded px-2 py-1 text-xs ${
                      prioridadeStyle[tarefa.prioridade] ?? "bg-white/10 text-slate-300"
                    }`}
                  >
                    {prioridadeLabel[tarefa.prioridade] ?? tarefa.prioridade}
                  </span>
                ) : (
                  "—"
                )}
              </Campo>
              <Campo label="Categoria">
                {tarefa.categoria ? (
                  <span
                    className="rounded border px-2 py-1 text-xs"
                    style={chipStyle(tarefa.categoria.hexColor)}
                  >
                    {tarefa.categoria.nome}
                  </span>
                ) : (
                  "—"
                )}
              </Campo>
              <Campo label="Prazo">
                <span className="text-slate-300">
                  {tarefa.dataFinal ? formatarData(tarefa.dataFinal) : "Sem prazo"}
                </span>
              </Campo>
            </aside>
          </div>
        </div>
      </div>

      {editandoTarefa && (
        <TarefaForm
          projeto={projeto}
          tarefa={tarefa}
          statusList={statusList}
          categorias={categorias}
          tarefas={tarefas}
          onClose={() => setEditandoTarefa(false)}
          onSaved={() => {
            setEditandoTarefa(false);
            onChanged();
          }}
        />
      )}
    </>
  );
}

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1 text-xs uppercase tracking-wide text-slate-500">{label}</div>
      {children}
    </div>
  );
}
