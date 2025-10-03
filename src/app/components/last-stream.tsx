"use client";
import { useQuery } from "@tanstack/react-query"
import { streamInfoOptions } from "../service/stream-info.client"
import { VideoType } from "@/types/holodex"
import { useTransition } from "react";
import { useFormatter, useNow, useTranslations } from "next-intl";
import { calculateTimeDifference } from "../utils";
import YouTubeDisplay from "./youtube-display";

export function LastStreamContainer({ message, streamDate }: { message: string, streamDate?: string }) {
    return (
        <div className="w-full max-w-2xl p-4 bg-black/[.05] dark:bg-white/[.06] rounded-lg text-center">
            <p className="text-lg">{message}</p>
            {streamDate &&
                <p className="text-lg">{streamDate}</p>
            }
        </div>
    );
}

function LastStreamWithEmbed({ streamId, streamDate, streamTitle }: { streamId: string, streamDate: Date, streamTitle: string }) {
    const t = useTranslations('LastStream');
    const difference = calculateTimeDifference(streamDate, new Date());
    return (
        <div className="w-full max-w-2xl p-4 bg-black/[.05] dark:bg-white/[.06] rounded-lg text-center">
            <p className="text-lg">{t('Message', {...difference})}</p>
            <div>
                <YouTubeDisplay videoId={streamId} title={streamTitle} />
            </div>
        </div>
    )
}

export default function LastStream() {
    const { isPending, isError, data: streamInfo, error } = useQuery({
        ...streamInfoOptions(),
        select: (data) => {
            if ('error' in data) {
                return null;
            }

            return data
                .filter(video => video.status === "past" && video.type === "stream" && video.published_at)
                .sort((a, b) => new Date(b.published_at as string).getTime() - new Date(a.published_at as string).getTime())[0];
        }
    });
    const t = useTranslations('LastStream');
    const formatter = useFormatter();
    const now = useNow();

    if (isPending) {
        return < LastStreamContainer message={t('Pending')} />
    }
    if (isError || error) {
        return < LastStreamContainer message={t('Error')} />
    }
    if (streamInfo === null || streamInfo === undefined) {
        return < LastStreamContainer message={t('NoStream')} />
    }
    const streamDate = new Date(streamInfo.published_at as string);
    const difference = calculateTimeDifference(streamDate, now);
    return < LastStreamWithEmbed streamDate={streamDate} streamId={streamInfo.id} streamTitle={streamInfo.title}/>;
}