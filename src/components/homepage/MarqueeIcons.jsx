import React, { useRef, useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaPython,
  FaJava,
  FaPhp,
  FaAngular
} from "react-icons/fa";

const icons = [
  FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram,
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJsSquare,
  FaPython, FaJava, FaPhp, FaAngular
];

const MarqueeIcons = ({ speed = 50, pauseOnHover = true }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const animX = useRef(0);

  useEffect(() => {
    let animationFrame;

    const animate = () => {
      if (pauseOnHover && isPaused) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      if (contentRef.current && containerRef.current) {
        const contentWidth = contentRef.current.scrollWidth / 2;
        animX.current -= (speed * 16) / 1000; // assume ~16ms per frame

        if (Math.abs(animX.current) >= contentWidth) {
          animX.current = 0;
        }

        contentRef.current.style.transform = `translateX(${animX.current}px)`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused, speed, pauseOnHover]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div className="text-gray-300 text-center z-10 pt-2 font-bold text-3xl overflow-hidden" style={{backgroundColor: "box-shadow: inset 0px 0px 85px rgba(0, 0, 0, 0.4)"}}>Technologies</div>
      <div
        ref={contentRef}
        className="flex  space-x-8"
        style={{ width: "max-content" }}
      >
        {[...icons, ...icons].map((Icon, index) => (
          <div key={index} className="text-gray-500 hover:text-gray-300">
            <Icon className=" mt-9 w-9 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeIcons;