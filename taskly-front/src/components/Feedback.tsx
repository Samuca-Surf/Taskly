export function Loading() {
  return <p className="text-sm text-slate-400">Carregando...</p>;
}

export function ErrorMsg({ message }: { message: string }) {
  return (
    <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
      {message}
    </p>
  );
}