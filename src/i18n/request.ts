import { getRequestConfig } from "next-intl/server";
import { getLocaleFromParameter } from "./routing";
import ProcessEnvironmentServiceImpl from "@/lib/common/service/impl/env.service";
import StaticLocaleMessageService from "@/lib/common/service/impl/static-locale-message.service";

// We cannot use Inversify for this file because it's a middleware-like file
// and Inversify requires "reflect-metadata" to be imported at the top level.
// reflect apis can't be used in the edge runtime.



export default getRequestConfig(async ({requestLocale}) => {
    const env = new ProcessEnvironmentServiceImpl();
    const localeService = new StaticLocaleMessageService();
    const requestedLocale = await requestLocale;
    const locale = getLocaleFromParameter(requestedLocale);
    return {
        locale: locale,
        messages: await localeService.getMessageBundle(locale)
    };
});