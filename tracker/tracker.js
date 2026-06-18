(function () {
  const API_URL =
    window.ANALYTICS_API_URL ||
    (window.location.port === "5000"
      ? "/api/events"
      : "http://localhost:5000/api/events");
  const SESSION_KEY = "analytics_session_id";

  function generateSessionId() {
    if (crypto.randomUUID) return crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function getSessionId() {
    let sessionId = localStorage.getItem(SESSION_KEY);
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem(SESSION_KEY, sessionId);
    }
    return sessionId;
  }

  function sendEvent(payload) {
    const body = JSON.stringify(payload);
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch((err) => console.warn("[Analytics] Failed to send event:", err));
  }

  function trackEvent(eventType, extra = {}) {
    sendEvent({
      sessionId: getSessionId(),
      eventType,
      pageUrl: window.location.pathname || "/",
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      ...extra,
    });
  }

  function trackPageView() {
    trackEvent("page_view");
  }

  function trackClick(e) {
    trackEvent("click", {
      clickX: e.clientX,
      clickY: e.clientY,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", trackPageView);
  } else {
    trackPageView();
  }

  document.addEventListener("click", trackClick);

  window.AnalyticsTracker = {
    trackPageView,
    trackClick,
    getSessionId,
  };
})();
