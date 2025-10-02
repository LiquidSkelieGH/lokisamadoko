'use client';

import React from "react";
import { DEFAULT_MESSAGE } from "./service/message.service";

export const MessageContext = React.createContext<Message>(DEFAULT_MESSAGE);

export const useMessage = () => React.useContext(MessageContext);