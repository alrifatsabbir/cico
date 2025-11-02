import React, { useRef } from "react";
import {
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Lightbulb,
  Building,
  Users,
  Scale,
  Mail,
  ExternalLink,
} from "lucide-react";
import CicoLogo from "../assets/CICo-nr.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerRef = useRef(null);
  const linkRefs = useRef([]);
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Products & Features",
      Icon: Lightbulb,
      links: [
        { name: "Calendar", path: "/calendar" },
        { name: "Calculator", path: "/calculator" },
        { name: "Clock", path: "/clock" },
        { name: "All Tools", path: "/#tools"}
      ],
    },
    {
      title: "Company & Info",
      Icon: Building,
      links: [
        { name: "About", path: "/#about" },
        { name: "FAQ", path: "/#faq" },
        { name: "Contact", path: "/community" },
        { name: "Blogs", path: "https://alrifatsabbir.netlify.app/blog"}
      ],
    },
    {
      title: "Community",
      Icon: Users,
      links: [
        {
          name: "LinkedIn",
          path: "https://www.linkedin.com/in/alrifatsabbir/",
          external: true,
          Icon: Linkedin,
        },
        {
          name: "GitHub",
          path: "https://github.com/alrifatsabbir",
          external: true,
          Icon: Github,
        },
        {
          name: "Facebook",
          path: "https://www.facebook.com/al.rifat.sabbir47",
          external: true,
          Icon: Facebook,
        },
        {
          name: "Instagram",
          path: "https://www.instagram.com/alrifatsabbir/",
          external: true,
          Icon: Instagram,
        },
        {
          name: "YouTube",
          path: "https://www.youtube.com/@codearcglobal",
          external: true,
          Icon: Youtube,
        },
      ],
    },
    {
      title: "Legal",
      Icon: Scale,
      links: [
        { name: "Privacy Policy", path: "/legal/privacy" },
        { name: "Terms of Services", path: "/legal/terms" },
        { name: "Security Policy", path: "/legal/security" },
        { name: "Licenses", path: "/legal/licenses" },
      ],
    },
  ];

  const primarySocials = [
    {
      name: "GitHub",
      href: "https://github.com/alrifatsabbir",
      Icon: Github,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/alrifatsabbir/",
      Icon: Linkedin,
    },
    { name: "Email", href: "mailto:alrifatsabbir@gmail.com", Icon: Mail },
  ];

  const linkClasses =
    "flex items-center text-gray-400 text-sm font-medium hover:text-[#00ffff] transition-all duration-200 px-6 py-2 -ml-2 hover:bg-gray-800/50";

  return (
    <footer
      ref={footerRef}
      className="bg-[#050014] text-white border-t border-gray-700/40 shadow-inner overflow-hidden"
    >
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          {/* ====== Logo & Address ====== */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src={CicoLogo}
                alt="CICO Logo"
                className="w-36 h-36 object-contain rounded-lg shadow-lg"
              />
            </div>
            <p className="text-gray-400 text-base max-w-sm">
              Simplify your workflow with CICO — Calendar, Calculator, and Clock
              in one unified experience.
              <br />
              <span className="text-gray-500 text-sm block mt-2">
                Mirpur, Dhaka, Bangladesh
              </span>
            </p>
            <div className="flex space-x-4 pt-2">
              {primarySocials.map((social, index) => {
                const IconComponent = social.Icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#00ffff] hover:scale-105 transition-transform duration-300"
                    title={`Visit our ${social.name}`}
                  >
                    <IconComponent size={28} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ====== Footer Sections ====== */}
          {footerSections.map((section, index) => {
            const SectionIcon = section.Icon;
            return (
              <div
                key={index}
                ref={(el) => (linkRefs.current[index] = el)}
                className="col-span-1"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2 border-b border-gray-700 pb-2">
                  <SectionIcon className="text-[#00ffff] w-4 h-4" />
                  <span>{section.title}</span>
                </h3>
                <ul className="space-y-1">
                  {section.links.map((link, linkIndex) => {
                    const LinkIcon = link.Icon;
                    return (
                      <li key={linkIndex}>
                        <a
                          href={link.path}
                          target={link.external ? "_blank" : "_self"}
                          rel={
                            link.external ? "noopener noreferrer" : undefined
                          }
                          className={linkClasses}
                          title={link.name}
                        >
                          {LinkIcon && (
                            <LinkIcon className="mr-3 w-4 h-4 text-[#00ffff]" />
                          )}
                          {link.name}
                          {link.external && (
                            <ExternalLink className="ml-2 w-4 h-3 text-gray-500" />
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* ====== Bottom Line ====== */}
        <div className="mt-16 border-t border-gray-800"></div>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left text-sm text-gray-500">
          <p>
            &copy; {currentYear} CICO. All rights reserved.
          </p>
          <p className="mt-4 md:mt-0">
            Built with 💙 by{" "}
            <Link
              to="https://alrifatsabbir.netlify.app"
              target="_blank"
              className="text-[#00ffff] hover:underline font-medium"
            >
              AL RIFAT SABBIR
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;