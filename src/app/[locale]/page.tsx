"use client";

import Image from "next/image";
import Header from "../components/header";
import { Footer } from "../components/footer";
import MessageDisplay from "../components/message-display";
import NextStream from "../components/next-stream";
import LastStream from "../components/last-stream";
import SocialLinks from "../components/social-links";
import { usePrefetchQuery } from "@tanstack/react-query";
import { streamInfoOptions } from "../service/stream-info.client";

export default function Home() {
  usePrefetchQuery(streamInfoOptions());
  return (
    <div className="font-sans flex flex-col justify-items-center min-h-screen p-8 gap-16">
      <Header />
      <main className="w-full flex flex-col items-center gap-8">
        <MessageDisplay />
        <NextStream />
        <LastStream />
        <SocialLinks />
      </main>
      <Footer />
    </div>
  );
}
