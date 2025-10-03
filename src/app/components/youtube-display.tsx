export default function YouTubeDisplay({ videoId, title }: { videoId: string, title: string }) {
    const href = `https://www.youtube.com/watch?v=${videoId}`;
    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    return (
        <a href={href} className="flex mt-4 justify-between" target="_blank" rel="noopener noreferrer">
            <span className="text-lg font-bold w-full max-w-1/2">{title}</span>
            <span><img className="w-48 h-48" src={thumbnail}></img></span>
        </a>
    )    
}