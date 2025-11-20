import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../../utils/socket";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../../utils/constants";
import { FiPaperclip, FiSend, FiX } from "react-icons/fi";
import InspectionProgress from "./InspectionProgress";
import { setProgressMap } from "../../../redux/slice/inspectionProgressSlice";

function genTempId() {
  return `t-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function Chat() {
  const { targetId, orderId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stageStatuses, setStageStatuses] = useState([]);
  const [progressLevel, setProgressLevel] = useState(0);
  const [modalImage, setModalImage] = useState(null);

  const socketRef = useRef(null);
  const scrollRef = useRef(null);
  const user = useSelector((store) => store?.user?.user) || {};
  const { name = "", role = "" } = user;
  const userId = user?._id;
  const dispatch = useDispatch();

  const upsertStage = (newStage) => {
    setStageStatuses((prev = []) => {
      const copy = [...prev];
      const idx = copy.findIndex((s) => s.stageIndex === newStage.stageIndex);
      if (idx === -1) copy.push(newStage);
      else copy[idx] = { ...copy[idx], ...newStage };
      copy.sort((a, b) => a.stageIndex - b.stageIndex);
      return copy;
    });
  };

  const updateProgressMapRedux = (orderIdKey, level) => {
    try {
      dispatch(setProgressMap({ [orderIdKey]: level }));
    } catch (err) {
      console.error("Failed to update progress map redux:", err);
    }
  };

  useEffect(() => {
    if (!userId || !targetId || !orderId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", { name, userId, targetId, orderId, role });

    socket.on("progressState", (data) => {
      if (!data) return;
      setProgressLevel(data.progressLevel ?? 0);
      if (Array.isArray(data.stages)) setStageStatuses(data.stages);
      const levelForRedux = computeCanonicalProgressLevel(data.stages, data.progressLevel);
      updateProgressMapRedux(orderId, levelForRedux);
    });

    socket.on("stagePendingCustomer", ({ stageIndex, stage }) => {
      upsertStage(stage || { stageIndex, status: "pending_customer" });
      setProgressLevel((p) => Math.min(p, stageIndex));
      updateProgressMapRedux(orderId, 1);
    });

    socket.on("stageAccepted", ({ stageIndex, stage, progressLevel: newLevel }) => {
      upsertStage(stage || { stageIndex, status: "completed" });
      if (typeof newLevel === "number") setProgressLevel(newLevel);
      else setProgressLevel((pl) => Math.max(pl, stageIndex + 1));
      const merged = mergeStageIntoLocal(stage || { stageIndex, status: "completed" });
      const levelForRedux = computeCanonicalProgressLevel(merged);
      updateProgressMapRedux(orderId, levelForRedux);
    });

    socket.on("stageRejected", ({ stageIndex, stage }) => {
      upsertStage(stage || { stageIndex, status: "in_progress" });
      setProgressLevel((pl) => Math.min(pl, stageIndex));
      updateProgressMapRedux(orderId, 1);
    });

    socket.on("messageReceived", (msg) => {
      try {
        if (msg?.messageType === "system" && msg?.audience) {
          const aud = String(msg.audience);
          if (aud !== "all" && aud !== role) {
            return;
          }
        }

        setMessages((prev) => {
          const tempId = msg?.tempId;
          const serverId = msg?._id;

          if (tempId) {
            const idx = prev.findIndex((m) => m.tempId === tempId);
            if (idx !== -1) {
              const copy = prev.slice();
              copy[idx] = {
                _id: serverId,
                sender: msg.senderId,
                name: copy[idx].name || "",
                text: msg.text,
                fileUrl: msg.fileUrl,
                fileType: msg.fileType,
                originalName: msg.originalName,
                sentAt: msg.sentAt || new Date().toISOString(),
                pending: false,
                role: msg.role,
                messageType: msg.messageType,
                audience: msg.audience,
                tempId: null,
              };
              return copy;
            }
          }

          if (serverId && prev.some((m) => m._id && String(m._id) === String(serverId))) {
            return prev;
          }

          const newMsg = {
            _id: serverId,
            sender: msg.senderId,
            name: "",
            text: msg.text,
            fileUrl: msg.fileUrl,
            fileType: msg.fileType,
            originalName: msg.originalName,
            sentAt: msg.sentAt || new Date().toISOString(),
            pending: false,
            role: msg.role,
            messageType: msg.messageType,
            audience: msg.audience,
            tempId: msg.tempId || null,
          };
          return [...prev, newMsg];
        });
      } catch (err) {
        console.error("messageReceived handler error:", err);
      }
    });

    socket.on("progressUpdated", ({ level }) => {
      if (typeof level === "number") {
        setProgressLevel(level);
        const canonical = level >= (stageStatuses?.length - 1 || 3) ? 4 : level > 0 ? 1 : 0;
        updateProgressMapRedux(orderId, canonical);
      }
    });

    socket.on("error", (err) => {
      const text = err?.message || "An error occurred";
      // show non-chat UI if desired; do not append duplicate system chat lines here
      console.error("Socket error:", text);
    });

    return () => {
      try {
        socket.off("progressState");
        socket.off("stagePendingCustomer");
        socket.off("stageAccepted");
        socket.off("stageRejected");
        socket.off("messageReceived");
        socket.off("progressUpdated");
        socket.off("error");
        socket.disconnect();
      } catch (e) {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, targetId, orderId, name, role]);

  const mergeStageIntoLocal = (incomingStage) => {
    const local = (stageStatuses || []).slice();
    const idx = local.findIndex((s) => s.stageIndex === incomingStage.stageIndex);
    if (idx === -1) local.push(incomingStage);
    else local[idx] = { ...local[idx], ...incomingStage };
    local.sort((a, b) => a.stageIndex - b.stageIndex);
    return local;
  };

  const computeCanonicalProgressLevel = (stagesInput, fallbackProgressLevel = 0) => {
    if (!Array.isArray(stagesInput)) {
      if (fallbackProgressLevel >= 3) return 4;
      if (fallbackProgressLevel > 0) return 1;
      return 0;
    }
    const allCompleted = stagesInput.every((s) => s.status === "completed");
    if (allCompleted) return 4;
    const anyStarted = stagesInput.some((s) => ["in_progress", "pending_customer", "rejected", "completed"].includes(s.status));
    if (anyStarted) return 1;
    return 0;
  };

  useEffect(() => {
    if (!orderId) return;
    let mounted = true;
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${BASE_URL}/chat/history/${orderId}`, { credentials: "include" });
        const data = await res.json();
        if (mounted && data.success) {
          const normalized = data.messages
            .filter((m) => {
              if (m.messageType === "system" && m.audience) {
                return m.audience === "all" || m.audience === role;
              }
              return true;
            })
            .map((msg) => ({
              _id: msg._id,
              sender: msg.sender?.refId,
              name: "",
              text: msg.text,
              fileUrl: msg.fileUrl,
              fileType: msg.fileType,
              originalName: msg.originalName,
              sentAt: msg.sentAt,
              role: msg.sender?.role,
              messageType: msg.messageType,
              audience: msg.audience,
            }));
          setMessages(normalized);
        }
      } catch (err) {
        console.error("Failed to fetch chat history:", err);
      }
    };
    fetchHistory();
    return () => {
      mounted = false;
    };
  }, [orderId, role]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (loading || !socketRef.current) return;
    if (!input.trim() && !file) return;
    setLoading(true);
    const tempId = genTempId();

    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("role", role);
        formData.append("refId", userId);

        const res = await fetch(`${BASE_URL}/chat/upload/${orderId}`, {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        const data = await res.json();
        if (!(data && data.success && data.message)) {
          console.error("Upload response error", data);
          setLoading(false);
          return;
        }

        const { fileUrl, fileType, originalName } = data.message;

        const optimistic = {
          tempId,
          sender: userId,
          name,
          text: input || `📎 ${originalName}`,
          fileUrl,
          fileType,
          originalName,
          pending: true,
          sentAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, optimistic]);

        socketRef.current.emit("sendMessage", {
          name,
          userId,
          targetId,
          orderId,
          role,
          text: input || `📎 ${originalName}`,
          fileUrl,
          fileType,
          originalName,
          tempId,
        });

        setFile(null);
        setPreviewUrl(null);
        setInput("");
      } else {
        const optimistic = {
          tempId,
          sender: userId,
          name,
          text: input,
          pending: true,
          sentAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, optimistic]);

        socketRef.current.emit("sendMessage", {
          name,
          userId,
          targetId,
          orderId,
          role,
          text: input,
          tempId,
        });

        setInput("");
      }
    } catch (err) {
      console.error("Send error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    if (selected.type.startsWith("image/")) setPreviewUrl(URL.createObjectURL(selected));
    else setPreviewUrl(null);
  };

  const clearFile = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleAdvance = (stageIndex) => {
    if (!socketRef.current) return;
    const stage = (stageStatuses || []).find((s) => s.stageIndex === stageIndex) || { status: "pending" };
    if (stage.status === "pending_customer") {
      return;
    }

    socketRef.current.emit("inspectorFinishStage", { orderId, stageIndex, inspectorId: userId });
    upsertStage({ stageIndex, status: "pending_customer", inspectorFinishedAt: new Date().toISOString() });
    updateProgressMapRedux(orderId, 1);
  };

  const handleAccept = (stageIndex) => {
    if (!socketRef.current) return;
    socketRef.current.emit("customerAcceptStage", { orderId, stageIndex, customerId: userId });
    upsertStage({ stageIndex, status: "completed", customerAcceptedAt: new Date().toISOString() });
    const localAfter = mergeStageIntoLocal({ stageIndex, status: "completed" });
    const canonical = computeCanonicalProgressLevel(localAfter);
    updateProgressMapRedux(orderId, canonical);
  };

  const handleReject = (stageIndex, reason) => {
    if (!socketRef.current) return;
    socketRef.current.emit("customerRejectStage", { orderId, stageIndex, reason, customerId: userId });
    upsertStage({ stageIndex, status: "in_progress", customerRejectedAt: new Date().toISOString(), rejectionReason: reason || "No reason provided" });
    updateProgressMapRedux(orderId, 1);
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-white text-black font-sans">
      <div className="w-full sm:w-[360px] sm:flex-shrink-0 border-r border-gray-100">
        <InspectionProgress
          progressLevel={progressLevel}
          isInspector={role === "inspector"}
          stageStatuses={stageStatuses}
          onAdvanceStage={handleAdvance}
          onAcceptStage={(idx) => { handleAccept(idx); }}
          onRejectStage={(idx, reason) => {
            let r = reason;
            if (!r) r = prompt("Reason for rejection (optional):", "") || "No reason provided";
            handleReject(idx, r);
          }}
        />
      </div>

      <main className="flex-1 flex flex-col relative">
        <div className="border-b border-gray-200 px-4 sm:px-6 py-3">
          <h1 className="text-lg sm:text-xl font-semibold">Live Chat</h1>
        </div>

        {modalImage && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setModalImage(null)}>
            <div className="relative max-w-[95%] max-h-[95%]">
              <button onClick={() => setModalImage(null)} className="absolute top-2 right-2 text-white bg-black bg-opacity-30 rounded-full p-2"><FiX /></button>
              <img src={modalImage} alt="Preview" className="w-auto h-auto max-w-[90vw] max-h-[80vh] rounded shadow-lg mx-auto object-contain" />
            </div>
          </div>
        )}

        <div className="flex-1 bg-gray-100 px-3 sm:px-6 py-4 overflow-hidden">
          <div ref={scrollRef} className="h-full overflow-y-auto pr-2 space-y-4 flex flex-col" style={{ paddingBottom: 140 }}>
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 text-sm mt-10">No messages yet. Start the conversation.</div>
            ) : (
              messages.map((msg, i) => {
                const isSelf = msg.sender && userId && String(msg.sender) === String(userId);
                const isSystem = msg.role === "system" || msg.messageType === "system";
                return (
                  <div key={msg._id || msg.tempId || i} className={`w-fit max-w-[85%] sm:max-w-[70%] px-4 py-2 rounded-lg shadow-sm break-words ${isSystem ? "mx-auto bg-gray-300 text-gray-900" : isSelf ? "ml-auto bg-black text-white" : "mr-auto bg-gray-500 text-white"}`}>
                    {msg.text && <div>{msg.text}</div>}

                    {msg.fileUrl && msg.fileType?.startsWith("image/") && (
                      <img src={msg.fileUrl} alt={msg.originalName || "image"} className="mt-2 rounded max-w-[200px] max-h-[150px] object-cover cursor-pointer hover:opacity-90 transition" onClick={() => setModalImage(msg.fileUrl)} />
                    )}

                    {msg.fileUrl && !msg.fileType?.startsWith("image/") && (
                      <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className="underline mt-2 block text-sm">{msg.originalName || "Download file"}</a>
                    )}

                    {msg.pending && <div className="text-xs mt-1 text-gray-200 italic">Sending…</div>}

                    {msg.sentAt && (
                      <div className={`text-xs mt-1 ${isSelf ? "text-gray-400" : "text-gray-100"}`}>
                        {new Date(msg.sentAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="w-full">
          <div className="sm:static fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-3 sm:px-6 py-3 z-30">
            <div className="max-w-6xl mx-auto">
              {file && (
                <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded mb-2">
                  <div className="text-sm text-gray-700">
                    {previewUrl ? <img src={previewUrl} alt="preview" className="h-12 rounded" /> : file.name}
                  </div>
                  <button onClick={clearFile} className="text-gray-500 hover:text-black"><FiX size={18} /></button>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input type="file" id="fileUpload" onChange={handleFileSelect} disabled={loading} className="hidden" accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
                <label htmlFor="fileUpload" className={`cursor-pointer ${loading ? "opacity-50 pointer-events-none" : "text-gray-600 hover:text-black"}`} title="Attach file"><FiPaperclip size={20} /></label>

                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." disabled={loading} className={`flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black ${loading ? "bg-gray-100 cursor-not-allowed" : ""}`} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }} />

                <button onClick={handleSend} disabled={loading} className={`text-white px-3 py-2 rounded-md transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-900"}`} title="Send message">
                  {loading ? <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mx-auto" /> : <FiSend size={20} />}
                </button>
              </div>
            </div>
          </div>
          <div className="hidden sm:block" style={{ height: 0 }} />
        </div>
      </main>
    </div>
  );
}
