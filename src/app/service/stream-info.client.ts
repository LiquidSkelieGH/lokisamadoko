import { HolodexVideoList } from "@/types/holodex";
import { ErrorResponse } from "@/types/server";
import holodexResponse from "@/app/data/fixture/holodex_response";
import { queryOptions } from "@tanstack/react-query";

const USE_FIXTURE_DATA = process.env.USE_FIXTURE_DATA === "true";

export default class StreamInfoClient {
    static async getStreamInfo(): Promise<HolodexVideoList | ErrorResponse> {
        if (USE_FIXTURE_DATA) {
            return Promise.resolve(holodexResponse);
        } else {
            const response = await fetch('/api/stream-info');
            if (!response.ok) {
                const errorData = await response.json();
                return Promise.resolve(errorData as ErrorResponse);
            }
            return response.json();
        }
    }
}

export function streamInfoOptions() {
    return queryOptions<HolodexVideoList | ErrorResponse>({
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchInterval: 10 * 60 * 1000, // refresh every 10 minutes
        retry: false,
        queryKey: ['stream-info'],
        queryFn: async () => {
            return StreamInfoClient.getStreamInfo();
        }
    });
}