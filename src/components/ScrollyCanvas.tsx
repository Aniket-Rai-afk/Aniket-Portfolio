"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

const FRAME_COUNT = 192;

function currentFrame(index: number) {
    return `/sequence/frame_${index.toString().padStart(2, '0')}_delay-0.067s.webp`;
}

export function ScrollyCanvas({ scrollYProgress }: { scrollYProgress?: MotionValue<number> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    // Use global scroll if not provided
    const globalScroll = useScroll();
    const progress = (scrollYProgress || globalScroll.scrollYProgress) as MotionValue<number>;

    const frameIndex = useTransform(progress, [0, 1], [0, FRAME_COUNT - 1]) as MotionValue<number>;

    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            loadedImages.push(img);
        }
        // eslint-disable-next-line
        setImages(loadedImages);
    }, []);

    useEffect(() => {
        if (images.length === 0) return;

        let animationFrameId: number;

        const setSize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                render(); // Trigger a render after resize
            }
        };

        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            if (!canvas || !ctx) return;

            const currentIdx = Math.floor(frameIndex.get());
            const img = images[currentIdx];

            if (!img || !img.complete) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);

            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                img,
                0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
            );
        };

        setSize();

        const unsubscribe = frameIndex.on("change", () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(render);
        });

        window.addEventListener("resize", setSize);

        return () => {
            unsubscribe();
            window.removeEventListener("resize", setSize);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [images, frameIndex]);

    return (
        <div className="fixed inset-0 w-full h-full -z-50 bg-[#121212] pointer-events-none">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover"
            />
        </div>
    );
}
