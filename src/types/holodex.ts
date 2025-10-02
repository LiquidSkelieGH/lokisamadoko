// Types generated from sample Holodex video JSON
export type VideoType = "stream" | "clip" | "upload";

export type VideoStatus = "upcoming" | "live" | "past" | "new";

export interface Channel {
    id: string; // e.g. "UCGNI4MENvnsymYjKiZwv9eg"
    name: string; // localized name
    english_name?: string | null;
    photo?: string | null; // URL to avatar
    type?: string | null; // e.g. "vtuber"
    org: string; // e.g. "Hololive"
    suborg?: string | null; // e.g. "Hololive JP"
    // allow extra properties Holodex may include
    [key: string]: unknown;
}

export interface HolodexVideo {
    id: string;
    type: VideoType;
    status: VideoStatus;
    title: string;
    duration: number; // seconds
    published_at?: string; // ISO timestamp
    available_at?: string; // ISO timestamp used for sorting
    start_scheduled?: string | null; // ISO timestamp when scheduled
    topic_id?: string | null; // e.g. "english_only"
    channel: Channel;
    // allow extra properties Holodex may include
    [key: string]: unknown;
}

export interface HolodexVideoList extends Array<HolodexVideo> {}
