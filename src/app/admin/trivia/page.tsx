export default function AdminTriviaPage(): React.JSX.Element {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Trivia Manager</h2>
        <p className="mt-2 text-zinc-300">
          Create and review trivia items.
        </p>
      </div>

      <form className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="space-y-2">
          <label htmlFor="question" className="block text-sm font-medium text-zinc-200">
            Question
          </label>
          <textarea
            id="question"
            name="question"
            rows={4}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
            placeholder="Enter the trivia question..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="answer" className="block text-sm font-medium text-zinc-200">
            Answer
          </label>
          <input
            id="answer"
            name="answer"
            type="text"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
            placeholder="Enter the answer..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium text-zinc-200">
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
            placeholder="Physics, Chemistry, Astronomy..."
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-xl bg-white px-5 py-3 font-semibold text-black"
          >
            Save Trivia Item
          </button>

          <button
            type="button"
            className="rounded-xl border border-zinc-700 px-5 py-3 font-semibold text-white"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}