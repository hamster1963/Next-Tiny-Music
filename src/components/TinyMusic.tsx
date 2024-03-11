"use client";
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {cn} from "@/lib/utils";


/**
 * MusicData represents the data needed to display a music track in the UI.
 */
interface MusicData {
    /**
     * Optional CSS class name to apply to the music track element.
     */
    className?: string

    /**
     * The title of the music track.
     */
    trackTitle: string

    /**
     * The URL of the artwork for the music track.
     */
    artworkUrl: string

    /**
     * The current status of the music player.
     */
    playerStatus: boolean

    /**
     * The current progress of the music track, represented as a percentage.
     */
    playPercent: number
}


const anim = {
    initial: { opacity: 1, scale: 0.3, transition: { delay: 1 } },
    open: {
        scale: 1,
        y: 80,
        filter: ['blur(5px)', 'blur(0px)'],
        opacity: [0.1, 1],
        transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
    },
    closed: { scale: 1, y: 0, filter: ['blur(5px)', 'blur(0px)'] },
}


function TinyMusic({className,trackTitle,artworkUrl,playerStatus,playPercent}:MusicData){
    const [isActive, setIsActive] = useState(false)
    const [imgColor, setImgColor] = useState({ r: 0, g: 0, b: 0 })
    const [isMounted, setIsMounted] = useState(false)
    const extractAverageColor = useCallback((img: HTMLImageElement) => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        if (!context) {
            return { r: 0, g: 0, b: 0 } // Fallback color
        }

        canvas.width = img.width
        canvas.height = img.height
        context.drawImage(img, 0, 0, img.width, img.height)

        const data = context.getImageData(0, 0, img.width, img.height).data
        let r = 0,
            g = 0,
            b = 0,
            count = 0

        for (let i = 0; i < data.length; i += 4) {
            r += data[i]!
            g += data[i + 1]!
            b += data[i + 2]!
            count++
        }

        return {
            r: Math.round(r / count),
            g: Math.round(g / count),
            b: Math.round(b / count),
        }
    }, [])


    useEffect(() => {
        let isCancelled = false;

        const fetchImage = async () => {
            const res = await fetch(artworkUrl);
            const blob = await res.blob();
            const img = new Image();
            img.src = URL.createObjectURL(blob);
            img.onload = () => {
                if (!isCancelled) {
                    setImgColor(extractAverageColor(img));
                }
            };
        };

        void fetchImage();

        return () => { isCancelled = true; };
    }, [artworkUrl, extractAverageColor]);


    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 1000);
        return () => clearTimeout(timer);
    }, []);


    return (
        <div
            className={cn("hit-area  z-50 pointer-events-auto relative py-4", className)}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
        >
            <AnimatePresence mode={'wait'}>
                {isMounted && (
                    <motion.div
                        key="music-widget"
                        variants={anim}
                        initial="initial"
                        animate={isActive ? 'open' : 'closed'}
                        className={clsx('pointer-events-auto relative  mr-4 flex items-center rounded-xl backdrop-blur-lg', {
                            'bg-white dark:bg-black': !isActive,
                            'bg-opacity-10 dark:bg-opacity-10': !isActive,
                            'px-1.5 py-1.5 gap-1 ring-1 ring-zinc-900/5 dark:ring-white/10': !isActive,
                            'bg-opacity-0 dark:bg-opacity-0 px-2 py-2': isActive,
                        })}
                    >
                            <img
                                className={clsx(' relative z-50', {
                                    'w-8 rounded': !isActive,
                                    'w-32 rounded-md': isActive,
                                })}
                                src={artworkUrl}
                                alt="Album Art"
                                style={{
                                    boxShadow: !isActive
                                        ? `0 0 10px 1px rgb(${imgColor?.r}, ${imgColor?.g}, ${imgColor?.b},0.6)`
                                        : `0 10px 50px 5px rgb(${imgColor?.r}, ${imgColor?.g}, ${imgColor?.b},0.3)`,
                                }}
                            />
                        {/* background */}
                        <div
                            style={{
                                backgroundColor: `rgba(${imgColor?.r}, ${imgColor?.g}, ${imgColor?.b},0.05)`,
                            }}
                            className="absolute bottom-0 left-0 right-0 top-0 rounded-xl"
                        ></div>
                        {/* progress bar */}
                        <div className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden rounded-xl">
                            <div
                                style={{
                                    backgroundImage: `linear-gradient(90deg, rgba(${imgColor?.r}, ${imgColor?.g}, ${imgColor?.b},0.05), rgba(${imgColor?.r}, ${imgColor?.g}, ${imgColor?.b},0.2))`,
                                    width: `${playPercent}%`,
                                    transition: 'width 0.5s ease-in-out',
                                }}
                                className="h-full"
                            ></div>
                        </div>

                        <div className="relative z-50 flex-col items-start transition-all">
                            {!isActive && (
                                <>
                                    <div className={'text-[10px] font-semibold opacity-50 '}>
                                        {playerStatus ? 'Now Playing' : 'Paused'}
                                    </div>
                                    <div className={'text-[12px] font-semibold opacity-80 '}>
                                        {trackTitle && trackTitle.length >= 10 ? (
                                            <div className="overflow-hidden whitespace-nowrap  w-16">
                                                <div className="inline-block pl-[30%] animate-marquee">{trackTitle}</div>
                                            </div>
                                        ) : (
                                            trackTitle
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default TinyMusic
