import { createCrud } from "./api";
import type { Projeto, ProjetoDTO } from "../types";

export const projetoService = createCrud<Projeto, ProjetoDTO>("projeto");
