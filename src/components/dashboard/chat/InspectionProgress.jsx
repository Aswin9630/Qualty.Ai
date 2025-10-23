import React from "react";

const stages = ["Start", "Analysis", "Report", "Completed"];

export default function InspectionProgress({
  progressLevel,
  isInspector,
  onAdvanceStage,
}) {
  return (
    <aside className="w-full sm:w-[400px] bg-white p-4 sm:p-8 rounded-xl shadow-md flex flex-col relative">
      <h2 className="text-base sm:text-lg font-semibold mb-6 sm:mb-8 tracking-wide text-center">
        Inspection Progress
      </h2>

      <div className="flex flex-col sm:pl-6 relative">
        {stages.map((label, index) => {
          const isCompleted = progressLevel > index;
          const isCurrent = progressLevel === index;

          const status = isCompleted
            ? "Completed"
            : isCurrent
            ? "In Progress"
            : "Pending";

          return (
            <div key={label} className="relative flex flex-col">
              {index < stages.length - 1 && (
                <div
                  className="absolute left-[19px] top-[40px] w-[2px] h-[60px] rounded-full"
                  style={{
                    backgroundColor:
                      progressLevel > index ? "rgb(15 23 42)" : "rgb(226 232 240)",
                  }}
                />
              )}

              <div className="flex items-start mb-6">
                <div
                  className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full z-10
                    ${
                      isCompleted
                        ? "bg-slate-900 text-white"
                        : isCurrent
                        ? "border-2 border-slate-900 text-slate-900 bg-white"
                        : "border-2 border-slate-200 text-slate-400 bg-white"
                    }`}
                >
                  {isCompleted ? (
                    <svg
                      viewBox="0 0 16 16"
                      className="bi bi-check-lg"
                      fill="currentColor"
                      height={16}
                      width={16}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>

                <div className="ml-3 sm:ml-4 flex flex-col">
                  <div
                    className={`text-sm sm:text-base font-semibold ${
                      isCompleted || isCurrent
                        ? "text-slate-900"
                        : "text-slate-400"
                    }`}
                  >
                    {label}
                  </div>
                  <div
                    className={`inline-block text-xs sm:text-sm rounded-full px-1 sm:px-2 py-[2px] mt-1
                      ${
                        isCompleted
                          ? "bg-green-100 text-green-700"
                          : isCurrent
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                  >
                    {status}
                  </div>

                  {isInspector && isCurrent && index < stages.length && (
                    <button
                      onClick={() => onAdvanceStage(index)}
                      className="mt-2 px-3 py-1 text-xs rounded-md border border-black text-black hover:bg-gray-100 transition w-fit"
                    >
                      {index === stages.length - 1 ? "Mark Completed" : "Finish"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

