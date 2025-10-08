"use client";
import { useQuery } from "@tanstack/react-query"
import { streamInfoOptions } from "../service/stream-info.client"
import { HolodexVideo, VideoType } from "@/types/holodex"
import { useTransition } from "react";
import { useFormatter, useNow, useTranslations } from "next-intl";
import { calculateTimeDifference } from "../utils";
import YouTubeDisplay from "./youtube-display";
import { LayoutSection } from "./layout-section";
import { DateTime } from "luxon";
import StreamLayoutSection from "./stream-layout";

export function LastStreamContainer({ message, streamDate }: { message: string, streamDate?: string }) {
    return (
        <LayoutSection>
            <p className="text-lg">{message}</p>
            {streamDate &&
                <p className="text-lg">{streamDate}</p>
            }
        </LayoutSection>
    );
}

function findStreamEndDateTime(stream: HolodexVideo): DateTime | undefined {
    if (stream.end_actual) {
        return DateTime.fromISO(stream.end_actual);
    }
    if (stream.start_actual && stream.duration) {
        return DateTime.fromISO(stream.start_actual).plus({seconds: stream.duration});
    }
    return undefined;
}

function compareStreamEndTimes(a: HolodexVideo, b: HolodexVideo): number {
    const aEndDate = findStreamEndDateTime(a);
    const bEndDate = findStreamEndDateTime(b);

    if (aEndDate && bEndDate) {
        return bEndDate.diff(aEndDate).milliseconds;
    }
    if (aEndDate) {
        return -1;
    }
    if (bEndDate) {
        return 1;
    }
    return 0;
}

export default function LastStream() {
    const { isPending, isError, data: streamInfo, error } = useQuery({
        ...streamInfoOptions(),
        select: (data) => {
            if ('error' in data) {
                return null;
            }

            return data
                .filter(video => video.status === "past" && video.type === "stream" && findStreamEndDateTime(video))
                .sort(compareStreamEndTimes)[0];
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
    const streamDate = findStreamEndDateTime(streamInfo) as DateTime;
    return <StreamLayoutSection stream={streamInfo} displayDate={streamDate} namespace="LastStream"/>;
}