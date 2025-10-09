import { Container } from "inversify"
import container from "./client-container"
import IStreamInfoClient, { StreamInfoClient } from "../service/stream-info.client";
import { queryOptions } from "@tanstack/react-query";
import { HolodexVideoList } from "@/lib/common/types/holodex";
import { ErrorResponse } from "@/lib/common/types/server";

export function useContainer(): Container {
    return container;
}

export function useStreamInfoClient(): IStreamInfoClient {
    return useContainer().get(StreamInfoClient);
}

export function streamInfoOptions() {
    return queryOptions<HolodexVideoList | ErrorResponse>({
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchInterval: 10 * 60 * 1000, // refresh every 10 minutes
        retry: false,
        queryKey: ['stream-info'],
        queryFn: async () => {
            return useStreamInfoClient().getStreamInfo();
        }
    });
}