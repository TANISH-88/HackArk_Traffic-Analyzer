import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/all';
import HeroBackground from './HeroBackground';
import HeroText from './HeroText';

gsap.registerPlugin(Observer);

const Hero = () => {
    const [index, setIndex] = useState(0);
    const isAnimating = useRef(false);
    const autoPlayRef = useRef(null);

    const slides = [
        { url: '/video1.mp4', title: 'Predict Traffic', sub: 'A traffic prediction system is necessary to shift from reactive congestion management to proactive urban planning by identifying future bottlenecks before they occur. It provides authorities with data-driven insights to optimize road capacity, reduce travel delays, and enhance public safety in rapidly growing cities.' },
        { url: '/video2.mp4', title: 'Urban Flow', sub: 'Predicting urban flow is vital to anticipate high-density crowd surges and prevent safety risks in public spaces. It enables the synchronization of pedestrian movement with vehicle traffic to ensure a seamless and safe city experience.' }
    ];

    const changeSlide = useCallback((dir) => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        setIndex((prev) => (prev + dir + slides.length) % slides.length);

        gsap.delayedCall(1.2, () => {
            isAnimating.current = false;
        });
    }, [slides.length]);

    // Logic to reset timer whenever user interacts
    const startAutoPlay = useCallback(() => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        autoPlayRef.current = setInterval(() => {
            changeSlide(1);
        }, 5000); // 5 Seconds auto-slide
    }, [changeSlide]);

    useEffect(() => {
        startAutoPlay();

        const obs = Observer.create({
            target: window,
            type: "wheel,touch",
            onDown: () => { changeSlide(1); startAutoPlay(); },
            onUp: () => { changeSlide(-1); startAutoPlay(); },
            tolerance: 20,
            preventDefault: true
        });

        return () => {
            obs.kill();
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, [changeSlide, startAutoPlay]);

    return (
        <main className="relative w-full h-screen bg-black overflow-hidden touch-none">
            <HeroBackground slides={slides} activeIndex={index} />
            <HeroText slides={slides} activeIndex={index} />

            {/* Subtle Progress Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex gap-3">
                {slides.map((_, i) => (
                    <div key={i} className={`h-0.5 w-8 transition-all duration-500 ${i === index ? 'bg-white' : 'bg-white/20'}`} />
                ))}
            </div>
        </main>
    );
};

export default Hero;