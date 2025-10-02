import { HolodexVideoList } from "@/types/holodex";
import { ErrorResponse } from "@/types/server";
import useSWR from "swr";

export function useStreamInfo() {
    const { data, error, isLoading } = useSWR<HolodexVideoList, ErrorResponse>(
        '/api/stream-info',
        () => fetch('/api/stream-info').then(res => res.json()), 
        { refreshInterval: 60000 }
    );

    return {
        streamInfo: data,
        isLoading,
        error: error
    };
}