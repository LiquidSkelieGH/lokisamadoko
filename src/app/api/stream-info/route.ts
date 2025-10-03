import { HolodexVideoList } from "@/types/holodex";
import type { NextRequest } from "next/server";
import holodexResponse from "@/app/data/fixture/holodex_response";

const API_KEY = process.env.HOLODEX_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;
const REVALIDATE_SECONDS = process.env.REVALIDATE_SECONDS ? parseInt(process.env.REVALIDATE_SECONDS) : 900;
const USE_FIXTURE_DATA = process.env.USE_FIXTURE_DATA === "true";

if (!API_KEY) {
    throw new Error("Missing HOLODEX_API_KEY environment variable");
}

export async function GET(request: NextRequest): Promise<Response> {
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