export function LayoutSection({children}: {children: React.ReactNode}) {
    return <section className="w-full max-w-2xl p-4 bg-black/[.05] dark:bg-white/[.06] rounded-lg text-center flex flex-col items-center">
        {children}
    </section>
}
