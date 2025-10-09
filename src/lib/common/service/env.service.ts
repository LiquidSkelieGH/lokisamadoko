import { ServiceIdentifier } from "inversify"

export interface IEnvironmentService {
    get holodexAPIKey(): string;
    get revalidateHolodexCacheInSeconds(): number
    get channelId(): string;
    get siteUrl(): string;
    get useFixtureData(): boolean;
}

export const EnvironmentService: ServiceIdentifier<IEnvironmentService> = Symbol.for('EnvironmentService');