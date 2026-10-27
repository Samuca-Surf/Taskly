export type Prioridade =
  | "PARA_DEPOIS"
  | "MUITO_BAIXA"
  | "BAIXA"
  | "MEDIA"
  | "ALTA"
  | "MUITO_ALTA"
  | "CRITICA";

// Do menos para o mais urgente (mesma ordem do enum no backend)
export const PRIORIDADES: Prioridade[] = [
  "PARA_DEPOIS",
  "MUITO_BAIXA",
  "BAIXA",
  "MEDIA",
  "ALTA",
  "MUITO_ALTA",
  "CRITICA",
];

// ---------- Entidades (resposta do backend) ----------
export interface Projeto {
  id: number;
  nome: string;
  descricao?: string;
}
export interface Categoria {
  id: number;
  nome: string;
  hexColor?: string;
  projeto?: Projeto | null;
}
export interface Status {
  id: number;
  nome: string;
  posicao?: number;
  hexCor?: string;
  projeto?: Projeto | null;
}
export interface Tarefa {
  id: number;
  titulo: string;
  descricao?: string;
  prioridade?: Prioridade;
  dataFinal?: string | null;
  posicao?: number;
  projeto?: Projeto | null;
  status?: Status | null;
  categoria?: Categoria | null;
}
export interface SubTarefa {
  id: number;
  titulo: string;
  completado?: boolean;
  posicao?: number;
  tarefa?: Tarefa | null;
}

// ---------- DTOs (envio ao backend) ----------
export interface ProjetoDTO {
  nome: string;
  descricao?: string;
}
export interface CategoriaDTO {
  idProjeto: number;
  nome: string;
  hexColor: string;
}
export interface StatusDTO {
  nome: string;
  posicao: number;
  hexCor: string;
  id_projeto: number;
}
export interface TarefaDTO {
  id_projeto: number;
  id_categoria: number;
  id_status: number;
  titulo: string;
  descricao: string;
  prioridade: Prioridade;
  data_final: string | null;
  posicao: number;
}
export interface SubTarefaDTO {
  id_tarefa: number;
  titulo: string;
  completado: boolean;
  posicao: number;
}