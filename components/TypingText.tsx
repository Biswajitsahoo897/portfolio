"use client";

import { useState, useEffect } from "react";

export default function TypingText({ text, speed = 40 }: { text: string; speed?: number }) {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText((prev) => prev + text.charAt(index));
                setIndex((prev) => prev + 1);
            }, speed);

            return () => clearTimeout(timer);
        }
    }, [index, text, speed]);

    return (
        <span>
            {displayedText}
            {/* Blinking Cursor */}
            <span className="inline-block w-[2px] h-[1.1em] bg-signal ml-1 align-middle animate-pulse rounded-full" />
        </span>
    );
}