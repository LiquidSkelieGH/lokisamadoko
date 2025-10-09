import { HolodexVideoList } from "@/lib/common/types/holodex";
import { ErrorResponse } from "@/lib/common/types/server";
import { injectable } from "inversify";
import IStreamInfoClient from "../stream-info.client";

@injectable()
export default class APIStreamInfoClient implements IStreamInfoClient {
    async getStreamInfo(): Promise<HolodexVideoList | ErrorResponse> {
        const response = await fetch('/api/stream-info');
            if (!response.ok) {
                const errorData = await response.json();
                return Promise.resolve(errorData as ErrorResponse);
            }
            return response.json();
    }
}