import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, getLocaleFromParameter } from "./routing";

export default getRequestConfig(async ({requestLocale}) => {
    const requestedLocale = await requestLocale;
    const locale = getLocaleFromParameter(requestedLocale);
    return {
        locale: locale,
        messages: (await import(`./../../messages/${locale}.json`)).default
    };
});