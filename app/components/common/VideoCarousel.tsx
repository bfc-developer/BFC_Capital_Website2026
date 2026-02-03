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

const VideoCarousel = ({ videos, autoPlayInterval = 2500 }: VideoCarouselProps) => {
    const [activeVideo, setActiveVideo] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [videoSrc, setVideoSrc] = useState("");
    const [prevActive, setPrevActive] = useState(0);

    useEffect(() => {
        setPrevActive(activeVideo);
    }, [activeVideo]);


    // Helper to extract YouTube ID from various URL formats
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    // Convert YouTube URL to embed format
    const getEmbedUrl = (url: string) => {
        const videoId = getYouTubeId(url);
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
    };

    useEffect(() => {
        if (videos.length <= 1 || isOpen) return;

        const timer = setInterval(() => {
            setActiveVideo((prev) => (prev + 1) % videos.length);
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [videos.length, autoPlayInterval, isOpen]);

    const openPopup = (url: string) => {
        setVideoSrc(getEmbedUrl(url));
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
        setVideoSrc("");
    };

    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;

        // prevent layout shift when scrollbar disappears
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollBarWidth}px`;

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
        };
    }, [isOpen]);

    return (
        <>
            <div className="relative mx-auto max-w-1xl lg:max-w-3xl overflow-hidden aspect-video">
                <div
                    className="flex h-full transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{ transform: `translateX(-${activeVideo * 100}%)` }}
                >
                    {videos.map((video) => {
                        const videoId = getYouTubeId(video.youtubeUrl);
                        const thumbnailUrl =
                            video.thumbnail ||
                            (videoId
                                ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                                : "");

                        return (
                            <div
                                key={video.youtubeUrl}
                                className="relative min-w-full h-full cursor-pointer group"
                                onClick={() => openPopup(video.youtubeUrl)}
                            >
                                {/* Background */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                                    style={{ backgroundImage: `url('${thumbnailUrl}')` }}
                                >
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                </div>

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex h-10 w-15 md:h-16 md:w-24 items-center justify-center rounded-md md:rounded-2xl bg-red-600 text-white shadow-2xl transition-all group-hover:scale-110 active:scale-95 group-hover:bg-red-700">
                                        <Play fill="currentColor" className="ml-1 h-7 w-7 md:h-10 md:w-10" />
                                    </div>
                                </div>

                                {/* Title / Caption */}
                                {(video.title || video.caption) && (
                                    <div className="absolute bottom-8 left-0 right-0 text-center">
                                        {video.title && (
                                            <h3 className="text-white font-black text-2xl md:text-3xl drop-shadow-lg uppercase">
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

            </div>

            {/* Popup Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85" onClick={closePopup}>
                    <div className="popup-video relative bg-white shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closePopup}>
                            &times;
                        </button>
                        <iframe
                            src={videoSrc}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

        </>
    );
};

export default VideoCarousel;
