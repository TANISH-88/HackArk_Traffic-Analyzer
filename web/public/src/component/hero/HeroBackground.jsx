import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroBackground = ({ slides, activeIndex }) => {
  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      const isActive = i === activeIndex;
      
      if (isActive && video) {
        video.play().catch(() => {}); // Autoplay safety
      }

      gsap.to(video, {
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 1.05,
        duration: 1.5,
        ease: "power2.inOut",
      });
    });
  }, [activeIndex]);

  return (
    <div className="absolute inset-0 z-0 bg-black">
      {slides.map((slide, i) => (
        <video
        id='video'
          key={i}
          ref={el => videoRefs.current[i] = el}
          src={slide.url}
          className="absolute inset-0 w-full h-full object-cover opacity-0 will-change-transform"
          autoPlay
          loop
          muted
          playsInline
        />
      ))}
      <div className="absolute inset-0 bg-black/50 z-10" />
    </div>
  );
};

export default HeroBackground;