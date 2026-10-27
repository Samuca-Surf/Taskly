const BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

async function extrairErro(res: Response): Promise<string> {
  const texto = await res.text().catch(() => "");
  try {
    const json = JSON.parse(texto);
    if (typeof json === "string") return json;
    if (json && typeof json === "object") {
      const base = json.mensagem ?? json.message;
      if (typeof base === "string") {
        const campos =
          json.campos && typeof json.campos === "object"
            ? Object.values(json.campos).join(" • ")
            : "";
        return campos ? `${base}: ${campos}` : base;
      }
      const valores = Object.values(json).filter((v) => typeof v === "string");
      if (valores.length > 0) return valores.join(" • ");
    }
  } catch {
    // não era JSON: usa o texto puro
  }
  return texto || `Erro ${res.status}`;
}

export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const headers: Record<string, string> = {};
  if (init.body) headers["Content-Type"] = "application/json";

  let res: Response;
  try {
    res = await fetch(url, { ...init, headers });
  } catch (e) {
    console.error(`[api] Falha de rede em ${init.method ?? "GET"} ${url}`, e);
    throw new Error(
      `Não foi possível conectar a ${url}. Verifique se o backend está no ar e o CORS/URL.`
    );
  }

  if (!res.ok) {
    console.error(`[api] ${res.status} em ${init.method ?? "GET"} ${url}`);
    throw new Error(await extrairErro(res));
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export function createCrud<T, D>(resource: string) {
  return {
    list: () => request<T[]>(`/${resource}`),
    get: (id: number) => request<T>(`/${resource}/${id}`),
    create: (dto: D) =>
      request<T>(`/${resource}`, { method: "POST", body: JSON.stringify(dto) }),
    update: (id: number, dto: D) =>
      request<T>(`/${resource}/${id}`, { method: "PUT", body: JSON.stringify(dto) }),
    remove: (id: number) => request<void>(`/${resource}/${id}`, { method: "DELETE" }),
  };
}