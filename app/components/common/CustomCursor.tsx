"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            if (cursorRef.current) {
                const target = e.target as HTMLElement;
                const computedCursor = window.getComputedStyle(target).cursor;
                const isSystemCursor = computedCursor === 'pointer' || computedCursor === 'text';

                cursorRef.current.style.transform = `translate3d(${e.clientX - 12.5}px, ${e.clientY - 12.5}px, 0)`;
                cursorRef.current.style.opacity = isSystemCursor ? "0" : "1";
            }
        };

        window.addEventListener("mousemove", updatePosition, { passive: true });

        return () => {
            window.removeEventListener("mousemove", updatePosition);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            id="cursor"
            style={{
                width: "25px",
                height: "25px",
                backgroundColor: "transparent",
                borderRadius: "50%",
                position: "fixed",
                zIndex: 100000,
                pointerEvents: "none",
                top: 0,
                left: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Image
                id="cursor-img"
                src="/favicon.ico"
                alt="cursor"
                width={20}
                height={20}
                style={{ position: "absolute" }}
            />
        </div>
    );
};

export default CustomCursor;
