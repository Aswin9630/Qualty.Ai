import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../../utils/socket";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../../utils/constants";
import { FiPaperclip, FiSend, FiX, FiPhone, FiUserPlus, FiChevronDown, FiChevronUp } from "react-icons/fi";
import InspectionProgress from "./InspectionProgress";
import { setProgressMap } from "../../../redux/slice/inspectionProgressSlice";
import { toast } from "react-toastify";

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

  // controls whether top inspection progress is shown under header
  const [progressOpen, setProgressOpen] = useState(false);

  // opponent details
  const [opponent, setOpponent] = useState(null);

  const socketRef = useRef(null);
  const scrollRef = useRef(null);
  const seenAckRef = useRef(new Set());
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

  // fetch opponent profile to display name (fallback to targetId)
  useEffect(() => {
    if (!targetId) return;
    let mounted = true;
    const fetchOpponent = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users/${targetId}`, { credentials: "include" });
        if (!mounted) return;
        if (!res.ok) {
          setOpponent({ name: String(targetId) });
          return;
        }
        const data = await res.json();
        const u = data?.user || data?.result || null;
        if (u) setOpponent({ name: u.name || u.displayName || String(targetId) });
        else setOpponent({ name: String(targetId) });
      } catch (e) {
        console.warn("Failed to fetch opponent profile:", e);
        if (mounted) setOpponent({ name: String(targetId) });
      }
    };
    fetchOpponent();
    return () => {
      mounted = false;
    };
  }, [targetId]);

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
                seen: !!msg.seen,
                seenAt: msg.seenAt || null,
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
            seen: !!msg.seen,
            seenAt: msg.seenAt || null,
          };
          return [...prev, newMsg];
        });
      } catch (err) {
        console.error("messageReceived handler error:", err);
      }
    });

    socket.on("messageSeen", ({ messageId, messageIds, byUserId, seenAt }) => {
      if (!messageId && !Array.isArray(messageIds)) return;
      setMessages((prev) =>
        prev.map((m) => {
          if (!m) return m;
          const id = String(m._id || m.tempId);
          if (messageId && (String(m._id) === String(messageId) || String(m.tempId) === String(messageId)) && String(byUserId) !== String(userId)) {
            return { ...m, seen: true, seenAt: seenAt || new Date().toISOString() };
          }
          if (Array.isArray(messageIds) && messageIds.includes(id) && String(byUserId) !== String(userId)) {
            return { ...m, seen: true, seenAt: seenAt || new Date().toISOString() };
          }
          return m;
        })
      );
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
      console.error("Socket error:", text);
    });

    return () => {
      try {
        socket.off("progressState");
        socket.off("stagePendingCustomer");
        socket.off("stageAccepted");
        socket.off("stageRejected");
        socket.off("messageReceived");
        socket.off("messageSeen");
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

  // load history then scroll to bottom (ensures latest is visible when entering chat)
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
              seen: !!msg.seen,
              seenAt: msg.seenAt || null,
            }));
          setMessages(normalized);

          // wait for DOM to update then scroll to bottom
          requestAnimationFrame(() => {
            if (scrollRef.current) {
              scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
          });
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

  // always scroll to bottom when messages change (new message arrives / is sent)
  useEffect(() => {
    if (!scrollRef.current) return;
    // small timeout to let images/layout settle before jumping
    const id = setTimeout(() => {
      try {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      } catch (e) {}
    }, 50);
    return () => clearTimeout(id);
  }, [messages]);

  // When local user views incoming messages, notify server once per message id
  useEffect(() => {
    if (!socketRef.current || !userId || !messages || messages.length === 0) return;

    const incomingUnacked = messages.filter(
      (m) =>
        m &&
        !m.seen &&
        !m.pending &&
        m.sender &&
        String(m.sender) !== String(userId) &&
        !seenAckRef.current.has(String(m._id || m.tempId))
    );

    if (incomingUnacked.length === 0) return;

    const ids = incomingUnacked.map((m) => String(m._id || m.tempId)).filter(Boolean);
    if (ids.length === 0) return;

    ids.forEach((id) => seenAckRef.current.add(id));

    // Optimistically mark as seen locally
    setMessages((prev) =>
      prev.map((m) => {
        const id = String(m._id || m.tempId);
        if (ids.includes(id) && m.sender && String(m.sender) !== String(userId)) {
          return { ...m, seen: true, seenAt: new Date().toISOString() };
        }
        return m;
      })
    );

    socketRef.current.emit("messagesViewed", {
      orderId,
      viewerId: userId,
      messageIds: ids,
    });

    console.debug("messagesViewed emitted ->", { orderId, viewerId: userId, messageIds: ids });
  }, [messages, userId, orderId]);

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
          seen: false,
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
          seen: false,
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
    upsertStage({
      stageIndex,
      status: "in_progress",
      customerRejectedAt: new Date().toISOString(),
      rejectionReason: reason || "No reason provided",
    });
    updateProgressMapRedux(orderId, 1);
  };

  const otherName = opponent?.name || (targetId && targetId !== userId ? String(targetId) : "Assistant");
  const otherInitial = (otherName && otherName[0]) || "A";

  const handleCallClick = () => {
    toast.info("Real-time calls coming soon — this feature will be available in a future release.");
  };

  const handleAddMembersClick = () => {
    toast.info("Add members coming soon — group chat and multi-user collaboration will be supported in a future release.");
  };

  const Tick = ({ msg }) => {
    const seen = !!msg.seen;
    if (msg.pending) return null;
    if (seen) {
      return (
        <svg className="inline-block ml-2" width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M1 6L5 10L13 2" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 6L9 10L17 2" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        </svg>
      );
    } else {
      return (
        <svg className="inline-block ml-2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M1 6L4.2 9L11 2" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
  };

  // layout sizes (used to compute scroll area)
  const HEADER_HEIGHT = 64; // px
  const PROGRESS_HEIGHT = 160; // px when progressOpen === true (adjust to match InspectionProgress rendered height)
  const INPUT_HEIGHT = 88; // px (input bar + preview area on mobile)

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white text-black font-sans">
      {/* Sidebar: Inspection progress (visible on large screens only) */}
      <aside className="hidden lg:block w-80 lg:w-96 border-r border-gray-100 bg-white z-10">
        <div className="px-3 md:px-4 py-4">
          <InspectionProgress
            progressLevel={progressLevel}
            isInspector={role === "inspector"}
            stageStatuses={stageStatuses}
            onAdvanceStage={handleAdvance}
            onAcceptStage={(idx) => handleAccept(idx)}
            onRejectStage={(idx, reason) => {
              let r = reason;
              if (!r) r = prompt("Reason for rejection (optional):", "") || "No reason provided";
              handleReject(idx, r);
            }}
          />
        </div>
      </aside>

      {/* Right: Chat area */}
      <main className="flex-1 flex flex-col relative">
        {/* fixed header */}
        <div
          className="w-full bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between z-40"
          style={{ height: HEADER_HEIGHT, position: "sticky", top: 0 }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-black text-white flex items-center justify-center font-semibold text-base md:text-sm flex-shrink-0">
              {otherInitial}
            </div>
            <div className="min-w-0">
              <div className="text-sm md:text-base font-semibold truncate">{otherName === user?.name ? "You" : otherName}</div>
              <div className="text-xs md:text-sm text-green-600">Active now</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* progress dropdown toggle */}
            <button
              onClick={() => setProgressOpen((s) => !s)}
              title="Toggle inspection progress"
              className="flex items-center gap-1 px-2 py-1 border rounded-full text-xs md:text-sm hover:bg-gray-50 transition"
              aria-expanded={progressOpen}
            >
              {progressOpen ? <FiChevronUp /> : <FiChevronDown />}
              <span className="hidden md:inline">Progress</span>
            </button>

            <button
              onClick={handleCallClick}
              title="Call (coming soon)"
              className="flex items-center gap-2 px-2 py-1 border rounded-full text-xs md:text-sm hover:bg-gray-50 transition"
            >
              <FiPhone />
              <span className="hidden md:inline">Call</span>
            </button>

            <button
              onClick={handleAddMembersClick}
              title="Add members (coming soon)"
              className="flex items-center gap-2 px-2 py-1 border rounded-full text-xs md:text-sm hover:bg-gray-50 transition"
            >
              <FiUserPlus />
              <span className="hidden md:inline">Add</span>
            </button>
          </div>
        </div>

        {/* top inspection progress (dropdown) — rendered under the sticky header and accounted for in scroll area height */}
        {progressOpen && (
          <div
            className="w-full lg:hidden border-b border-gray-100 bg-white z-30"
            style={{ position: "sticky", top: HEADER_HEIGHT, zIndex: 30 }}
          >
            <div className="px-3 md:px-4 py-3">
              <InspectionProgress
                progressLevel={progressLevel}
                isInspector={role === "inspector"}
                stageStatuses={stageStatuses}
                onAdvanceStage={handleAdvance}
                onAcceptStage={(idx) => handleAccept(idx)}
                onRejectStage={(idx, reason) => {
                  let r = reason;
                  if (!r) r = prompt("Reason for rejection (optional):", "") || "No reason provided";
                  handleReject(idx, r);
                }}
              />
            </div>
          </div>
        )}

        {/* messages area: height calculated so header (+ progress if open) + input remain fixed; only this div scrolls */}
        <div
          className="flex-1 bg-gray-50 px-3 md:px-6 py-4 overflow-hidden"
          style={{
            height: progressOpen
              ? `calc(100vh - ${HEADER_HEIGHT + PROGRESS_HEIGHT}px)`
              : `calc(100vh - ${HEADER_HEIGHT}px)`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            ref={scrollRef}
            className="overflow-y-auto pr-2 space-y-4 flex flex-col"
            style={{
              paddingBottom: INPUT_HEIGHT,
              flex: 1,
            }}
          >
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 text-sm mt-10">No messages yet. Start the conversation.</div>
            ) : (
              messages.map((msg, i) => {
                const isSelf = msg.sender && userId && String(msg.sender) === String(userId);
                const isSystem = msg.role === "system" || msg.messageType === "system";
                const bubbleBase = "px-4 py-2 rounded-lg shadow-sm break-words max-w-[85%] sm:max-w-[70%]";

                return (
                  <div key={msg._id || msg.tempId || i} className={`flex items-end ${isSelf ? "justify-end" : isSystem ? "justify-center" : "justify-start"} gap-2`}>
                    {!isSelf && !isSystem && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-800 to-black text-white flex items-center justify-center font-semibold text-sm">
                          {otherInitial}
                        </div>
                      </div>
                    )}

                    <div className={`${bubbleBase} ${isSystem ? "bg-gray-300 text-gray-900 mx-auto text-xs sm:text-sm" : isSelf ? "bg-black text-white ml-auto text-sm sm:text-base" : "bg-white text-black border border-gray-200 text-sm sm:text-base"}`}>
                      {msg.text && <div className="whitespace-pre-wrap">{msg.text}</div>}

                      {msg.fileUrl && msg.fileType?.startsWith("image/") && (
                        <img src={msg.fileUrl} alt={msg.originalName || "image"} className="mt-2 rounded max-w-[220px] sm:max-w-[280px] max-h-[220px] object-cover cursor-pointer hover:opacity-90 transition" onClick={() => setModalImage(msg.fileUrl)} />
                      )}

                      {msg.fileUrl && !msg.fileType?.startsWith("image/") && (
                        <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className="underline mt-2 block text-sm">{msg.originalName || "Open file"}</a>
                      )}

                      <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm">
                        {msg.pending ? (
                          <div className="text-gray-400 italic flex items-center gap-2">
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                            <span>Sending…</span>
                          </div>
                        ) : (
                          isSelf && (
                            <div className="flex items-center text-gray-400">
                              <Tick msg={msg} />
                            </div>
                          )
                        )}

                        {msg.sentAt && (
                          <div className={` ${isSelf ? "text-gray-400 text-right" : isSystem ? "text-gray-700 text-center" : "text-gray-500"}`}>
                            {new Date(msg.sentAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        )}
                      </div>
                    </div>

                    {isSelf && <div className="flex-shrink-0 w-8" />}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Input area fixed to bottom */}
        <div
          className="w-full bg-white border-t border-gray-200 px-3 md:px-6 py-3 z-50"
          style={{ position: "sticky", bottom: 0, background: "white" }}
        >
          <div className="max-w-6xl mx-auto">
            {file && (
              <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded mb-2">
                <div className="text-sm text-gray-700 flex items-center gap-3">
                  {previewUrl ? <img src={previewUrl} alt="preview" className="h-12 rounded" /> : <div className="text-sm font-medium truncate max-w-[200px]">{file.name}</div>}
                </div>
                <button onClick={clearFile} className="text-gray-500 hover:text-black">
                  <FiX size={18} />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input type="file" id="fileUpload" onChange={handleFileSelect} disabled={loading} className="hidden" accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
              <label htmlFor="fileUpload" className={`cursor-pointer ${loading ? "opacity-50 pointer-events-none" : "text-gray-600 hover:text-black"}`} title="Attach file">
                <FiPaperclip size={20} />
              </label>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={loading}
                className={`flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-black ${loading ? "bg-gray-100 cursor-not-allowed" : ""}`}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              />

              <button onClick={handleSend} disabled={loading} className={`text-white px-3 py-2 rounded-md transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-900"}`} title="Send message">
                {loading ? <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mx-auto" /> : <FiSend size={20} />}
              </button>
            </div>
          </div>
        </div>

        {modalImage && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setModalImage(null)}>
            <div className="relative max-w-[95%] max-h-[95%]">
              <button onClick={() => setModalImage(null)} className="absolute top-2 right-2 text-white bg-black bg-opacity-30 rounded-full p-2">
                <FiX />
              </button>
              <img src={modalImage} alt="Preview" className="w-auto h-auto max-w-[90vw] max-h-[80vh] rounded shadow-lg mx-auto object-contain" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
