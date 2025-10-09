import { useTranslations } from "next-intl"
import { LayoutSection } from "./layout-section";

function SocialMediaHyperlink({ href, displayText }: { href: string, displayText?: string }) {
    return <a href={href} className="text-blue-500 hover:underline">{displayText || href}</a>
}

export default function SocialLinks() {
    const t = useTranslations('SocialLinks');
    return (
        <LayoutSection>
            <p className="text-lg">{t('Prefix')} <SocialMediaHyperlink href="https://lit.link/en/kannagiloki" displayText="Link Tree" /> | <SocialMediaHyperlink href="https://x.com/kannagiloki" displayText="Twitter" /> | <SocialMediaHyperlink href="https://www.youtube.com/@kannagiloki" displayText="YouTube" /> | <SocialMediaHyperlink href="https://shop.phase-connect.com/collections/all/loki-kannagi-%E5%B7%AB%E3%83%AD%E3%82%AD?sort_by=title-ascending" displayText="Merch" /></p>
        </LayoutSection>
    )
}