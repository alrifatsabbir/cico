import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaStackOverflow, FaHackerrank, FaInstagram, FaCodepen, FaYoutube, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiCodeforces, SiCodechef, SiLeetcode } from "react-icons/si";

// ✅ You can later move this data to a separate file like `data/communityData.js`
const communityCards = [
  { logo: <FaGithub className="text-2xl inline mr-2" />,
    title: "GitHub",
    text: "Explore my GitHub repositories to see my projects, contributions, and collaborations. Connect with me and explore my code!",
    link: "https://github.com/alrifatsabbir",
  },
  {
    logo: <FaFacebook className="text-2xl inline mr-2" />,
    title: "Facebook",
    text: "Check out my Facebook profile for updates and community interactions. Connect with me!",
    link: "https://www.facebook.com/alrifatsabbir1",
  },
  {
    title: "LinkedIn",
    text: "Connect with me on LinkedIn to expand your professional network and explore career opportunities.",
    logo: <FaLinkedin className="text-2xl inline mr-2" />,
    link: "https://www.linkedin.com/in/alrifatsabbir/",
  },
  {
    title: "Stack Overflow",
    text: "Join me on Stack Overflow to share knowledge, ask questions, and contribute to the developer community.",
    logo: <FaStackOverflow className="text-2xl inline mr-2" />,
    link: "https://stackoverflow.com/users/24326530/alrifatsabbir"
  },
  {
    title: "YouTube",
    text: "Subscribe to my YouTube channel for tech tutorials, coding tips, and insightful content. Let's learn and grow together!",
    logo: <FaYoutube className="text-2xl inline mr-2" />,
    link: "https://www.youtube.com/@codearcglobal"
  },
  {
    title: "HackerRank",
    text: "Enhance your coding skills by joining me on HackerRank. Participate in coding challenges and improve your problem-solving abilities.",
    logo: <FaHackerrank className="text-2xl inline mr-2" />,
    link: "https://www.hackerrank.com/alrifatsabbir",
  },
  {
    title: "Codeforces",
    text: "Compete with me on Codeforces to test your competitive programming skills and climb the ranks.",
    logo: <SiCodeforces className="text-2xl inline mr-2" />,
    link: "https://codeforces.com/profile/alrifatsabbir",
  },
  {
    title: "CodeChef",
    text: "Join me on CodeChef to participate in coding contests, improve your skills, and connect with a vibrant programming community.",
    logo: <SiCodechef className="text-2xl inline mr-2" />,
    link: "https://www.codechef.com/users/alrifatsabbir",
  },
  {
    title: "X (Twitter)",
    text: "Follow me on X (formerly Twitter) for the latest updates, tech insights, and community engagement. Let's connect and share ideas!",
    logo: <FaXTwitter className="text-2xl inline mr-2" />,
    link: "https://x.com/alrifatsabbir",
  },
  {
    title: "Instagram",
    text: "Follow me on Instagram for a glimpse into my life, projects, and tech adventures. Let's connect visually and share our journeys!",
    logo: <FaInstagram className="text-2xl inline mr-2" />,
    link: "https://www.instagram.com/alrifatsabbir/",
  },
  {
    title: "CodePen",
    text: "Explore my CodePen portfolio to see my front-end projects, experiments, and creative coding endeavors. Connect with me and get inspired!",
    logo: <FaCodepen className="text-2xl inline mr-2" />,
    link: "https://codepen.io/alrifatsabbir",
  },
  {
    title: "LeetCode",
    text: "Join me on LeetCode to practice coding problems, enhance your algorithm skills, and prepare for technical interviews.",
    logo: <SiLeetcode className="text-2xl inline mr-2" />,
    link: "https://leetcode.com/u/alrifatsabbir/",
  },
  {
    title: "Email",
    text: "Feel free to reach out to me via email for any inquiries, collaborations, or just to say hello. I'm always open to connecting with like-minded individuals!",
    logo: <FaEnvelope className="text-2xl inline mr-2" />,
    link: "mailto:alrifatsabbir@gmail.com",
  },
  {
    title: "WhatsApp",
    text: "Connect with me on WhatsApp for quick chats, project discussions, or any tech-related conversations. Let's stay connected!",
    logo: <FaWhatsapp className="text-2xl inline mr-2" />,
    link: "https://wa.me/+8801688525596",
  },
];

const Community = () => {
  return (
    <div
      className="min-h-screen w-full overflow-hidden relative"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000",
      }}
    >
      {/* 🟣 Grid overlay */}
      <div
        className="absolute inset-0 opacity-50 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #121 1px, transparent 1px),
            linear-gradient(to bottom, #121 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
        }}
      />

      {/* 🟣 Cards Section */}
      <div className="relative top-32 z-9 min-h-screen px-6 mb-48 flex justify-center">
        <div className="grid grid-cols-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl">
          {communityCards.map((card, index) => (
            <div key={index}
              className="border top-4 mb-6 relative border-purple-700 rounded-3xl bg-black/60 backdrop-blur-xl p-8 text-white
                         transition-transform transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/40 duration-300"
            >
              <h2 className="text-xl font-semibold mb-4 text-purple-300">
                {card.logo}{card.title}
              </h2>
              <p className="text-sm text-gray-300 mb-6">{card.text}</p>

              {card.link ? (
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 hover:bg-purple-700 transition px-5 py-2 rounded-lg font-medium inline-block"
                >
                  Learn More
                </a>
              ) : (
                <button
                  disabled
                  className="bg-gray-700 text-gray-400 px-5 py-2 rounded-lg font-medium cursor-not-allowed"
                >
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;