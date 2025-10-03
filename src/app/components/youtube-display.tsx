import { HolodexVideo } from "@/types/holodex";
import Image from "next/image";

export default function YouTubeDisplay({ stream }: { stream: HolodexVideo }) {
    const { id, title } = stream;
    const href = `https://www.youtube.com/watch?v=${id}`;
    const thumbnail = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    return (
        <a href={href} className="flex mt-4 justify-between" target="_blank" rel="noopener noreferrer">
            <span className="text-lg font-bold w-full max-w-1/2">{title}</span>
            <span><Image className="w-48 h-48" src={thumbnail} width={128} height={128} alt={stream.title}/></span>
        </a>
    )    
}