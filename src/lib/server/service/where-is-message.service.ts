import { WhereIsMessage } from "@/lib/common/types/server";
import { ServiceIdentifier } from "inversify";

export interface IWhereIsMessageService {
    getRandomMessage(locale: string): Promise<WhereIsMessage>;
}

export const DEFAULT_MESSAGE: WhereIsMessage = {
    id: -1,
    text: "Welcome to the site!",
    image: "default.png"
};

export const WhereIsMessageService: ServiceIdentifier<IWhereIsMessageService> = Symbol.for('WhereIsMessageServiceSymbol');

export const WhereIsRandomMessage: ServiceIdentifier<WhereIsMessage> = Symbol.for('WhereIsMessageRandom');