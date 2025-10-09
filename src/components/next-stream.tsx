
"use client";
import { useQuery } from "@tanstack/react-query"
import { streamInfoOptions } from "@/lib/client/di/hooks"
import { useFormatter, useNow, useTranslations } from "next-intl";
import { LayoutSection } from "./layout-section";
import { DateTime } from "luxon";
import StreamLayoutSection from "./stream-layout";

function NextStreamContainer({ message, streamDate }: { message: string, streamDate?: string }) {
    return (
        <LayoutSection>
            <p className="text-lg">{message}</p>
            {streamDate &&
                <p className="text-lg">{streamDate}</p>
            }
        </LayoutSection>
    )
}

export default function NextStream() {
    const { isPending, isError, data: streamInfo, error } = useQuery({
    ...streamInfoOptions(),
    select: (data) => {
        if ('error' in data) {
            return null;
        }

        const nextStreamData = data
            .filter(video => video.status === 'upcoming' && video.type === "stream" && video.available_at);

        nextStreamData.sort((a, b) => DateTime.fromISO(b.available_at as string).diff(DateTime.fromISO(a.available_at as string)).milliseconds)
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
    const streamDate = DateTime.fromISO(streamInfo.available_at as string);
    return < StreamLayoutSection stream={streamInfo} displayDate={streamDate} namespace="NextStream"/>;
}