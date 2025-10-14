import { ILocaleMessageService } from "../locale-message.service";

export default class StaticLocaleMessageService implements ILocaleMessageService {
    async getMessageBundle(locale: string): Promise<any> {
        return (await import(`../../../../../messages/${locale}.json`)).default
    }
}