import { getRequestConfig } from "next-intl/server";
import { getLocaleFromParameter } from "./routing";
import container from "@/lib/common/di/common-container";
import { LocaleMessageService } from "@/lib/common/service/locale-message.service";

export default getRequestConfig(async ({requestLocale}) => {
    const requestedLocale = await requestLocale;
    const locale = getLocaleFromParameter(requestedLocale);
    return {
        locale: locale,
        messages: await container.get(LocaleMessageService).getMessageBundle(locale)
    };
});