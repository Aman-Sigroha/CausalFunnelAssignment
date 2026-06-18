export default function HeatmapCanvas({ clicks, viewportWidth, viewportHeight }) {
  const width = viewportWidth || 1280;
  const height = viewportHeight || 800;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <span className="text-sm text-slate-600">
          {clicks.length} click{clicks.length !== 1 ? "s" : ""} recorded
        </span>
        <span className="text-xs text-slate-400">
          Viewport: {width} × {height}px
        </span>
      </div>
      <div
        className="relative bg-gradient-to-b from-slate-100 to-slate-50 mx-auto"
        style={{ width: "100%", maxWidth: width, aspectRatio: `${width} / ${height}` }}
      >
        {clicks.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
            No clicks on this page yet
          </div>
        ) : (
          clicks.map((click, i) => (
            <div
              key={`${click.sessionId}-${click.timestamp}-${i}`}
              className="absolute rounded-full bg-red-500 pointer-events-none"
              style={{
                left: `${(click.clickX / width) * 100}%`,
                top: `${(click.clickY / height) * 100}%`,
                width: 12,
                height: 12,
                opacity: 0.45,
                transform: "translate(-50%, -50%)",
              }}
              title={`(${click.clickX}, ${click.clickY})`}
            />
          ))
        )}
      </div>
    </div>
  );
}
