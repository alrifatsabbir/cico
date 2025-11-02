import React, { useState } from "react";

const faqData = [
  {
    question: "What is this platform about?",
    answer: "This platform provides free tools and resources for productivity, learning, and entertainment without any signup or payment required.",
  },
  {
    question: "Do I need to create an account to use the tools?",
    answer: "No, all tools are completely free to use and do not require creating an account.",
  },
  {
    question: "Are there any hidden charges?",
    answer: "Absolutely not. All the features and tools available here are free of charge.",
  },
  {
    question: "Can I use these tools on mobile devices?",
    answer: "Yes, all tools are responsive and can be used on mobile phones, tablets, and desktops.",
  },
  {
    question: "Is my data safe while using the tools?",
    answer: "Yes, we do not store any personal data. All operations are done locally in your browser whenever possible.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center py-16 px-4 sm:px-6 md:px-8"
      style={{
        background: "#020617",
        backgroundImage: `
          linear-gradient(to right, rgba(61,85,105,0.3) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)`,
        backgroundSize: "32px 32px, 32px 32px, 100% 100%",
      }}
    >
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl font-bold overflow-hidden text-purple-300 text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`border border-purple-700/30 rounded-xl bg-black/40 overflow-hidden transition-all duration-500 cursor-pointer`}
            >
              <div
                className="p-4 flex justify-between items-center "
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-lg font-semibold text-purple-400">{item.question}</h3>
                <span className="text-purple-400 text-2xl font-bold ">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </div>

              <div
                className={`overflow-hidden px-4 pb-0 text-gray-300 transition-all duration-500 ${
                  activeIndex === index ? "max-h-96 mt-2 pb-4" : "max-h-0"
                }`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
