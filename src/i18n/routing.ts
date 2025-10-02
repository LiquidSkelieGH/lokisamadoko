import { hasLocale } from "next-intl";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["en", "jp"],
    defaultLocale: "en"
})

export function getLocaleFromParameter(param: string | null | undefined) {
    if (!param) {
        return routing.defaultLocale;
    }
    if (hasLocale(routing.locales, param)) {
        return param;
    } else {
        return routing.defaultLocale;
    }   
}