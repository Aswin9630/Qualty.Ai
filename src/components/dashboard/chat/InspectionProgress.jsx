import React from "react";

const stages = ["Start", "Analysis", "Report", "Completed"];

export default function InspectionProgress({
  progressLevel = 0,
  isInspector = false,
  stageStatuses = [],
  onAdvanceStage,
  onAcceptStage,
  onRejectStage,
}) {
  const getStageObj = (index) =>
    (stageStatuses && stageStatuses.find((s) => s.stageIndex === index)) || {
      stageIndex: index,
      status: "pending",
    };

  return (
    <aside className="w-full sm:w-[400px] bg-white p-4 sm:p-8 rounded-xl shadow-md flex flex-col relative">
      <h2 className="text-base sm:text-lg font-semibold mb-6 sm:mb-8 tracking-wide text-center">
        Inspection Progress
      </h2>

      <div className="flex flex-col sm:pl-6 relative">
        {stages.map((label, index) => {
          const stage = getStageObj(index);
          const status = stage.status || "pending";
          const isCompleted = status === "completed";
          const isPendingCustomer = status === "pending_customer";
          const isInProgress = status === "in_progress";
          const isRejected = status === "rejected";
          const isCurrent = progressLevel === index;

          // Decide badge label and style: hide "Pending Customer" for customer view
          const badgeLabel = (() => {
            if (isCompleted) return "Completed";
            if (isPendingCustomer) return isInspector ? "Pending Customer" : "In Progress";
            if (isRejected) return "Rejected";
            if (isInProgress) return "In Progress";
            return "Pending";
          })();

          const badgeClass = (() => {
            if (isCompleted) return "bg-green-100 text-green-700";
            if (isPendingCustomer) return isInspector ? "bg-yellow-100 text-yellow-800" : "bg-slate-100 text-slate-500";
            if (isRejected) return "bg-red-100 text-red-700";
            if (isInProgress) return "bg-blue-100 text-blue-700";
            return "bg-slate-100 text-slate-500";
          })();

          return (
            <div key={index} className="relative flex flex-col">
              {index < stages.length - 1 && (
                <div
                  className="absolute left-[19px] top-[40px] w-[2px] h-[60px] rounded-full"
                  style={{
                    backgroundColor:
                      (index < progressLevel) || isCompleted
                        ? "rgb(15 23 42)"
                        : "rgb(226 232 240)",
                  }}
                />
              )}

              <div className="flex items-start mb-6">
                <div
                  className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full z-10
                    ${
                      isCompleted
                        ? "bg-slate-900 text-white"
                        : isCurrent && isInProgress
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
                      isCompleted || isCurrent ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    {label}
                  </div>

                  <div
                    className={`inline-block text-xs sm:text-sm rounded-full px-1 sm:px-2 py-[2px] mt-1 ${badgeClass}`}
                  >
                    {badgeLabel}
                  </div>

                  {stage.rejectionReason && (
                    <div className="text-xs text-red-600 mt-1">Reason: {stage.rejectionReason}</div>
                  )}

                  <div className="mt-2">
                    {/* Inspector controls: only when this is the current stage AND it's not already completed */}
                    {isInspector && isCurrent && !isCompleted && (
                      <button
                        onClick={() => onAdvanceStage && onAdvanceStage(index)}
                        className="px-3 py-1 text-xs rounded-md border border-black text-black hover:bg-gray-100 transition"
                      >
                        {index === stages.length - 1 ? "Mark Completed" : "Finish (send for approval)"}
                      </button>
                    )}

                    {/* Customer controls: visible only when stage is pending_customer and current */}
                    {!isInspector && isPendingCustomer && isCurrent && (
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => onAcceptStage && onAcceptStage(index)}
                            className="px-3 py-1 text-xs rounded-md bg-green-600 text-white hover:bg-green-700 transition"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => {
                              const reason = prompt("Reason for rejection (optional):", "");
                              onRejectStage && onRejectStage(index, reason || "No reason provided");
                            }}
                            className="px-3 py-1 text-xs rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                          >
                            Reject
                          </button>
                        </div>

                        <div className="text-xs text-yellow-800 bg-yellow-50 px-2 py-1 rounded">
                          Waiting for your approval — Accept or Reject to proceed
                        </div>
                      </div>
                    )}

                    {isRejected && isInspector && (
                      <div className="text-xs text-red-600 mt-1">Rejected by customer — revise and Finish again</div>
                    )}

                    {isRejected && !isInspector && (
                      <div className="text-xs text-red-600 mt-1">Rejected — please discuss with inspector</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
