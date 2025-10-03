import { useTranslations } from "next-intl"

export default function Header() {
    const t = useTranslations('Header');
    return (
        <header className="w-full flex justify-center items-center py-4 border-b border-solid border-black/[.08] dark:border-white/[.145]">
            <h1 className="text-2xl font-bold">{t('Title')}</h1>
        </header>
    )
}