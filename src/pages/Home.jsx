import React from 'react';
import LightRays from '../components/homepage/LightRays';
import VideoText from '../components/homepage/VideoText';
import { Link, useLocation } from 'react-router-dom';
import AboutSection from '../components/homepage/AboutSection';
import MarqueeIcons from '../components/homepage/MarqueeIcons';
import StatsSection from '@/components/ui/StatsSection';
import ToolsSection from '@/components/homepage/ToolsSection';
import Faq from '@/components/homepage/Faq';
import { useEffect } from 'react';

const Home = () => {
  const location = useLocation();

  // When redirected with a hash (#about, #stats, etc.)
  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      {/* ========= Hero Section ========= */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-between text-center overflow-hidden"
        style={{background:"radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000",}}>
        <div className="absolute inset-0 z-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#00ffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
          />
        </div>

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 z-1 opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(to right, #121 1px, transparent 1px),
              linear-gradient(to bottom, #121 1px, transparent 1px)
            `,
            backgroundSize: "42px 42px",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 100% at 0% 100%, #000 50%, transparent 90%)",
            maskImage:
              "radial-gradient(ellipse 80% 100% at 0% 100%, #000 50%, transparent 90%)",
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative top-0 z-10 flex flex-col items-center justify-center text-center sm:px-6 md:px-8 max-w-4xl mx-auto">
          <div className="w-full flex justify-center md:mt-16">
            <VideoText />
          </div>
          <p
            className="text-white justify-center font-bold overflow-hidden 
                text-base sm:text-lg md:text-xl lg:text-2xl mx-4 mb-4
                leading-snug md:mb-4"
          >
            <span className="bg-gradient-to-bl from-gray-800 via-purple-700 to-gray-900 bg-clip-text text-transparent">
              Welcome to CICO
            </span>{" "}
            - Your Ultimate Calculator, Clock, and Calendar <br />
            Explore our Blogs and Community for more exciting features.
          </p>
          <Link to="/community">
            <button
              className="bg-purple-600 text-white font-semibold rounded-full 
                    px-5 py-2 mb-4 md:px-6 md:py-2 text-sm md:text-base 
                    mt-2 hover:bg-purple-700 transition duration-300 cursor-pointer"
            >
              Join Our Community
            </button>
          </Link>
        </div>
      </section>

      {/* ========= Marquee Section ========= */}
      <div
        id="marquee"
        className="min-h-36 w-full relative bg-black"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
              radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
              radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
              radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
              #000000`,
          }}
        >
          <MarqueeIcons speed={50} pauseOnHover={true} />
        </div>
      </div>

      {/* ========= About Section ========= */}
      <section id="about">
        <AboutSection />
      </section>

      {/* ========= Stats Section ========= */}
      <section
        id="stats"
        className="min-h-56 w-full relative py-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), #000000",
        }}
      >
        <h1 className="text-purple-400 font-semibold text-center text-5xl overflow-hidden">
          Stats
        </h1>
        <StatsSection />
      </section>

      {/* ========= Tools Section ========= */}
      <section
        id="tools"
        className="min-h-screen w-full relative flex items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
        }}
      >
        <ToolsSection />
      </section>

      {/* ========= FAQ Section ========= */}
      <section id="faq">
        <Faq />
      </section>
    </>
  );
};

export default Home;
