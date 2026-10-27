import { FormEvent, useMemo, useState } from "react";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import { ErrorMsg, Loading } from "../components/Feedback";
import { btnDanger, btnGhost, btnPrimary, inputCls, labelCls } from "../components/ui";
import { useAsync } from "../hooks/useAsync";
import { useProjetoAtual } from "../hooks/useProjetoAtual";
import { statusService } from "../services/statusService";
import type { Status } from "../types";

export default function StatusView() {
  const projeto = useProjetoAtual();
  const { data, loading, error, reload } = useAsync(() => statusService.list(), [projeto.id]);
  const lista = useMemo(
    () =>
      (data ?? [])
        .filter((s) => s.projeto?.id === projeto.id)
        .sort((a, b) => (a.posicao ?? 0) - (b.posicao ?? 0)),
    [data, projeto.id]
  );

  const [aberto, setAberto] = useState(false);
  const [editando, setEditando] = useState<Status | null>(null);
  const [nome, setNome] = useState("");
  const [hexCor, setHexCor] = useState("#8b5cf6");
  const [posicao, setPosicao] = useState(0);
  const [erro, setErro] = useState<string | null>(null);

  function abrir(s?: Status) {
    setEditando(s ?? null);
    setNome(s?.nome ?? "");
    setHexCor(s?.hexCor || "#8b5cf6");
    setPosicao(s?.posicao ?? lista.length);
    setErro(null);
    setAberto(true);
  }

  async function salvar(e: FormEvent) {
    e.preventDefault();
    const dto = { nome, hexCor, posicao, id_projeto: projeto.id };
    try {
      if (editando) await statusService.update(editando.id, dto);
      else await statusService.create(dto);
      setAberto(false);
      reload();
    } catch (err) {
      setErro((err as Error).message);
    }
  }

  async function remover(s: Status) {
    if (!confirm(`Excluir o status "${s.nome}"?`)) return;
    try {
      await statusService.remove(s.id);
      reload();
    } catch (err) {
      alert((err as Error).message);
    }
  }

  return (
    <div>
      <PageHeader
        title="Status"
        subtitle="As colunas do quadro, na ordem da posição (ex.: Backlog, Em andamento, Concluído)."
      >
        <button className={btnPrimary} onClick={() => abrir()}>
          + Novo status
        </button>
      </PageHeader>

      {loading && <Loading />}
      {error && <ErrorMsg message={error} />}

      <ul className="max-w-2xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
        {lista.map((s) => (
          <li key={s.id} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <span
                className="h-4 w-4 rounded-full ring-1 ring-white/20"
                style={{ backgroundColor: s.hexCor || "#64748b" }}
              />
              <span className="text-slate-100">{s.nome}</span>
              <span className="text-xs text-slate-500">posição {s.posicao ?? 0}</span>
            </div>
            <div className="flex gap-1">
              <button className={btnGhost} onClick={() => abrir(s)}>
                Editar
              </button>
              <button className={btnDanger} onClick={() => remover(s)}>
                Excluir
              </button>
            </div>
          </li>
        ))}
        {!loading && lista.length === 0 && (
          <li className="px-4 py-8 text-center text-sm text-slate-500">
            Nenhum status neste projeto ainda.
          </li>
        )}
      </ul>

      {aberto && (
        <Modal title={editando ? "Editar status" : "Novo status"} onClose={() => setAberto(false)}>
          <form onSubmit={salvar} className="space-y-4">
            <div>
              <label className={labelCls}>Nome</label>
              <input
                className={inputCls}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="flex gap-4">
              <div>
                <label className={labelCls}>Cor</label>
                <input
                  type="color"
                  value={hexCor}
                  onChange={(e) => setHexCor(e.target.value)}
                  className="h-10 w-16 cursor-pointer rounded-lg border border-white/10 bg-transparent"
                />
              </div>
              <div className="flex-1">
                <label className={labelCls}>Posição</label>
                <input
                  type="number"
                  min={0}
                  className={inputCls}
                  value={posicao}
                  onChange={(e) => setPosicao(Number(e.target.value))}
                  required
                />
              </div>
            </div>
            {erro && <ErrorMsg message={erro} />}
            <div className="flex justify-end gap-2">
              <button type="button" className={btnGhost} onClick={() => setAberto(false)}>
                Cancelar
              </button>
              <button className={btnPrimary}>Salvar</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}