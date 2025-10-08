import { hasLocale } from "next-intl";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["en", "ja"],
    defaultLocale: "en",
    localeCookie: false,
    localePrefix: {
        mode: "as-needed",
        prefixes: {
            "en": "/en",
            "ja": "/jp"
        }
    }
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