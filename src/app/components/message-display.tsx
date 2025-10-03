"use client";

import { useTranslations } from "next-intl";
import { useMessage } from "../contexts"
import { useQuery } from "@tanstack/react-query";
import { streamInfoOptions } from "../service/stream-info.client";
import { WhereIsMessage } from "@/types/server";
import { HolodexVideo } from "@/types/holodex";
import YouTubeDisplay from "./youtube-display";
import Image from "next/image";
import { LayoutSection } from "./layout-section";

function WhereIsMessageContainer({ message }: { message: WhereIsMessage }) {
    return (
        <LayoutSection>
            <p className="text-lg">{message.text}</p>
            <p><Image src={`/images/${message.image}`} alt={message.text} width={300} height={300}/></p>
        </LayoutSection>
    )
}

function LiveMessage({ streamInfo }: { streamInfo: HolodexVideo }) {
    const t = useTranslations('MessageDisplay');
    return (
        <LayoutSection>
            <p className="text-lg">{t('Live')}</p>
            <p><Image src={`/images/live_now.jpg`} alt="Live Now" width={300} height={300}/></p>
            <YouTubeDisplay stream={streamInfo} />
        </LayoutSection>
    )
}

export default function MessageDisplay() {   
    const message = useMessage();
    const t = useTranslations('MessageDisplay');
    const { isPending, isError, data: liveStream, error, isSuccess } = useQuery({
        ...streamInfoOptions(),
        select: (data) => {
            if ('error' in data) {
                return null;
            }

            return data
                .find(video => video.status === "live" && video.type === "stream");
        }
    });

    if (isSuccess && liveStream) {
        return < LiveMessage streamInfo={liveStream} />
    } else {
        return < WhereIsMessageContainer message={message} />
    }
}