import React from "react";
import messages from "../data/where-is-messages";
import { WhereIsMessage } from "@/types/server";
import { getLocale } from "next-intl/server";
import { getLocaleFromParameter } from "@/i18n/routing";


export const DEFAULT_MESSAGE: WhereIsMessage = {
    id: -1,
    text: "Welcome to the site!",
    image: "default.png"
}

export default class WhereIsMessageService {
    static async getRandomMessage(locale: string): Promise<WhereIsMessage> {
        const messageLocale = getLocaleFromParameter(locale);
        const messages = (await import(`../../../messages/where-is-message-${messageLocale}.json`)).default as WhereIsMessage[];
        if (messages.length === 0) {
            return DEFAULT_MESSAGE;
        }
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }
}