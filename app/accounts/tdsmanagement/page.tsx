export default function ComingSoon() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white overflow-hidden">
      <div className="rounded-3xl border border-zinc-200 bg-white px-14 py-12 shadow-xl transition-all duration-300 hover:scale-105 animate-in fade-in zoom-in-95">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 animate-pulse">
          Coming Soon
        </h1>

        <p className="mt-4 text-center text-zinc-500">
          We’re building something amazing.
        </p>

        <div className="mt-6 flex justify-center gap-2">
          <span className="h-3 w-3 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-zinc-500 [animation-delay:-0.15s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-zinc-600" />
        </div>
      </div>
    </main>
  );
}