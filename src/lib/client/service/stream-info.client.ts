import "@/lib/client/di/client-reflect-metadata";
import { HolodexVideoList } from "@/lib/common/types/holodex";
import { ErrorResponse } from "@/lib/common/types/server";
import { queryOptions } from "@tanstack/react-query";
import { ServiceIdentifier } from "inversify";
import { useStreamInfoClient } from "../di/hooks";

export default interface IStreamInfoClient {
    getStreamInfo(): Promise<HolodexVideoList | ErrorResponse>;
}

export const StreamInfoClient: ServiceIdentifier<IStreamInfoClient> = Symbol.for('StreamInfoClientSymbol')