import React from "react";

const CompanyChatWithUs = ({ chats }) => {
  const hasChats = chats && chats.length > 0;

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">
      {!hasChats && (
        <p className="text-gray-500 text-center text-lg font-semibold mb-4">
          No chat messages available
        </p>
      )}

      {hasChats && (
        <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 text-gray-900">
          {chats.map((chat, idx) => (
            <div key={idx} className="py-2 border-b last:border-b-0 text-left">
              <span className="font-semibold">{chat.sender}:</span> {chat.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyChatWithUs;