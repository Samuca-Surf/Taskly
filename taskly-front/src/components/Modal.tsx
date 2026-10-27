import type { ReactNode } from "react";

interface Props {
  title: string;
  onClose: () => void;
  children: ReactNode;
  size?: "md" | "lg";
}

export default function Modal({ title, onClose, children, size = "md" }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`w-full ${
          size === "lg" ? "max-w-xl" : "max-w-md"
        } rounded-2xl border border-white/10 bg-[#171330] p-6 shadow-2xl shadow-black/50`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="text-slate-500 transition hover:text-slate-200">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}