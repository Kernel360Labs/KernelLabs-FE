import React, { useState, useEffect } from "react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBalloon, setShowBalloon] = useState(true);

  useEffect(() => {
    if (!open && showBalloon) {
      const timer = setTimeout(() => setShowBalloon(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [open, showBalloon]);

  // 챗봇 기본 안내 메시지
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: "안녕하세요! 의성군에 대해 궁금한 점이 있으신가요? 무엇이든 물어보세요!",
        },
      ]);
    }
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://uscode.porogramr.site/chats", {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      const botMessage: Message = { sender: "bot", text: data.data?.answer || "답변을 불러오지 못했습니다." };
      setMessages((prev) => [...prev, botMessage]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "오류가 발생했습니다. 다시 시도해 주세요." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* 말풍선 */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        {/* 말풍선 */}
        {!open && showBalloon && (
          <div
            style={{
              position: "absolute",
              right: 70,
              bottom: 20,
              background: "#fff",
              color: "#222",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              padding: "8px 16px",
              fontSize: 15,
              whiteSpace: "nowrap",
              border: "1px solid #e0e0e0",
            }}
          >
            의성에 대해 무엇이든 물어보세요!
          </div>
        )}
        {/* 플로팅 버튼 */}
        {!open && (
          <button
            onClick={() => setOpen(true)}
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "#007bff",
              color: "#fff",
              border: "none",
              fontSize: 30,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            🤖
          </button>
        )}
      </div>

      {/* 챗봇 창 */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 24,
            width: 400,
            height: 540,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1001,
          }}
        >
          {/* 헤더 */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f7f7f7",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          >
            <span>의성 도우미</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: 20,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
          {/* 메시지 리스트 */}
          <div
            style={{
              flex: 1,
              padding: 16,
              overflowY: "auto",
              background: "#fafbfc",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  gap: 8,
                }}
              >
                {/* 챗봇 메시지일 때 로봇 프로필 */}
                {msg.sender === "bot" && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "#e0e0e0",
                      fontSize: 20,
                      marginRight: 2,
                      userSelect: "none",
                    }}
                  >
                    🤖
                  </span>
                )}
                <div
                  style={{
                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                    background: msg.sender === "user" ? "#007bff" : "#e9ecef",
                    color: msg.sender === "user" ? "#fff" : "#222",
                    borderRadius: 12,
                    padding: "8px 12px",
                    maxWidth: "80%",
                    fontSize: 15,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  background: "#e9ecef",
                  color: "#222",
                  borderRadius: 12,
                  padding: "8px 12px",
                  maxWidth: "80%",
                  fontSize: 15,
                  opacity: 0.7,
                }}
              >
                답변 작성 중...
              </div>
            )}
          </div>
          {/* 입력창 */}
          <div
            style={{
              padding: 12,
              borderTop: "1px solid #eee",
              display: "flex",
              gap: 8,
              background: "#f7f7f7",
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="질문을 입력하세요"
              style={{
                flex: 1,
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 15,
              }}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "8px 16px",
                fontSize: 15,
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              }}
            >
              전송
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot; 