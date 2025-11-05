import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { FiPaperclip, FiSend, FiFile, FiImage, FiVideo } from "react-icons/fi";

const stages = ["Start", "Analysis", "Report", "Finish"];

export default function Chat() {
  const { targetId, orderId } = useParams();
  const [progressLevel, setProgressLevel] = useState(-1);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const socketRef = useRef(null);
  const fileInputRef = useRef(null);

  const user = useSelector((store) => store?.user?.user);
  const { name, role } = user;
  const userId = user?._id;

  useEffect(() => {
    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", { name, userId, targetId, orderId, role });

    socket.on("messageReceived", ({ name, text, senderId, role: senderRole, sentAt, fileUrl, fileType, originalName }) => {
      setMessages((prev) => [
        ...prev,
        { 
          sender: senderId, 
          name, 
          text, 
          fileUrl, 
          fileType, 
          originalName,
          role: senderRole,
          sentAt: new Date(sentAt)
        },
      ]);
    });

    socket.on("uploadProgress", ({ progress }) => {
      setUploadProgress(progress);
    });

    return () => socket.disconnect();
  }, [userId, targetId, orderId]);

  useEffect(() => {
    const chatContainer = document.querySelector(".chat-messages");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${BASE_URL}/chat/history/${orderId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        if (data.success) {
          setMessages(data.messages.map(msg => ({
            sender: msg.sender.refId,
            name: "", 
            text: msg.text,
            fileUrl: msg.fileUrl,
            fileType: msg.fileType,
            originalName: msg.originalName,
            role: msg.sender.role,
            sentAt: new Date(msg.sentAt)
          })));
        }
      } catch (err) {
        console.error("Failed to fetch chat history:", err);
      }
    };

    fetchHistory();
  }, [orderId]);

  const handleSend = () => {
    if (input.trim()) {
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
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const validateFile = (file) => {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/avi',
      'video/mov',
      'video/wmv',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
      'text/csv'
    ];

    if (file.size > maxSize) {
      alert('File size must be less than 50MB');
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      alert(`File type ${file.type} is not supported. Please upload PDF, images, videos, or documents.`);
      return false;
    }

    return true;
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    } else {
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("role", role);
      formData.append("refId", userId);

      const res = await fetch(`${BASE_URL}/chat/upload/${orderId}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Upload failed with status: ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        const { fileUrl, fileType, originalName } = data.message;
        socketRef.current.emit("sendMessage", {
          name,
          userId,
          targetId,
          orderId,
          role,
          text: "",
          fileUrl,
          fileType,
          originalName,
        });
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error("File upload error:", error);
      alert(`Failed to upload file: ${error.message}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType?.startsWith('image/')) return <FiImage className="text-blue-500" />;
    if (fileType?.startsWith('video/')) return <FiVideo className="text-purple-500" />;
    return <FiFile className="text-gray-500" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleStart = (index) => {
    if (role === "inspector" && progressLevel < index) {
      setProgressLevel(index - 0.5);
    }
  };

  const handleFinish = (index) => {
    if (role === "inspector" && progressLevel < index + 1) {
      setProgressLevel(index + 1);
    }
  };

  const handleRevert = (index) => {
    if (role === "inspector") {
      setProgressLevel(index - 0.5);
    }
  };

  return (
    <div className="flex h-screen bg-white text-black font-sans">
      <main className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-bold">Live Chat</h1>
          <p className="text-sm text-gray-500">
            Current Stage: {stages[Math.floor(progressLevel)] || "Not started"}
          </p>
        </div>

        <div className="flex-1 bg-white px-6 py-4 overflow-hidden">
          <div className="h-full overflow-y-auto pr-2 space-y-4 flex flex-col chat-messages">
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
                      isSelf ? "ml-auto bg-black text-white" : "mr-auto bg-gray-500 text-white"
                    }`}
                  >
                    {msg.text ? (
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                    ) : msg.fileUrl ? (
                      <div className="flex items-center gap-2">
                        {getFileIcon(msg.fileType)}
                        <a 
                          href={msg.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="underline hover:no-underline"
                        >
                          {msg.originalName || "Download file"}
                        </a>
                      </div>
                    ) : null}
                    {msg.sentAt && (
                      <div className="text-xs opacity-70 mt-1">
                        {msg.sentAt.toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4">
          {/* File preview */}
          {file && (
            <div className="mb-3 p-3 bg-gray-50 rounded-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getFileIcon(file.type)}
                  <div>
                    <div className="text-sm font-medium">{file.name}</div>
                    <div className="text-xs text-gray-500">{formatFileSize(file.size)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isUploading && (
                    <div className="text-xs text-gray-500">
                      {uploadProgress}%
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    className="text-red-500 hover:text-red-700 text-sm"
                    disabled={isUploading}
                  >
                    Remove
                  </button>
                </div>
              </div>
              {isUploading && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              id="fileUpload"
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.mp4,.avi,.mov,.wmv,.doc,.docx,.xls,.xlsx,.txt,.csv"
            />
            <label 
              htmlFor="fileUpload" 
              className="cursor-pointer text-gray-600 hover:text-black p-2 rounded-md hover:bg-gray-100"
              title="Attach file"
            >
              <FiPaperclip size={20} />
            </label>

            {file && !isUploading && (
              <button
                onClick={handleFileUpload}
                className="text-blue-600 hover:text-blue-800 p-2 rounded-md hover:bg-blue-50"
                title="Upload file"
              >
                <FiSend size={20} />
              </button>
            )}

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              disabled={isUploading}
            />

            <button
              onClick={handleSend}
              className="text-white bg-black px-3 py-2 rounded-md hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send message"
              disabled={isUploading || (!input.trim() && !file)}
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}