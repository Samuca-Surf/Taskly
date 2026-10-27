import { FormEvent, useMemo, useState } from "react";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import { ErrorMsg, Loading } from "../components/Feedback";
import { btnDanger, btnGhost, btnPrimary, inputCls, labelCls } from "../components/ui";
import { useAsync } from "../hooks/useAsync";
import { useProjetoAtual } from "../hooks/useProjetoAtual";
import { categoriaService } from "../services/categoriaService";
import type { Categoria } from "../types";

export default function Categorias() {
  const projeto = useProjetoAtual();
  const { data, loading, error, reload } = useAsync(() => categoriaService.list(), [projeto.id]);
  const lista = useMemo(
    () => (data ?? []).filter((c) => c.projeto?.id === projeto.id),
    [data, projeto.id]
  );

  const [aberto, setAberto] = useState(false);
  const [editando, setEditando] = useState<Categoria | null>(null);
  const [nome, setNome] = useState("");
  const [hexColor, setHexColor] = useState("#8b5cf6");
  const [erro, setErro] = useState<string | null>(null);

  function abrir(c?: Categoria) {
    setEditando(c ?? null);
    setNome(c?.nome ?? "");
    setHexColor(c?.hexColor || "#8b5cf6");
    setErro(null);
    setAberto(true);
  }

  async function salvar(e: FormEvent) {
    e.preventDefault();
    const dto = { idProjeto: projeto.id, nome, hexColor };
    try {
      if (editando) await categoriaService.update(editando.id, dto);
      else await categoriaService.create(dto);
      setAberto(false);
      reload();
    } catch (err) {
      setErro((err as Error).message);
    }
  }

  async function remover(c: Categoria) {
    if (!confirm(`Excluir "${c.nome}"?`)) return;
    try {
      await categoriaService.remove(c.id);
      reload();
    } catch (err) {
      alert((err as Error).message);
    }
  }

  return (
    <div>
      <PageHeader title="Categorias" subtitle="Etiquetas coloridas para organizar as tarefas.">
        <button className={btnPrimary} onClick={() => abrir()}>
          + Nova categoria
        </button>
      </PageHeader>

      {loading && <Loading />}
      {error && <ErrorMsg message={error} />}

      <ul className="max-w-2xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
        {lista.map((c) => (
          <li key={c.id} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <span
                className="h-4 w-4 rounded-full ring-1 ring-white/20"
                style={{ backgroundColor: c.hexColor || "#64748b" }}
              />
              <span className="text-slate-100">{c.nome}</span>
            </div>
            <div className="flex gap-1">
              <button className={btnGhost} onClick={() => abrir(c)}>
                Editar
              </button>
              <button className={btnDanger} onClick={() => remover(c)}>
                Excluir
              </button>
            </div>
          </li>
        ))}
        {!loading && lista.length === 0 && (
          <li className="px-4 py-8 text-center text-sm text-slate-500">
            Nenhuma categoria neste projeto ainda.
          </li>
        )}
      </ul>

      {aberto && (
        <Modal title={editando ? "Editar categoria" : "Nova categoria"} onClose={() => setAberto(false)}>
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
            <div>
              <label className={labelCls}>Cor</label>
              <input
                type="color"
                value={hexColor}
                onChange={(e) => setHexColor(e.target.value)}
                className="h-10 w-16 cursor-pointer rounded-lg border border-white/10 bg-transparent"
              />
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