import { getLocaleFromParameter } from "@/i18n/routing";
import { WhereIsMessage } from "@/lib/common/types/server";
import { injectable } from "inversify";
import { DEFAULT_MESSAGE, IWhereIsMessageService } from "../where-is-message.service";

@injectable()
export default class JsonBundleWhereIsMessageService implements IWhereIsMessageService {
    async getRandomMessage(locale: string): Promise<WhereIsMessage> {
        const messageLocale = getLocaleFromParameter(locale);
        const messages = (await import(`../../../../../messages/where-is-message-${messageLocale}.json`)).default as WhereIsMessage[];
        if (messages.length === 0) {
            return DEFAULT_MESSAGE;
        }
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }
}