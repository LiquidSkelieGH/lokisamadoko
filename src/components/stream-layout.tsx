import { HolodexVideo } from "@/lib/common/types/holodex";
import { DateTime } from "luxon";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { LayoutSection } from "./layout-section";
import YouTubeDisplay from "./youtube-display";

export default function StreamLayoutSection({ stream, displayDate, namespace }: { stream: HolodexVideo, displayDate?: DateTime, namespace: string }) {
    const t = useTranslations(namespace);
    const locale = useLocale();
    const formatter = useFormatter();
    let diff = undefined;
    if (displayDate) {
        diff = displayDate.diffNow(['days', 'hours', "minutes", "seconds"]);
        if (diff.as('milliseconds') < 0) {
            diff = diff.negate();
        }
    }
    return (
        <LayoutSection>
            {
                displayDate &&
                <>
                    <p className="text-lg">{t('RelativeDateMessage', {...diff?.toObject()})}</p>
                    <p className="text-lg">{t('TimestampMessage', {streamDate: displayDate.setLocale(locale).toLocaleString(DateTime.DATETIME_FULL)})}</p>
                </>
            }
            <div>
                <YouTubeDisplay stream={stream} />
            </div>
        </LayoutSection>
    )
}