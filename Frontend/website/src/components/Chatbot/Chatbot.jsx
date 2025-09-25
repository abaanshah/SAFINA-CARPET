import React, { useState, useEffect, useRef } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:9000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: "user-123",
          message: input,
          history: messages,
        }),
      });

      if (!res.ok) throw new Error("API request failed");

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Error: Unable to connect to Safina Carpets Assistant.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div
        style={styles.floatingButtonContainer}
      >
        <button
          onClick={toggleChat}
          style={{
            ...styles.floatingButton,
            backgroundColor: isOpen ? "#660002" : "#860A0C",
            transform: isOpen ? "scale(1.1)" : "scale(1)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.backgroundColor = "#660002";
          }}
          onMouseLeave={(e) => {
            if (!isOpen) {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.backgroundColor = "#860A0C";
            }
          }}
        >
          {isOpen ? "×" : "💬"}
        </button>
      </div>

      {/* Chatbot Modal */}
      {isOpen && (
        <div
          style={styles.chatbotModal}
        >
          <div style={styles.chatContainer}>
            <div style={styles.header}>
              <div style={styles.headerContent}>
                <div style={styles.headerText}>
                  <div style={styles.title}>Safina Carpets Assistant</div>
                  <div style={styles.subtitle}>How can I help you today?</div>
                </div>
                <div style={styles.statusIndicator}></div>
              </div>
            </div>

            <div style={styles.messages}>
              {messages.length === 0 ? (
                <div style={styles.welcomeMessage}>
                  <div style={styles.welcomeIcon}>👋</div>
                  <div style={styles.welcomeText}>
                    Hello! I'm here to help you with any questions about our carpets, pricing, or services.
                  </div>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      ...styles.message,
                      animation: "fadeIn 0.3s ease-in-out",
                      background:
                        msg.role === "user" ? "#DEE2E6" : "#860A0C",
                      color: msg.role === "user" ? "#333" : "white",
                      alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                      borderBottomLeftRadius: msg.role === "user" ? "18px" : "4px",
                      borderBottomRightRadius: msg.role === "user" ? "4px" : "18px",
                    }}
                  >
                    {msg.content}
                  </div>
                ))
              )}
              {loading && (
                <div style={styles.loadingMessage}>
                  <div style={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div style={styles.inputBox}>
              <input
                style={styles.input}
                placeholder="Type your message here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <button 
                style={{
                  ...styles.button,
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? "not-allowed" : "pointer"
                }} 
                onClick={sendMessage} 
                disabled={loading}
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS animations combined */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        @keyframes typing {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
      `}</style>
    </>
  );
}

const styles = {
  // Floating Button Container
  floatingButtonContainer: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
  },
  floatingButton: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "none",
    color: "white",
    fontSize: "24px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  },
  // Chatbot Modal
  chatbotModal: {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    zIndex: 1001,
    animation: "slideUp 0.3s ease-out",
  },
  // Chatbot Component
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    width: "350px",
    height: "600px",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    overflow: "hidden",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
  },
  header: {
    background: "linear-gradient(135deg, #860A0C 0%, #6a1b9a 100%)",
    color: "white",
    padding: "16px",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    fontSize: "16px",
    marginBottom: "2px",
  },
  subtitle: {
    fontSize: "12px",
    opacity: 0.9,
  },
  statusIndicator: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#4caf50",
    animation: "pulse 2s infinite",
  },
  messages: {
    flex: 1,
    padding: "16px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    backgroundColor: "#F3F5F6",
  },
  welcomeMessage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
    color: "#666",
  },
  welcomeIcon: {
    fontSize: "32px",
    marginBottom: "12px",
  },
  welcomeText: {
    fontSize: "14px",
    lineHeight: "1.4",
  },
  message: {
    padding: "12px 16px",
    maxWidth: "80%",
    whiteSpace: "pre-wrap",
    fontSize: "14px",
    lineHeight: "1.4",
    wordWrap: "break-word",
    borderRadius: "18px",
  },
  loadingMessage: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
  },
  typingIndicator: {
    display: "flex",
    gap: "4px",
  },
  inputBox: {
    display: "flex",
    borderTop: "1px solid #e0e0e0",
    padding: "12px",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    padding: "12px 16px",
    border: "1px solid #e0e0e0",
    borderRadius: "20px",
    outline: "none",
    fontSize: "14px",
    backgroundColor: "#E8EBF0",
  },
  button: {
    background: "linear-gradient(135deg, #860A0C 0%, #6a1b9a 100%)",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "20px",
    marginLeft: "8px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
};
