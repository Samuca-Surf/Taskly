import { createCrud } from "./api";
import type { Status, StatusDTO } from "../types";

export const statusService = createCrud<Status, StatusDTO>("status");
