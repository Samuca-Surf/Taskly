import { useOutletContext } from "react-router-dom";
import type { Projeto } from "../types";

export function useProjetoAtual(): Projeto {
  return useOutletContext<{ projeto: Projeto }>().projeto;
}