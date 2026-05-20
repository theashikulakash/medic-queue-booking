export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="flex flex-col items-center gap-4 rounded-[32px] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/50">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-600" />
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-900">Loading content...</p>
          <p className="mt-2 text-sm text-slate-500">Fetching the latest data from the server.</p>
        </div>
      </div>
    </div>
  );
}
