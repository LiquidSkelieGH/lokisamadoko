import "reflect-metadata";
import { injectable } from "inversify";
import { IEnvironmentService } from "../env.service";

@injectable()
export default class ProcessEnvironmentServiceImpl implements IEnvironmentService {
    get channelId(): string {
        let channelId = process.env.CHANNEL_ID;
        if (!channelId) {
            throw Error("Channel ID Env variable not defined");
        }
        return channelId;
    }
    get siteUrl(): string {
        const siteUrl = process.env.SITE_URL;
        if (!siteUrl) {
            throw Error("SITE_URL Env variable not defined");
        }
        return siteUrl;
    }

    get useFixtureData(): boolean {
        const raw = process.env.USE_FIXTURE_DATA;
        if (!raw) {
            // default to false when not defined
            return false;
        }
        const normalized = raw.trim().toLowerCase();
        return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
    }

    get holodexAPIKey(): string {
        const key = process.env.HOLODEX_API_KEY;
        if (!key) {
            throw Error("HOLODEX_API_KEY Env variable not defined");
        }
        return key;
    }

    get revalidateHolodexCacheInSeconds(): number {
        const raw = process.env.REVALIDATE_SECONDS;
        if (!raw) {
            return 900;
        }
        const num = Number(raw);
        if (!Number.isFinite(num) || num < 0) {
            throw Error("REVALIDATE_HOLODEX_CACHE_IN_SECONDS must be a non-negative number");
        }
        return Math.floor(num);
    }

}