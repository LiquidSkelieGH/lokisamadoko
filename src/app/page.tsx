import Image from "next/image";
import Header from "./components/header";
import { Footer } from "./components/footer";
import Message from "./components/message";
import NextStream from "./components/next-stream";
import LastStream from "./components/last-stream";
import SocialLinks from "./components/social-links";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Header />
      <main className="w-full flex flex-col items-center gap-8">
        <Message />
        <NextStream />
        <LastStream />
        <SocialLinks />
      </main>
      <Footer />
    </div>
  );
}
