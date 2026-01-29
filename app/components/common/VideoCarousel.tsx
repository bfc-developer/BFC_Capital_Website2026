"use client";

import { useState, useEffect } from "react";
import { Play } from "lucide-react";

interface Video {
    youtubeUrl: string;
    thumbnail?: string;
    title?: string;
    caption?: string;
}

interface VideoCarouselProps {
    videos: Video[];
    autoPlayInterval?: number;
}

const VideoCarousel = ({ videos, autoPlayInterval = 4000 }: VideoCarouselProps) => {
    const [activeVideo, setActiveVideo] = useState(0);
    const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

    // Helper to extract YouTube ID from various URL formats
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    useEffect(() => {
        if (videos.length <= 1 || playingVideoId) return;

        const timer = setInterval(() => {
            setActiveVideo((prev) => (prev + 1) % videos.length);
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [videos.length, autoPlayInterval, playingVideoId]);

    const handleVideoClick = (url: string) => {
        const id = getYouTubeId(url);
        if (id) {
            setPlayingVideoId(id);
        }
    };

    return (
        <>
            <div className="relative mx-auto max-w-1xl lg:max-w-3xl overflow-hidden aspect-video group cursor-pointer">
                {videos.map((video, idx) => {
                    const videoId = getYouTubeId(video.youtubeUrl);
                    const thumbnailUrl = video.thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '');

                    return (
                        <div
                            key={video.youtubeUrl}
                            onClick={() => handleVideoClick(video.youtubeUrl)}
                            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === activeVideo ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                                }`}
                        >
                            <div
                                className="h-full w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                                style={{ backgroundImage: `url('${thumbnailUrl}')` }}
                            >
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex h-16 w-24 items-center justify-center rounded-2xl bg-red-600 text-white shadow-2xl transition-all group-hover:scale-110 active:scale-95 group-hover:bg-red-700">
                                    <Play fill="currentColor" className="ml-1 h-10 w-10 text-white" />
                                </div>
                            </div>
                            {(video.title || video.caption) && (
                                <div className="absolute bottom-8 left-0 right-0 text-center">
                                    {video.title && (
                                        <h3 className="text-white font-black text-2xl md:text-3xl drop-shadow-lg tracking-wider uppercase">
                                            {video.title}
                                        </h3>
                                    )}
                                    {video.caption && (
                                        <p className="text-white/80 text-sm font-bold mt-2 uppercase tracking-widest">
                                            {video.caption}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Video Modal Overlay */}
            {playingVideoId && (
                <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
                        <button
                            onClick={() => setPlayingVideoId(null)}
                            className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-sm"
                        >
                            Close <span className="text-2xl">×</span>
                        </button>
                        <iframe
                            src={`https://www.youtube.com/embed/${playingVideoId}?autoplay=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                    <div
                        className="absolute inset-0 -z-10"
                        onClick={() => setPlayingVideoId(null)}
                    ></div>
                </div>
            )}
        </>
    );
};

export default VideoCarousel;
