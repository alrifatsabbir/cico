import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { Home } from "lucide-react";
import drag from "../assets/drags.png";

gsap.registerPlugin(TextPlugin);

const NotFound = () => {
  const mainContentRef = useRef(null);
  const backgroundRef = useRef(null);
  const gridRef = useRef(null);
  const big404Ref = useRef(null);
  const imageRef = useRef(null);

  const characters = "0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?";

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // === Randomized Matrix-like background ===
    let randomString = "";
    for (let i = 0; i < 2000; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    if (backgroundRef.current) {
      backgroundRef.current.innerText = randomString;
    }
    gsap.to(backgroundRef.current, {
      opacity: 0.05,
      duration: 2,
      delay: 0.5,
    });

    // === Floating 404 Animation ===
    const all404s = gridRef.current.querySelectorAll(".four-oh-four");
    gsap.fromTo(
      all404s,
      { opacity: 0, y: 40, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.05,
        ease: "back.out(1.7)",
      }
    );

    // === Main content fade-in ===
    tl.fromTo(
      mainContentRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.5, delay: 0.8, ease: "power3.out" }
    );

    // === Hover Animation for 404 ===
    const big404 = big404Ref.current;
    const img = imageRef.current;

    const handleEnter = () => {
      gsap.to(big404, { opacity: 0, scale: 0.9, duration: 0.5, ease: "power2.out" });
      gsap.to(img, { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out", delay: 0.1 });
    };

    const handleLeave = () => {
      gsap.to(img, { opacity: 0, scale: 0.9, duration: 0.5, ease: "power2.out" });
      gsap.to(big404, { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out", delay: 0.1 });
    };

    big404.addEventListener("mouseenter", handleEnter);
    big404.addEventListener("mouseleave", handleLeave);

    return () => {
      big404.removeEventListener("mouseenter", handleEnter);
      big404.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative bg-black flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background:"radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249, 115, 22, 0.25), transparent 70%), #000000",}}>
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, rgba(249,115,22,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(249,115,22,0.25) 1px, transparent 1px)`, backgroundSize: "35px 35px", WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 40% 120%, #000 60%, transparent 100%)", maskImage: "radial-gradient(ellipse 70% 60% at 40% 120%, #000 60%, transparent 100%)", }} />
      </div>
      <pre ref={backgroundRef} className="absolute inset-0 text-[10px] sm:text-xs md:text-sm text-orange-500/30 font-mono whitespace-pre-wrap overflow-hidden select-none leading-tight p-4 z-0 opacity-0"/>
      <div ref={gridRef} className="absolute inset-0 overflow-hidden grid grid-cols-10 sm:grid-cols-20 lg:grid-cols-25 gap-2 z-10 p-2">
        {Array.from({ length: 250 }).map((_, index) =>
          index % 18 === 0 && index < 250 ? (
            <span
              key={index}
              className={`four-oh-four text-xl sm:text-2xl overflow-hidden font-bold opacity-0 text-orange-600`}
            >
              404
            </span>
          ) : (
            <span key={index} className="text-transparent overflow-hidden text-xl sm:text-2xl">
              &nbsp;
            </span>
          )
        )}
      </div>

      {/* === Main Content === */}
      <div
        ref={mainContentRef}
        className="main-content z-20 flex flex-col overflow-hidden items-center justify-center text-center opacity-0"
      >
        {/* 404 + Image wrapper */}
        <div className="relative w-[18rem] sm:w-[22rem] md:w-[28rem] h-[10rem] md:h-[14rem] mb-4 select-none overflow-hidden flex items-center justify-center">
          <h1
            ref={big404Ref}
            className="absolute text-[8rem] sm:text-[10rem] overflow-hidden md:text-[12rem] font-extrabold text-orange-500 leading-none"
          >
            404
          </h1>
          <img
            ref={imageRef}
            src={drag}
            alt="drag"
            className="absolute inset-0 w-full h-full object-contain opacity-0 scale-90 pointer-events-none"
          />
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 overflow-hidden">
          PAGE NOT FOUND
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl font-light mb-8 max-w-xl text-gray-300">
          The directory you’re trying to reach doesn’t exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-orange-500/30"
        >
          <Home size={24} className="mr-3" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
