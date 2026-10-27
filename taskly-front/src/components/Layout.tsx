import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0e0c1c]/70 backdrop-blur">
        <div className="flex h-14 items-center px-6">
          <Link
            to="/"
            className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-xl font-bold text-transparent"
          >
            Taskly
          </Link>
        </div>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}