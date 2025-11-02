import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full relative flex items-center justify-center overflow-hidden"
    >
      {/* Crimson Shadow Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 80, 120, 0.25), transparent 70%), #000000",
        }}
      />

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 max-w-3xl px-6 text-center"
      >
        <h2 className="text-4xl md:text-5xl overflow-hidden font-bold text-white mb-4">
          About <span className="text-[#ff5078]">CICO</span>
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          CICO is a minimal yet powerful productivity hub that unites a
          <span className="text-white font-semibold"> Calculator</span>,
          <span className="text-white font-semibold"> Clock</span>, and
          <span className="text-white font-semibold"> Calendar</span> — all in one place.
          Built for efficiency, designed for simplicity, and enhanced by
          community-driven features to make your daily workflow seamless.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;