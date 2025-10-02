import React from "react";
import messages from "../data/messages";

export const DEFAULT_MESSAGE: Message = {
    id: -1,
    text: "Welcome to the site!",
    image: "default.png",
    language: "en"
}

export default class MessageService {
    static getRandomMessage(): Message {
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }
}