import { useEffect, useRef, useState } from "react";
import "./styles/ChatWidget.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTER_PROMPTS = [
  "What AI systems has Hardik built?",
  "Is he available for senior roles?",
  "Tell me about his strongest skills",
  "What's his healthcare AI work?",
  "Can he lead an AI engineering team?",
];

const chatApiBase = (import.meta.env.VITE_CHAT_API_BASE_URL || "").replace(/\/$/, "");
const chatApiUrl = `${chatApiBase}/api/chat`;

const TypingDots = () => (
  <div className="chat-typing">
    <span /><span /><span />
  </div>
);

const ChatMessage = ({ msg }: { msg: Message }) => (
  <div className={`chat-msg chat-msg-${msg.role}`}>
    {msg.role === "assistant" && (
      <div className="chat-msg-avatar" aria-hidden="true">🤖</div>
    )}
    <div className="chat-msg-bubble">
      <p>{msg.content}</p>
    </div>
  </div>
);

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingMsg, setStreamingMsg] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hey! I'm Hardik's portfolio assistant. Ask me anything about his experience, projects, or skills — I'll give you the real details.",
        },
      ]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingMsg]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Listen for external open trigger (from hero CTA button)
  useEffect(() => {
    const el = document.getElementById("chat-widget");
    if (!el) return;
    const observer = new MutationObserver(() => {
      if (el.classList.contains("chat-open")) {
        setOpen(true);
        el.classList.remove("chat-open");
      }
    });
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setStreamingMsg("");

    try {
      const res = await fetch(chatApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok || !res.body) {
        throw new Error("API error");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                accumulated += parsed.text;
                setStreamingMsg(accumulated);
              }
            } catch {
              // partial chunk, continue
            }
          }
        }
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: accumulated },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I had trouble connecting. Try emailing Hardik directly at hardiktyagi007@gmail.com",
        },
      ]);
    } finally {
      setLoading(false);
      setStreamingMsg("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div id="chat-widget" className={`chat-widget ${open ? "chat-widget-open" : ""}`}>
      {/* Floating trigger button */}
      {!open && (
        <button
          className="chat-fab"
          onClick={() => setOpen(true)}
          aria-label="Chat with portfolio AI"
        >
          <span className="chat-fab-icon">🤖</span>
          <span className="chat-fab-label">Ask AI</span>
          <span className="chat-fab-pulse" aria-hidden="true" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Portfolio AI assistant">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-header-icon" aria-hidden="true">🤖</span>
              <div>
                <p className="chat-header-title">Portfolio AI</p>
                <p className="chat-header-sub">Ask anything about Hardik</p>
              </div>
            </div>
            <button
              className="chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages" role="log" aria-live="polite">
            {messages.map((msg, i) => (
              <ChatMessage key={i} msg={msg} />
            ))}
            {loading && !streamingMsg && (
              <div className="chat-msg chat-msg-assistant">
                <div className="chat-msg-avatar" aria-hidden="true">🤖</div>
                <div className="chat-msg-bubble">
                  <TypingDots />
                </div>
              </div>
            )}
            {streamingMsg && (
              <div className="chat-msg chat-msg-assistant">
                <div className="chat-msg-avatar" aria-hidden="true">🤖</div>
                <div className="chat-msg-bubble">
                  <p>{streamingMsg}<span className="chat-stream-cursor">|</span></p>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Starter prompts — shown only when no user messages yet */}
          {messages.length <= 1 && !loading && (
            <div className="chat-starters">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  className="chat-starter"
                  onClick={() => sendMessage(prompt)}
                  data-cursor="disable"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chat-input-row">
            <input
              ref={inputRef}
              className="chat-input"
              type="text"
              placeholder="Ask about Hardik's experience..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              maxLength={400}
              aria-label="Type your question"
            />
            <button
              className="chat-send"
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
