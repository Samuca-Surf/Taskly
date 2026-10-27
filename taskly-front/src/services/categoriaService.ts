import { createCrud } from "./api";
import type { Categoria, CategoriaDTO } from "../types";

export const categoriaService = createCrud<Categoria, CategoriaDTO>("categoria");
