import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
  dangerouslyAllowBrowser: true,
});

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatMode, setChatMode] = useState("ai"); // 'ai' or 'human'
  const messagesEndRef = useRef(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      content: inputMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      if (chatMode === "ai") {
        const response = await anthropic.messages.create({
          model: "claude-3-sonnet-20240229",
          max_tokens: 1024,
          messages: [{ role: "user", content: inputMessage }],
        });

        const aiMessage = {
          content:
            response.content[0].text ||
            "I apologize, but I'm currently experiencing technical difficulties. Please try again later or switch to Team Support for immediate assistance.",
          sender: "ai",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        // Redirect to WhatsApp
        const phoneNumber = "8078447125"; // Your WhatsApp number
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
          inputMessage
        )}`;
        window.open(whatsappUrl, "_blank");

        // Add system message about WhatsApp redirection
        setMessages((prev) => [
          ...prev,
          {
            content: "Redirecting you to WhatsApp to chat with our team...",
            sender: "system",
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Add more descriptive error message
      setMessages((prev) => [
        ...prev,
        {
          content:
            error.message ||
            "Sorry, our AI assistant is currently unavailable. Please try switching to Team Support or try again later.",
          sender: "system",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`bg-gray-900 rounded-2xl shadow-xl border border-white/10 overflow-hidden
              ${isMinimized ? "w-72 h-16" : "w-96 h-[600px]"} transition-all duration-300`}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <h3 className="text-white font-medium">
                  {chatMode === "ai" ? "AI Assistant" : "Team Support"}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {isMinimized ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat Mode Toggle */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex gap-2 bg-white/5 rounded-lg p-1">
                    <button
                      onClick={() => setChatMode("ai")}
                      className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors
                        ${
                          chatMode === "ai"
                            ? "bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                    >
                      Val-X AI
                    </button>
                    <button
                      onClick={() => setChatMode("human")}
                      className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors
                        ${
                          chatMode === "human"
                            ? "bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                    >
                      Team Support
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px]">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white"
                            : message.sender === "system"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-white/10 text-white"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs opacity-60 mt-1 block">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/10 rounded-2xl px-4 py-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" />
                          <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce delay-100" />
                          <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce delay-200" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`Type your message to ${
                        chatMode === "ai" ? "AI Assistant" : "Team Support"
                      }...`}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 resize-none"
                      rows={1}
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-2 rounded-xl bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white hover:opacity-90 transition-opacity"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </motion.button>
    </div>
  );
};

export default ChatBox;
