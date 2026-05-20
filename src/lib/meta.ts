export const trackMetaEvent = async (eventName: string, url: string = window.location.href) => {
  try {
    // 1. Trigger Client-Side Meta Pixel (fbq)
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", eventName);
    }

    // 2. Trigger Server-Side Conversions API (CAPI)
    const eventId = `evt_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const clientUserAgent = navigator.userAgent;

    await fetch("/api/meta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName,
        eventId,
        url,
        clientUserAgent,
      }),
    });
  } catch (error) {
    console.error("Meta CAPI tracking failed:", error);
  }
};
