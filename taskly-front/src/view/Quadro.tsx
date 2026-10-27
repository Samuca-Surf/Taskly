import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import TarefaCard from "../components/TarefaCard";
import TarefaForm from "../components/TarefaForm";
import { ErrorMsg, Loading } from "../components/Feedback";
import { btnPrimary, inputCls } from "../components/ui";
import { useProjetoAtual } from "../hooks/useProjetoAtual";
import { useProjetoData } from "../hooks/useProjetoData";
import { tarefaService } from "../services/tarefaService";
import { tarefaToDTO } from "../utils/tarefa";

export default function Quadro() {
  const projeto = useProjetoAtual();
  const { tarefas, statusList, categorias, loading, error, reload } = useProjetoData(projeto.id);

  const [busca, setBusca] = useState("");
  const [novaNoStatus, setNovaNoStatus] = useState<number | null | undefined>(undefined);
  const [dragId, setDragId] = useState<number | null>(null);
  const [colunaHover, setColunaHover] = useState<number | null>(null);

  const filtradas = useMemo(
    () => tarefas.filter((t) => t.titulo.toLowerCase().includes(busca.toLowerCase())),
    [tarefas, busca]
  );

  const podeCriar = statusList.length > 0 && categorias.length > 0;

  async function mover(statusId: number) {
    const tarefa = tarefas.find((t) => t.id === dragId);
    setDragId(null);
    setColunaHover(null);
    if (!tarefa || tarefa.status?.id === statusId) return;
    const posicao = tarefas.filter((t) => t.status?.id === statusId).length;
    try {
      await tarefaService.update(
        tarefa.id,
        tarefaToDTO(tarefa, projeto.id, { id_status: statusId, posicao })
      );
      reload();
    } catch (e) {
      alert((e as Error).message);
    }
  }

  return (
    <div>
      <PageHeader title="Quadro">
        <input
          className={`${inputCls} w-52`}
          placeholder="Buscar tarefa..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button
          className={btnPrimary}
          disabled={!podeCriar}
          onClick={() => setNovaNoStatus(null)}
        >
          + Nova tarefa
        </button>
      </PageHeader>

      {loading && <Loading />}
      {error && <ErrorMsg message={error} />}

      {!loading && !podeCriar && (
        <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          Para criar tarefas, este projeto precisa de pelo menos um{" "}
          <Link to={`/projeto/${projeto.id}/status`} className="font-medium underline">
            status
          </Link>{" "}
          e uma{" "}
          <Link to={`/projeto/${projeto.id}/categorias`} className="font-medium underline">
            categoria
          </Link>
          .
        </div>
      )}

      <div className="flex gap-4 overflow-x-auto pb-4">
        {statusList.map((s) => {
          const doStatus = filtradas.filter((t) => t.status?.id === s.id);
          return (
            <section
              key={s.id}
              onDragOver={(e) => {
                e.preventDefault();
                setColunaHover(s.id);
              }}
              onDragLeave={() => setColunaHover(null)}
              onDrop={() => mover(s.id)}
              className={`w-72 shrink-0 rounded-2xl border p-3 transition ${
                colunaHover === s.id
                  ? "border-violet-500/60 bg-violet-500/10"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <header className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-300">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: s.hexCor || "#8b5cf6" }}
                  />
                  {s.nome}
                  <span className="rounded-full bg-white/10 px-2 text-xs text-slate-400">
                    {doStatus.length}
                  </span>
                </h3>
                {podeCriar && (
                  <button
                    onClick={() => setNovaNoStatus(s.id)}
                    className="text-lg leading-none text-slate-500 transition hover:text-violet-300"
                    title="Adicionar tarefa"
                  >
                    +
                  </button>
                )}
              </header>
              <div className="flex flex-col gap-2">
                {doStatus.map((t) => (
                  <TarefaCard key={t.id} tarefa={t} onDragStart={setDragId} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {novaNoStatus !== undefined && (
        <TarefaForm
          projeto={projeto}
          statusInicialId={novaNoStatus ?? undefined}
          statusList={statusList}
          categorias={categorias}
          tarefas={tarefas}
          onClose={() => setNovaNoStatus(undefined)}
          onSaved={() => {
            setNovaNoStatus(undefined);
            reload();
          }}
        />
      )}
    </div>
  );
}