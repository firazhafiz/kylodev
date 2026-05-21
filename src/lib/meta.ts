const STANDARD_EVENTS = [
  "PageView",
  "ViewContent",
  "Lead",
  "Contact",
  "Purchase",
  "CompleteRegistration",
  "InitiateCheckout",
  "AddToCart",
];

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
      const trackMethod = STANDARD_EVENTS.includes(eventName) ? "track" : "trackCustom";
      (window as any).fbq(trackMethod, eventName, data || {}, { eventID: eventId });
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
