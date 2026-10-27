import type { Prioridade } from "../types";

export const prioridadeStyle: Record<Prioridade, string> = {
  PARA_DEPOIS: "bg-slate-500/15 text-slate-300",
  MUITO_BAIXA: "bg-teal-500/15 text-teal-300",
  BAIXA: "bg-emerald-500/15 text-emerald-300",
  MEDIA: "bg-sky-500/15 text-sky-300",
  ALTA: "bg-amber-500/15 text-amber-300",
  MUITO_ALTA: "bg-orange-500/15 text-orange-300",
  CRITICA: "bg-rose-500/15 text-rose-300",
};

export const prioridadeLabel: Record<Prioridade, string> = {
  PARA_DEPOIS: "Para depois",
  MUITO_BAIXA: "Muito baixa",
  BAIXA: "Baixa",
  MEDIA: "Média",
  ALTA: "Alta",
  MUITO_ALTA: "Muito alta",
  CRITICA: "Crítica",
};