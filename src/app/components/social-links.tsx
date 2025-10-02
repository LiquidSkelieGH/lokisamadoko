function SocialMediaHyperlink({ href, displayText }: { href: string, displayText?: string }) {
    return <a href={href} className="text-blue-500 hover:underline">{displayText || href}</a>
}

export default function SocialLinks() {
    return (
        <div className="w-full max-w-2xl p-4 bg-black/[.05] dark:bg-white/[.06] rounded-lg text-center">
            <p className="text-lg">Social Links: <SocialMediaHyperlink href="https://lit.link/en/kannagiloki" displayText="Link Tree" /> | <SocialMediaHyperlink href="https://x.com/kannagiloki" displayText="Twitter" /> | <SocialMediaHyperlink href="https://www.youtube.com/@kannagiloki" displayText="YouTube" /> | <SocialMediaHyperlink href="https://shop.phase-connect.com/collections/all/loki-kannagi-%E5%B7%AB%E3%83%AD%E3%82%AD?sort_by=title-ascending" displayText="Merch" /></p>
        </div>
    )
}