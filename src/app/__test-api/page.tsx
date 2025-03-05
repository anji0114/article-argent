"use client";

import { useState } from "react";

export default function TestApi() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setReply("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setReply(JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      console.error("エラーが発生しました:", error);
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", textAlign: "center" }}>
      <h1>Chat with Claude</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="質問を入力..."
        style={{ width: "80%", padding: "10px", marginBottom: "10px" }}
        className="border"
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        style={{ padding: "10px 20px" }}
      >
        {loading ? "送信中..." : "送信"}
      </button>
      {reply && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
          Claudeの返答: {reply}
        </p>
      )}
    </div>
  );
}
