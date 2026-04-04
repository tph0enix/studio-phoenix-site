import Link from "next/link";

export default function AdminPage(): React.JSX.Element {
  return (
    <main>
      <h2 className="text-3xl font-bold">Admin</h2>
      <p className="mt-4 text-zinc-300">
        Internal tools for Studio Phoenix.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/trivia"
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-600"
        >
          <h3 className="text-xl font-semibold">Trivia</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Manage trivia creation, review, approval, and queue flow.
          </p>
        </Link>

        <Link
          href="/admin/branding"
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-600"
        >
          <h3 className="text-xl font-semibold">Branding</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Configure voice, identity, and future brand styling.
          </p>
        </Link>

        <Link
          href="/admin/scheduler"
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-600"
        >
          <h3 className="text-xl font-semibold">Scheduler</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Control posting frequency, generation volume, and timing.
          </p>
        </Link>
      </div>
    </main>
  );
}