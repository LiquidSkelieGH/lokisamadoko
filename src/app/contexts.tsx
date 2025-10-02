'use client';

import React from "react";
import { DEFAULT_MESSAGE } from "./service/where-is-message.service";
import { WhereIsMessage } from "@/types/server";

export const MessageContext = React.createContext<WhereIsMessage>(DEFAULT_MESSAGE);

export const useMessage = () => React.useContext(MessageContext);