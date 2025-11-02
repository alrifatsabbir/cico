import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ToolsSection = () => {
  const [activeTab, setActiveTab] = useState("Calendar");
  const navigate = useNavigate();

  const tabs = ["Calendar", "Calculator", "Clock"];

  // Each tool now has title, description, and path
  const toolsContent = {
    Calendar: [
      { title: "Calendar", desc: "View monthly calendar. This is modern and minimalistic Calendar.", path: "/calendar" },
      { title: "Bangla Calendar", desc: "Check Bengali dates. This is modern calendar.", path: "/calendar/bangla" },
      { title: "Arabic Calendar", desc: "Check Hijri dates. This is modern calendar.", path: "/calendar/arabic" },
      { title: "Chinese Calendar", desc: "Check Chinese dates. This is modern calendar.", path: "/calendar/chinese" },
    ],
    Calculator: [
      { title: "Basic", desc: "Simple arithmetic calculator for simple maths.", path: "/calculator" },
      { title: "Advanced", desc: "Scientific calculator for scientific calculation.", path: "/calculator/advanced" },
      { title: "BMI Calculator", desc: "Check your BMI using this BMI calculator.", path: "/calculator/bmi" },
      { title: "Currency Converter", desc: "Convert currencies using this currency converter you will get updated value.", path: "/calculator/currency-converter" },
    ],
    Clock: [
      { title: "View Clock", desc: "Check your local time. Here you can check your local time.", path: "/clock" },
      { title: "World Clock", desc: "Check time globally. You will get to know your global time using this.", path: "/clock/world" },
      { title: "Alarm", desc: "Set small alarms to boost your work ethics.", path: "/clock/alarm" },
      { title: "Stopwatch", desc: "Track your time for focusing on your task.", path: "/clock/stopwatch" },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto my-12 px-4 sm:px-6 md:px-8">
      <h2 className="text-5xl font-bold text-green-500 text-center mb-8 overflow-hidden">
        Our Tools
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-6 space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold rounded-full transition ${
              activeTab === tab
                ? "bg-green-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {toolsContent[activeTab].map((tool, index) => (
          <div
            key={index}
            onClick={() => navigate(tool.path)}
            className="bg-black/40 border border-green-700/30 rounded-xl p-6 flex flex-col items-start hover:border-green-300 hover:border-1 transition cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-green-400 mb-2">{tool.title}</h3>
            <p className="text-gray-300 text-sm">{tool.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsSection;
