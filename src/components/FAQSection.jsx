import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    title: "What is Qualty AI?",
    description:
      "Qualty AI is a global inspection marketplace connecting traders with certified inspectors worldwide.",
  },
  {
    title: "How do I raise an inspection request?",
    description:
      "Simply create an enquiry with your inspection details, budget, and timeline on our platform.",
  },
  {
    title: "Can I compare quotes from multiple inspectors?",
    description:
      "Yes, you’ll receive competitive bids from verified inspectors and can choose the best fit.",
  },
  {
    title: "Is real-time tracking available?",
    description:
      "Absolutely. You can monitor inspection progress with live updates and transparent reporting.",
  },
  {
    title: "Which countries are supported?",
    description:
      "We currently support inspections across 30+ countries and are expanding rapidly.",
  },
  {
    title: "Is support available 24/7?",
    description:
      "Yes, our platform offers round-the-clock support to ensure smooth inspection workflows.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 sm:px-6 md:px-12 bg-white text-black">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10"  style={{ backgroundImage: "linear-gradient(90deg, #ff7a18 0%, #af00ff 100%)", WebkitBackgroundClip: "text", color: "transparent" }}>
        Frequently Asked Questions
      </h2>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-gray-200 rounded-lg transition-all duration-300 bg-white"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 text-left focus:outline-none cursor-pointer"
              >
                <span className="text-base sm:text-lg font-medium">
                  {faq.title}
                </span>
                {isOpen ? (
                  <Minus size={20} className="text-gray-500" />
                ) : (
                  <Plus size={20} className="text-gray-500" />
                )}
              </button>

              <div
                className={`px-4 sm:px-6 pb-4 text-sm sm:text-base text-gray-600 transition-all duration-500 ease-in-out ${
                  isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {faq.description}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
