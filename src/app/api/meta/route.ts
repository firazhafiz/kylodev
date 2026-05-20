import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { eventName, eventId, url, clientUserAgent } = body;

        const pixelId = process.env.META_PIXEL_ID;
        const accessToken = process.env.META_ACCESS_TOKEN;

        // Ambil IP Address user secara aman dari headers server Next.js
        const clientIpAddress = request.headers.get('x-forwarded-for') || '127.0.0.1';

        // Payload standar dokumentasi Meta CAPI
        const metaPayload = {
            data: [
                {
                    event_name: eventName, // Misal: 'PageView' atau 'Lead'
                    event_time: Math.floor(Date.now() / 1000),
                    action_source: "website",
                    event_id: eventId, // Wajib sama dengan ID di browser untuk deduplikasi data
                    event_source_url: url,
                    user_data: {
                        client_ip_address: clientIpAddress,
                        client_user_agent: clientUserAgent,
                    },
                },
            ],
        };

        const response = await fetch(
            `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(metaPayload),
            }
        );

        const result = await response.json();
        return NextResponse.json({ success: true, result });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}   