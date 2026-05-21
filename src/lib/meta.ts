interface TrackingData {
  content_name?: string;
  content_category?: string;
  [key: string]: string | undefined;
}

export const trackMetaEvent = async (
  eventName: string,
  data?: TrackingData,
  url: string = window.location.href
): Promise<void> => {
  try {
    // Generate unique event ID for deduplication between Pixel and CAPI
    const eventId = `evt_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    // 1. Trigger Client-Side Meta Pixel (fbq)
    if (typeof window !== "undefined" && (window as any).fbq) {
      if (data) {
        (window as any).fbq("track", eventName, data, { eventID: eventId });
      } else {
        (window as any).fbq("track", eventName, {}, { eventID: eventId });
      }
    }

    // 2. Trigger Server-Side Conversions API (CAPI)
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
        ...(data && { customData: data }),
      }),
    });
  } catch (error) {
    console.error("Meta CAPI tracking failed:", error);
  }
};
