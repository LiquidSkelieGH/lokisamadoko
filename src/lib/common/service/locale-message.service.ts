import { ServiceIdentifier } from "inversify";

export interface ILocaleMessageService {
    getMessageBundle(locale: string): Promise<any>;
}

export const LocaleMessageService: ServiceIdentifier<ILocaleMessageService> = Symbol.for('LocaleMessageServiceSymbol');