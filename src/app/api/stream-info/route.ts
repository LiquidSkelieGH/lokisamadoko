import { HolodexVideoList } from "@/lib/common/types/holodex";
import type { NextRequest } from "next/server";
import holodexResponse from "@/fixture/holodex_response";
import { getEnvironmentService } from "@/lib/common/di/hooks";

export async function GET(request: NextRequest): Promise<Response> {
    const env = getEnvironmentService();
    const API_KEY = env.holodexAPIKey;
    const CHANNEL_ID = env.channelId;
    const REVALIDATE_SECONDS = env.revalidateHolodexCacheInSeconds;
    const USE_FIXTURE_DATA = env.useFixtureData;
    if (USE_FIXTURE_DATA) {
        return Response.json(holodexResponse);
    } else {
        const headers = new Headers()
        headers.set("X-APIKEY", API_KEY || "")
        headers.set("Accept", "application/json")
        const holodexResponse = await fetch(`https://holodex.net/api/v2/videos?channel_id=${CHANNEL_ID}&status=new,upcoming,live,past&type=stream&sort=available_at&max_upcoming_hours=168&include=description,live_info,refers,sources&limit=10`, 
            {
                headers,
                cache: 'force-cache', 
                next: {
                    revalidate: REVALIDATE_SECONDS 
                } // revalidate every minute
            }
        );

        if (!holodexResponse.ok) {
            const status = holodexResponse.status;
            const errorText = await holodexResponse.text();
            return Response.json({ error: `Holodex API error: ${errorText}`, status, timestamp: new Date().toISOString() }, { status });
        }

        const data: HolodexVideoList = await holodexResponse.json();
        return Response.json(data);
    }
}