import React from "react";
import CardNav from "../components/CardNav";
import logo from "../assets/CICo-nr.png";

const Navbar = () => {
  const items = [
    // 🌙 Left side buttons
    {
      label: "Calendar",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Calender", ariaLabel: "Calendar Page", path: "/calendar" },
        { label: "Bangla Calendar", ariaLabel: "Calendar Page", path: "/calendar/bangla" },
        { label: "Arabic Calendar", ariaLabel: "Calendar Page", path: "/calendar/arabic" },
        { label: "Chinese Calendar", ariaLabel: "Calendar Page", path: "/calendar/chinese" },
      ],
    },
    {
      label: "Calculator",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Basic", ariaLabel: "Basic Calculator", path: "/calculator" },
        { label: "Advanced", ariaLabel: "Advanced Calculator", path: "/calculator/advanced" },
        { label: "BMI Calculator", ariaLabel: "BMI Calculator", path: "/calculator/bmi" },
        { label: "Currency Converter", ariaLabel: "Currency Converter", path: "/calculator/currency-converter" },
      ],
    },
    // ☀️ Right side buttons
    {
      label: "Clock",
      bgColor: "#1A1028",
      textColor: "#fff",
      links: [
        { label: "View Clock", ariaLabel: "Clock Page", path: "/clock" },
        { label: "World Clock", ariaLabel: "World Clock Page", path: "/clock/world" },
        { label: "Alarm", ariaLabel: "Alarm Page", path: "/clock/alarm" },
        { label: "Stopwatch", ariaLabel: "Stopwatch Page", path: "/clock/stopwatch" },
      ],
    },
    {
      label: "Websites",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Visit Web Tools", ariaLabel: "Website Tools", path: "https://alrifatsabbir.netlify.app/skills" },
        { label: "Resources", ariaLabel: "Useful Web Resources", path: "https://alrifatsabbir.netlify.app/projects" },
        { label: "Blogs", ariaLabel: "Blogs Page", path: "https://alrifatsabbir.netlify.app/blog" },
        { label: "Portfolio", ariaLabel: "Portfolio Page", path: "https://alrifatsabbir.netlify.app" },
      ],
    },
  ];

  return (
    <CardNav
      logo={logo}
      logoAlt="CICO Tools"
      items={items}
      baseColor="#060010"
      menuColor="#00ffff"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
      hoverEffect={{
        scale: 1.15,
        color: "#00ffff",
        textShadow: "0 0 8px #00ffff",
      }}
      responsive
    />
  );
};

export default Navbar;
