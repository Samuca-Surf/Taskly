import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { ErrorMsg, Loading } from "./Feedback";
import { useAsync } from "../hooks/useAsync";
import { projetoService } from "../services/projetoService";

export default function ProjetoLayout() {
  const { projetoId } = useParams();
  const id = Number(projetoId);
  const { data: projeto, loading, error } = useAsync(() => projetoService.get(id), [id]);

  if (loading) return <Loading />;
  if (error || !projeto) {
    return (
      <div className="space-y-3">
        <ErrorMsg message={error ?? "Projeto não encontrado."} />
        <Link to="/" className="text-sm text-violet-300 hover:underline">
          ← Voltar aos projetos
        </Link>
      </div>
    );
  }

  const tabs = [
    { to: `/projeto/${id}`, label: "Quadro", end: true },
    { to: `/projeto/${id}/categorias`, label: "Categorias" },
    { to: `/projeto/${id}/status`, label: "Status" },
  ];

  return (
    <div>
      <Link to="/" className="text-sm text-slate-400 transition hover:text-violet-300">
        ← Projetos
      </Link>
      <div className="mb-6 mt-2">
        <h1 className="text-3xl font-bold text-white">{projeto.nome}</h1>
        {projeto.descricao && <p className="mt-1 text-sm text-slate-400">{projeto.descricao}</p>}
        <nav className="mt-4 flex gap-2">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm transition ${
                  isActive
                    ? "bg-violet-500/20 text-violet-200 ring-1 ring-violet-500/40"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`
              }
            >
              {t.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <Outlet context={{ projeto }} />
    </div>
  );
}