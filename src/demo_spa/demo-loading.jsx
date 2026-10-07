function DemoLoading({ message = "Loading demo...", isFading = false }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-950 text-slate-100">
      <div className={`flex flex-col items-center gap-4 rounded-3xl bg-slate-900/90 p-10 shadow-2xl shadow-black/50 transition-opacity duration-700 ${isFading ? "opacity-0" : "opacity-100"}`}>
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-700 border-t-4 border-t-amber-400"></div>
        <p className="text-center text-lg font-semibold">{message}</p>
      </div>
    </div>
  );
}

export default DemoLoading;
