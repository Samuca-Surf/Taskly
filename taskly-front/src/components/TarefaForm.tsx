import { FormEvent, useState } from "react";
import Modal from "./Modal";
import { ErrorMsg } from "./Feedback";
import { btnGhost, btnPrimary, inputCls, labelCls } from "./ui";
import { tarefaService } from "../services/tarefaService";
import { PRIORIDADES } from "../types";
import type { Categoria, Prioridade, Projeto, Status, Tarefa } from "../types";
import { prioridadeLabel } from "../utils/prioridade";

interface Props {
  projeto: Projeto;
  tarefa?: Tarefa;
  statusInicialId?: number;
  statusList: Status[];
  categorias: Categoria[];
  tarefas: Tarefa[]; // tarefas do projeto, usadas para calcular a posição
  onClose: () => void;
  onSaved: () => void;
}

export default function TarefaForm({
  projeto,
  tarefa,
  statusInicialId,
  statusList,
  categorias,
  tarefas,
  onClose,
  onSaved,
}: Props) {
  const [titulo, setTitulo] = useState(tarefa?.titulo ?? "");
  const [descricao, setDescricao] = useState(tarefa?.descricao ?? "");
  const [prioridade, setPrioridade] = useState<Prioridade>(tarefa?.prioridade ?? "MEDIA");
  const [dataFinal, setDataFinal] = useState(tarefa?.dataFinal ?? "");
  const [statusId, setStatusId] = useState<number | "">(
    tarefa?.status?.id ?? statusInicialId ?? statusList[0]?.id ?? ""
  );
  const [categoriaId, setCategoriaId] = useState<number | "">(tarefa?.categoria?.id ?? "");
  const [erro, setErro] = useState<string | null>(null);

  async function salvar(e: FormEvent) {
    e.preventDefault();
    if (statusId === "" || categoriaId === "") return;

    const mudouDeColuna = !tarefa || tarefa.status?.id !== statusId;
    const posicao = mudouDeColuna
      ? tarefas.filter((t) => t.status?.id === statusId && t.id !== tarefa?.id).length
      : tarefa?.posicao ?? 0;

    const dto = {
      id_projeto: projeto.id,
      id_categoria: categoriaId,
      id_status: statusId,
      titulo,
      descricao,
      prioridade,
      data_final: dataFinal || null,
      posicao,
    };

    try {
      if (tarefa) await tarefaService.update(tarefa.id, dto);
      else await tarefaService.create(dto);
      onSaved();
    } catch (err) {
      setErro((err as Error).message);
    }
  }

  return (
    <Modal title={tarefa ? "Editar tarefa" : "Nova tarefa"} onClose={onClose} size="lg">
      <form onSubmit={salvar} className="space-y-3">
        <div>
          <label className={labelCls}>Título</label>
          <input
            className={inputCls}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div>
          <label className={labelCls}>Descrição</label>
          <textarea
            className={inputCls}
            rows={3}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Status</label>
            <select
              className={inputCls}
              value={statusId}
              onChange={(e) => setStatusId(Number(e.target.value))}
              required
            >
              {statusList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nome}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Categoria</label>
            <select
              className={inputCls}
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value === "" ? "" : Number(e.target.value))}
              required
            >
              <option value="">Selecione...</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Prioridade</label>
            <select
              className={inputCls}
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value as Prioridade)}
            >
              {PRIORIDADES.map((p) => (
                <option key={p} value={p}>
                  {prioridadeLabel[p] ?? p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Data final</label>
            <input
              type="date"
              className={inputCls}
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
            />
          </div>
        </div>
        {erro && <ErrorMsg message={erro} />}
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" className={btnGhost} onClick={onClose}>
            Cancelar
          </button>
          <button className={btnPrimary}>Salvar</button>
        </div>
      </form>
    </Modal>
  );
}