import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import { ErrorMsg, Loading } from "../components/Feedback";
import { btnDanger, btnGhost, btnPrimary, inputCls, labelCls } from "../components/ui";
import { useAsync } from "../hooks/useAsync";
import { projetoService } from "../services/projetoService";
import type { Projeto, ProjetoDTO } from "../types";

export default function Home() {
  const navigate = useNavigate();
  const { data, loading, error, reload } = useAsync(() => projetoService.list());

  const [aberto, setAberto] = useState(false);
  const [editando, setEditando] = useState<Projeto | null>(null);
  const [form, setForm] = useState<ProjetoDTO>({ nome: "", descricao: "" });
  const [erro, setErro] = useState<string | null>(null);

  function abrir(p?: Projeto) {
    setEditando(p ?? null);
    setForm({ nome: p?.nome ?? "", descricao: p?.descricao ?? "" });
    setErro(null);
    setAberto(true);
  }

  async function salvar(e: FormEvent) {
    e.preventDefault();
    try {
      if (editando) {
        await projetoService.update(editando.id, form);
        setAberto(false);
        reload();
      } else {
        const novo = await projetoService.create(form);
        navigate(`/projeto/${novo.id}`); // já entra no projeto recém-criado
      }
    } catch (err) {
      setErro((err as Error).message);
    }
  }

  async function remover(p: Projeto) {
    if (!confirm(`Excluir o projeto "${p.nome}"?`)) return;
    try {
      await projetoService.remove(p.id);
      reload();
    } catch (err) {
      alert((err as Error).message);
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Seus projetos"
        subtitle="Escolha um projeto para abrir o quadro, ou crie um novo."
      >
        <button className={btnPrimary} onClick={() => abrir()}>
          + Novo projeto
        </button>
      </PageHeader>

      {loading && <Loading />}
      {error && <ErrorMsg message={error} />}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((p) => (
          <article
            key={p.id}
            onClick={() => navigate(`/projeto/${p.id}`)}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:-translate-y-0.5 hover:border-violet-500/50 hover:bg-white/[0.08]"
          >
            <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
            <h3 className="text-lg font-semibold text-white">{p.nome}</h3>
            <p className="mt-1 min-h-10 text-sm text-slate-400">
              {p.descricao || "Sem descrição."}
            </p>
            <div className="mt-4 flex gap-1" onClick={(e) => e.stopPropagation()}>
              <button className={btnGhost} onClick={() => abrir(p)}>
                Editar
              </button>
              <button className={btnDanger} onClick={() => remover(p)}>
                Excluir
              </button>
            </div>
          </article>
        ))}

        {data && (
          <button
            onClick={() => abrir()}
            className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-white/15 text-sm text-slate-400 transition hover:border-violet-500/50 hover:text-violet-300"
          >
            + Criar projeto
          </button>
        )}
      </div>

      {aberto && (
        <Modal title={editando ? "Editar projeto" : "Novo projeto"} onClose={() => setAberto(false)}>
          <form onSubmit={salvar} className="space-y-4">
            <div>
              <label className={labelCls}>Nome</label>
              <input
                className={inputCls}
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                required
                autoFocus
              />
            </div>
            <div>
              <label className={labelCls}>Descrição</label>
              <textarea
                className={inputCls}
                rows={3}
                value={form.descricao ?? ""}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
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