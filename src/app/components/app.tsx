'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { MessageContext } from "../contexts";
import { WhereIsMessage } from "@/types/server";

export default function App({ message, children }: { message: WhereIsMessage, children: React.ReactNode }) {
    const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
    },
  }));

  return <QueryClientProvider client={queryClient}>
        <MessageContext value={message}>
            {children}
        </MessageContext>
    </QueryClientProvider>
    ;
}