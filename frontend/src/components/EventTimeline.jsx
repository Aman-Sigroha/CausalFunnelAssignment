function formatTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function eventLabel(event) {
  if (event.eventType === "page_view") {
    return `Page View — ${event.pageUrl}`;
  }
  if (event.eventType === "click") {
    return `Click at (${event.clickX}, ${event.clickY}) on ${event.pageUrl}`;
  }
  return event.eventType;
}

function eventIcon(type) {
  if (type === "page_view") return "📄";
  if (type === "click") return "🖱️";
  return "•";
}

export default function EventTimeline({ events }) {
  if (events.length === 0) {
    return <p className="text-slate-500">No events in this session.</p>;
  }

  return (
    <div className="relative pl-8">
      <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-200" />
      <ul className="space-y-6">
        {events.map((event) => (
          <li key={event._id} className="relative">
            <span className="absolute -left-5 top-1 w-6 h-6 bg-white border-2 border-indigo-400 rounded-full flex items-center justify-center text-xs">
              {eventIcon(event.eventType)}
            </span>
            <div className="bg-white rounded-lg border border-slate-200 px-4 py-3">
              <div className="flex items-center justify-between gap-4">
                <span className="font-medium text-slate-800">{eventLabel(event)}</span>
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {formatTime(event.timestamp)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
