import React, { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";
import { BASE_URL } from "../utils/constants";

export default function SupportChatBot() {
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [formData, setFormData] = useState({ role: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      setMessages([{ from: "bot", text: "Are you an importer or exporter?" }]);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: "user", text: input }];
    let nextStep = step;

    if (step === 0) {
      setFormData({ ...formData, role: input.trim().toLowerCase() });
      newMessages.push({ from: "bot", text: "Great! What's your email address?" });
      nextStep = 1;
    } else if (step === 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.trim())) {
        newMessages.push({ from: "bot", text: "Please enter a valid email address." });
        setMessages(newMessages);
        setInput("");
        return;
      }
      setFormData({ ...formData, email: input.trim() });
      newMessages.push({ from: "bot", text: "Thanks! What's your mobile number (with country code)?" });
      nextStep = 2;
    } else if (step === 2) {
      const phoneRegex = /^\+[1-9]\d{7,14}$/;
      if (!phoneRegex.test(input.trim())) {
        newMessages.push({
          from: "bot",
          text: "Please enter a valid mobile number with country code (e.g. +919876543210).",
        });
        setMessages(newMessages);
        setInput("");
        return;
      }
      setFormData({ ...formData, phone: input.trim() });
      newMessages.push({ from: "bot", text: "Submitting your details…" });
      nextStep = 3;
      setInput(""); 
      handleSubmit({ ...formData, phone: input.trim() }, newMessages);
      return;
    }

    setMessages(newMessages);
    setInput("");
    setStep(nextStep);
  };

  const handleSubmit = async (dataOverride = null, messagesOverride = null) => {
    setSubmitting(true);
    try {
      const payload = dataOverride || formData;
      const res = await fetch(  `${BASE_URL}/chatBot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send");
      const newMsgs = (messagesOverride || messages).concat({
        from: "bot",
        text: "Submitted successfully! Our team will contact you.",
      });
      setMessages(newMsgs);
      setSubmitted(true); 
      setInput("");       
    } catch (err) {
      const newMsgs = (messagesOverride || messages).concat({
        from: "bot",
        text: "Something went wrong. Try again later.",
      });
      setMessages(newMsgs);
    } finally {
      setSubmitting(false);
    }
  };

  if (!visible) return null;

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed right-4 bottom-4 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 z-50 flex items-center justify-center"
      >
        <BsChatDots size={24} />
      </button>
    );
  }

  return (
    <div className="fixed right-4 bottom-4 w-72 sm:w-80 md:w-96 h-96 bg-white shadow-xl rounded-xl border border-gray-100 z-50 flex flex-col overflow-hidden">
      <div className="bg-orange-500 text-white px-4 py-2 text-sm font-semibold flex items-center justify-between">
        <span className="flex items-center gap-2"><BsChatDots /> Answer to this Question</span>
        <button onClick={() => setCollapsed(true)} className="text-white hover:text-gray-200 cursor-pointer">✕</button>
      </div>

      <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[85%] px-3 py-2 rounded-lg ${
              msg.from === "bot"
                ? "bg-gray-100 text-gray-800 self-start"
                : "bg-orange-500 text-white self-end ml-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {!submitted && step < 2 && (
        <div className="p-2 border-t flex items-center gap-2">
          <input
            type={step === 1 ? "email" : "text"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={step === 0 ? "Importer or Exporter?" : "Email"}
            className="flex-1 px-3 py-1.5 text-sm rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            disabled={submitted} 
          />
          <button
            onClick={handleSend}
            disabled={submitted}
            className="bg-orange-500 cursor-pointer text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1 hover:bg-orange-600 disabled:opacity-50"
          >
            <FiSend />
          </button>
        </div>
      )}
      {!submitted && step === 2 && (
        <div className="p-2 border-t flex items-center gap-2">
          <input
            type="tel"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="+919876543210"
            className="flex-1 px-3 py-1.5 text-sm rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            disabled={submitted} 
          />
          <button
            onClick={handleSend}
            disabled={submitted}
            className="bg-orange-500 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1 hover:bg-orange-600 disabled:opacity-50"
          >
            <FiSend />
          </button>
        </div>
      )}
    </div>
  );
}


