import React, { useRef, useState } from "react";
import Joyride, { STATUS } from "react-joyride";
import {
  FiPaperclip,
  FiSend,
  FiX,
  FiPhone,
  FiUserPlus,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import InspectionProgress from "../../../../components/dashboard/chat/InspectionProgress";

export default function ChatUI({ onTourFinish }) {
  const scrollRef = useRef(null);
  const [progressOpen, setProgressOpen] = useState(false);

  const [messages, setMessages] = useState([
    { id: 1, sender: "other", text: "Inspection started", time: "10:30 AM" },
    { id: 2, sender: "me", text: "Okay, noted 👍", time: "10:31 AM" },
  ]);

  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const steps = [
    {
      target: ".chat-header", 
      content: "This is your chat area. You can send messages or check progress here.",
      placement: "right",
      disableBeacon: true,
    },
  ];

  const [runTour, setRunTour] = useState(true);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false);
      if (onTourFinish) onTourFinish();
    }
  };

  // ========================== SEND MESSAGE ==========================
  const sendMessage = () => {
    if (!input && !file) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "me", text: input || "📎 File sent", time: "Now" },
    ]);
    setInput("");
    setFile(null);
    setPreview(null);
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* ===== JOYRIDE ===== */}
      <Joyride
        steps={steps}
        run={runTour}
        continuous={false}
        showProgress={false}
        showSkipButton={false}
        disableScrolling={true}
        scrollToFirstStep={true}
        styles={{
          options: { primaryColor: "#000", zIndex: 10000, overlayColor: "transparent" },
          tooltip: {
            fontSize: "0.75rem",
            padding: "10px 14px",
            borderRadius: "6px",
            maxWidth: "220px",
          },
          buttonNext: { display: "none" },
          buttonBack: { display: "none" },
          buttonClose: { display: "none" },
          buttonSkip: { display: "none" },
          buttonFinish: {
            backgroundColor: "#000",
            color: "#fff",
            padding: "4px 10px",
            borderRadius: "4px",
            fontSize: "0.7rem",
          },
        }}
        locale={{ last: "Got it" }} // simpler button text
        callback={handleJoyrideCallback}
      />

      <div className="origin-center scale-[0.9] w-full h-full max-w-[1280px] bg-white shadow-xl">
        <div className="flex flex-col lg:flex-row h-full bg-white text-black">
          <aside className="hidden lg:block w-80 border-r bg-white inspection-progress">
            <div className="p-4">
              <InspectionProgress progressLevel={1} />
            </div>
          </aside>

          <main className="flex-1 flex flex-col relative">
            <div className="chat-header sticky top-0 z-40 h-[64px] border-b bg-white px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">A</div>
                <div>
                  <div className="font-semibold">Inspector</div>
                  <div className="text-xs text-green-600">Active now</div>
                </div>
              </div>

              <div className="flex gap-3 origin-right scale-[0.7]">
                <button
                  onClick={() => setProgressOpen(!progressOpen)}
                  className="progress-toggle border px-2 py-1 rounded flex items-center gap-1"
                >
                  {progressOpen ? <FiChevronUp /> : <FiChevronDown />} Progress
                </button>
                <button className="border px-2 py-1 rounded"><FiPhone /></button>
                <button className="border px-2 py-1 rounded"><FiUserPlus /></button>
              </div>
            </div>

            {progressOpen && (
              <div className="lg:hidden sticky top-[64px] bg-white border-b p-3 z-30 inspection-progress">
                <InspectionProgress progressLevel={1} />
              </div>
            )}

            <div className="chat-area flex-1 overflow-y-auto bg-gray-50 px-4 py-4">
              <div ref={scrollRef} className="space-y-4 pb-[88px]">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div className={`${m.sender === "me" ? "bg-black text-white" : "bg-white border"} px-4 py-2 rounded-lg max-w-[70%]`}>
                      <div>{m.text}</div>
                      <div className="text-xs opacity-60 mt-1 text-right">{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t px-4 py-3">
              {file && (
                <div className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded mb-2">
                  {preview ? <img src={preview} className="h-12 rounded" /> : <span>{file.name}</span>}
                  <button onClick={() => { setFile(null); setPreview(null); }}><FiX /></button>
                </div>
              )}

              <div className="flex gap-2 items-center">
                <label className="attach-btn cursor-pointer">
                  <FiPaperclip />
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      const f = e.target.files[0];
                      if (!f) return;
                      setFile(f);
                      if (f.type.startsWith("image/")) setPreview(URL.createObjectURL(f));
                    }}
                  />
                </label>

                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message..."
                  className="message-input flex-1 border rounded px-4 py-2"
                />

                <button onClick={sendMessage} className="send-btn bg-black text-white px-3 py-2 rounded">
                  <FiSend />
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
