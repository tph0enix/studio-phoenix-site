import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 px-6 py-4">
        <h1 className="text-2xl font-semibold">Studio Phoenix Admin</h1>
      </header>

      <div className="flex">
        <aside className="w-64 border-r border-zinc-800 p-6">
          <nav className="space-y-3">
            <Link href="/admin" className="block text-zinc-300 hover:text-white">
              Admin Home
            </Link>
            <Link href="/admin/trivia" className="block text-zinc-300 hover:text-white">
              Trivia
            </Link>
            <Link href="/admin/branding" className="block text-zinc-300 hover:text-white">
              Branding
            </Link>
            <Link href="/admin/scheduler" className="block text-zinc-300 hover:text-white">
              Scheduler
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}