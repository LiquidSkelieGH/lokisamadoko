import { useTranslations } from "next-intl";

export function Footer() {
    const t = useTranslations('Footer');
    return (
        <footer className="w-full flex justify-center items-center py-4 border-t border-solid border-black/[.08] dark:border-white/[.145] mt-8">
            <p className="text-sm text-black/[.5] dark:text-white/[.5]">{t('Text')}</p>
        </footer>
    )
}