import React from "react";
import { SlidingNumber } from "./sliding-number"; // adjust the path

const statsData = [
  { label: "Active Users", value: 1700 },
  { label: "Active Tools", value: 12 },
  { label: "Blog Articles", value: 6 },
  { label: "Community Members", value: 190 },
];

const StatsSection = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <div className="grid overflow-hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-black/40 rounded-xl py-6 border border-purple-700/30 transition-transform transform hover:border-purple-600 duration-300"
          >
            <h3 className="text-sm sm:text-base md:text-base font-medium tracking-wide text-gray-300 text-center">
              {item.label}
            </h3>
            <SlidingNumber
              from={0}
              to={item.value}
              duration={1}
              digitHeight={40}
              className="text-2xl sm:text-3xl md:text-3xl font-bold text-purple-400 mt-2 text-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;