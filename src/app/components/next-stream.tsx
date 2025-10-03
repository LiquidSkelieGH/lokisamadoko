
"use client";
import { useQuery } from "@tanstack/react-query"
import { streamInfoOptions } from "../service/stream-info.client"
import { useFormatter, useNow, useTranslations } from "next-intl";
import { calculateTimeDifference } from "../utils";
import YouTubeDisplay from "./youtube-display";

function NextStreamContainer({ message, streamDate }: { message: string, streamDate?: string }) {
    return (
        <div className="w-full max-w-2xl p-4 bg-black/[.05] dark:bg-white/[.06] rounded-lg text-center">
            <p className="text-lg">{message}</p>
            {streamDate &&
                <p className="text-lg">{streamDate}</p>
            }
        </div>
    )
}

function NextStreamWithEmbed({ streamId, streamDate, streamTitle }: { streamId: string, streamDate: Date, streamTitle: string }) {
    const t = useTranslations('NextStream');
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

export default function NextStream() {
    

    const { isPending, isError, data: streamInfo, error } = useQuery({
    ...streamInfoOptions(),
    select: (data) => {
        if ('error' in data) {
            return null;
        }

        console.log("All stream data:", data);

        const nextStreamData = data
            .filter(video => video.status === 'upcoming' && video.type === "stream" && video.available_at);

        nextStreamData.sort((a, b) => new Date(b.available_at as string).getTime() - new Date(a.available_at as string).getTime())

        console.log("Next stream data:", nextStreamData);
        return nextStreamData.length > 0 ? nextStreamData[nextStreamData.length-1 ] : null;
    }
    });
    const t = useTranslations('NextStream');
    const formatter = useFormatter();
    const now = useNow();

    if (isPending) {
        return < NextStreamContainer message={t('Pending')} />
    }
    if (isError || error) {
        return < NextStreamContainer message={t('Error')} />
    }
    if (streamInfo === null || streamInfo === undefined) {
        return < NextStreamContainer message={t('NoStream')} />
    }
    const streamDate = new Date(streamInfo.available_at as string);
    const difference = calculateTimeDifference(streamDate, now);
    return < NextStreamWithEmbed streamDate={streamDate} streamId={streamInfo.id} streamTitle={streamInfo.title}/>;
}