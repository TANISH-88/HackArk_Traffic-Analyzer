import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroText = ({ slides, activeIndex }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      slides.forEach((_, i) => {
        const slideEl = containerRef.current.children[i];
        const title = slideEl.querySelector('h1');
        const subtitle = slideEl.querySelector('.sub-text');
        const isActive = i === activeIndex;

        if (isActive) {
          // 1. Title Reveal (Sharp & Smooth)
          gsap.fromTo(title,
            { opacity: 0, filter: "blur(20px)" },
            { 
              opacity: 1, 
              filter: "blur(0px)", 
              duration: 1, 
              ease: "expo.out" 
            }
          );

          // 2. Subtitle: Left-to-Right "Smoky Reveal" 
          // Performance Fix: Animating Mask instead of letters
          gsap.fromTo(subtitle,
            { 
              opacity: 0, 
              filter: "blur(15px)", 
              clipPath: "inset(0% 100% 0% 0%)", // Left se hidden
              x: 10 
            },
            { 
              opacity: 1, 
              filter: "blur(0px)", 
              clipPath: "inset(0% 0% 0% 0%)", // Right tak reveal
              x: 0,
              duration: 1.5, 
              ease: "power3.out", 
              delay: 0.2 
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeIndex, slides]);

  return (
    <div ref={containerRef} className="relative z-20 h-full w-full pointer-events-none">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 flex flex-col items-center text-center pt-[22vh] px-10"
          style={{ display: i === activeIndex ? "flex" : "none" }}
        >
          {/* Main Title */}
          <h1 className="text-white text-[9vw] md:text-[6.8vw] font-medium uppercase tracking-[-0.03em] leading-[0.85] max-w-6xl">
            {slide.title}
          </h1>

          {/* Subtitle - Now optimized for smooth performance */}
          <div className="mt-10 max-w-2xl">
            <p className="sub-text text-white/40 font-serif italic text-xl md:text-2xl tracking-wide leading-relaxed will-change-[clip-path,filter]">
              {slide.sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroText;