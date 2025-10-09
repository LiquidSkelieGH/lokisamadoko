import { ServiceIdentifier } from "inversify";

export interface IStreamInfoService {
    getStreamInfo(): any;
}

export const StreamInfoService: ServiceIdentifier<IStreamInfoService> = Symbol.for('StreamInfoServiceSymbol');