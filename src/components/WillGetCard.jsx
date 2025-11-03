import React from "react";
import step1 from "../assets/step1.png";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.png";

const values = [
  {
    steps: 1,
    title: "Raise an Inspection Query",
    description:
      "Create your inspection requirements with budget and timeline specifications on our platform.",
    image: step1,
  },
  {
    steps: 2,
    title: "Choose the Best Quote",
    description:
      "Compare multiple quotes from verified global inspectors and select the best fit for your needs.",
    image: step2,
  },
  {
    steps: 3,
    title: "Track Your Global Inspection",
    description:
      "Engage directly with your assigned inspector for real-time updates and clarifications.",
    image: step3,
  },
];

export default function ProgressCard() {
  return (
    <section className="py-12 px-4 sm:px-6 md:px-12 bg-white text-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {values.map((step, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden  transition-all duration-500 bg-white"
          >
            <div className="p-4 text-center">
              <p className="text-lg font-medium text-gray-500 mb-1">
                Step {step.steps}
              </p>
              <h3 className="text-lg sm:text-xl font-semibold text-black">
                {step.title}
              </h3>
            </div>
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
