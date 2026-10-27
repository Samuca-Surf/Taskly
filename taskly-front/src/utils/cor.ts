// Estilo de "chip" a partir de uma cor hexadecimal (#rrggbb)
export function chipStyle(hex?: string) {
  const c = hex && /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : "#8b5cf6";
  return { backgroundColor: `${c}26`, color: c, borderColor: `${c}55` };
}