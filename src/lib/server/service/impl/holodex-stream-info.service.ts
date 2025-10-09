import { injectable } from "inversify";
import { IStreamInfoService } from "../stream-info.service";
import { HolodexVideoList } from "@/lib/common/types/holodex";
import { getEnvironmentService } from "@/lib/common/di/hooks";

@injectable()
export default class HolodexStreamInfoService implements IStreamInfoService {
    async getStreamInfo() {
        const env = getEnvironmentService();
        const headers = new Headers();
        headers.set("X-APIKEY", env.holodexAPIKey || "");
        headers.set("Accept", "application/json");
        const holodexResponse = await fetch(`https://holodex.net/api/v2/videos?channel_id=${env.channelId}&status=new,upcoming,live,past&type=stream&sort=available_at&max_upcoming_hours=168&include=description,live_info,refers,sources&limit=10`,
            {
                headers,
                cache: 'force-cache',
                next: {
                    revalidate: env.revalidateHolodexCacheInSeconds
                }
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