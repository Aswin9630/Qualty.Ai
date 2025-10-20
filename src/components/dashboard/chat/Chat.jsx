import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../utils/constants";
import { FiPaperclip, FiSend, FiX } from "react-icons/fi";
import InspectionProgress from "./InspectionProgress";

export default function Chat() {
  const { targetId, orderId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progressLevel, setProgressLevel] = useState(0);
  const socketRef = useRef(null);

  const user = useSelector((store) => store?.user?.user);
  const { name, role } = user;
  const userId = user?._id;

  useEffect(() => {
    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", { name, userId, targetId, orderId, role });

    socket.on(
      "messageReceived",
      ({ name, text, senderId, fileUrl, fileType, originalName }) => {
        setMessages((prev) => [
          ...prev,
          { sender: senderId, name, text, fileUrl, fileType, originalName },
        ]);
      }
    );

    socket.on("progressUpdated", ({ level }) => {
      setProgressLevel(level);
    });

    return () => socket.disconnect();
  }, [userId, targetId, orderId]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${BASE_URL}/chat/history/${orderId}`);
        const data = await res.json();
        if (data.success) {
          setMessages(
            data.messages.map((msg) => ({
              sender: msg.sender.refId,
              name: "",
              text: msg.text,
              fileUrl: msg.fileUrl,
              fileType: msg.fileType,
              originalName: msg.originalName,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to fetch chat history:", err);
      }
    };

    fetchHistory();
  }, [orderId]);

  useEffect(() => {
    const chatContainer = document.querySelector(".h-full");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (loading) return;

    setLoading(true);

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("role", role);
      formData.append("refId", userId);

      try {
        const res = await fetch(`${BASE_URL}/chat/upload/${orderId}`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.success) {
          const { fileUrl, fileType, originalName } = data.message;
          socketRef.current.emit("sendMessage", {
            name,
            userId,
            targetId,
            orderId,
            role,
            text: input,
            fileUrl,
            fileType,
            originalName,
          });
        }
      } catch (err) {
        console.error("Upload failed:", err);
      }

      setFile(null);
      setPreviewUrl(null);
      setInput("");
    } else if (input.trim()) {
      socketRef.current.emit("sendMessage", {
        name,
        userId,
        targetId,
        orderId,
        role,
        text: input,
      });
      setInput("");
    }

    setLoading(false);
  };

  const handleFileSelect = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      if (selected.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(selected));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="flex h-screen bg-white text-black font-sans">
      <InspectionProgress
        progressLevel={progressLevel}
        isInspector={role === "inspector"}
        onAdvanceStage={(index) => {
          const nextLevel = index + 1;
          setProgressLevel(nextLevel);
          socketRef.current.emit("progressUpdated", {
            orderId,
            level: nextLevel,
          });
        }}
      />
      <main className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-bold">Live Chat</h1>
        </div>

        <div className="flex-1 bg-gray-100 px-6 py-4 overflow-hidden">
          <div className="h-full overflow-y-auto pr-2 space-y-4 flex flex-col">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 text-sm mt-10">
                No messages yet. Start the conversation.
              </div>
            ) : (
              messages.map((msg, i) => {
                const isSelf = msg.sender === userId;
                return (
                  <div
                    key={i}
                    className={`max-w-[70%] px-4 py-2 rounded-lg shadow-sm ${
                      isSelf
                        ? "ml-auto bg-black text-white"
                        : "mr-auto bg-gray-500 text-white"
                    }`}
                  >
                    {msg.text && <div>{msg.text}</div>}
                    {msg.fileUrl && msg.fileType?.startsWith("image/") && (
                      <img
                        src={msg.fileUrl}
                        alt={msg.originalName}
                        className="mt-2 rounded max-w-[200px] max-h-[150px] object-cover"
                      />
                    )}
                    {msg.fileUrl && !msg.fileType?.startsWith("image/") && (
                      <a
                        href={msg.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline mt-2 block"
                      >
                        {msg.originalName || "Download file"}
                      </a>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex flex-col gap-2">
          {file && (
            <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded">
              <div className="text-sm text-gray-700">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="h-16 rounded"
                  />
                ) : (
                  file.name
                )}
              </div>
              <button
                onClick={clearFile}
                className="text-gray-500 hover:text-black"
              >
                <FiX size={18} />
              </button>
            </div>
          )}

          {/* Input row */}
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="fileUpload"
              onChange={handleFileSelect}
              disabled={loading}
              className="hidden"
            />
            <label
              htmlFor="fileUpload"
              className={`cursor-pointer ${
                loading
                  ? "opacity-50 pointer-events-none"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <FiPaperclip size={20} />
            </label>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              className={`flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black ${
                loading ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className={`text-white px-3 py-2 rounded-md transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-900"
              }`}
              title="Send message"
            >
              {loading ? (
                <div className="animate-spin cursor-pointer h-4 w-4 border-2 border-white border-t-transparent rounded-full mx-auto" />
              ) : (
                <FiSend size={20} />
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
