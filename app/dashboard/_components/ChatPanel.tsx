"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

type Msg = { fromUserId?: string; message: string; createdAt?: string };

function normalizeMessages(raw: unknown[]): Msg[] {
  return raw.map((m: unknown) => {
    const row = m as Record<string, unknown>;
    return {
      fromUserId: String(row.fromUserId ?? ""),
      message: String(row.message ?? ""),
      createdAt: row.createdAt ? String(row.createdAt) : undefined,
    };
  });
}

export default function ChatPanel({ peerId, subtitle }: { peerId: string; subtitle?: string }) {
  const [selfId, setSelfId] = useState<string>("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

  const load = useCallback(async () => {
    if (!peerId) return;
    const meRes = await fetch("/api/auth/me", { credentials: "include" });
    const meJson = await meRes.json();
    if (meJson.user?._id) setSelfId(String(meJson.user._id));

    const r = await fetch(`/api/chat?peerId=${encodeURIComponent(peerId)}`, { credentials: "include" });
    const j = await r.json();
    if (j.messages) setMessages(normalizeMessages(j.messages));
  }, [peerId]);

  useEffect(() => {
    let on = true;
    (async () => {
      if (!peerId) return;
      await load();
    })();
    const poll = setInterval(() => {
      if (on) void load();
    }, 4000);
    return () => {
      on = false;
      clearInterval(poll);
    };
  }, [peerId, load]);

  useEffect(() => {
    if (!socketUrl || !peerId) return;
    const token = typeof window !== "undefined" ? sessionStorage.getItem("aptagon_socket_token") : null;
    if (!token) return;
    const s = io(socketUrl, { auth: { token }, transports: ["websocket", "polling"] });
    socketRef.current = s;
    s.on("chat:message", (payload: Msg) => {
      const from = String(payload.fromUserId ?? "");
      if (from === peerId) {
        setMessages((prev) => [...prev, { fromUserId: from, message: payload.message, createdAt: payload.createdAt }]);
      }
    });
    return () => {
      s.disconnect();
      socketRef.current = null;
    };
  }, [socketUrl, peerId]);

  async function send() {
    const v = text.trim();
    if (!v || !peerId) return;
    await fetch("/api/chat", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toUserId: peerId, message: v }),
    });
    setMessages((prev) => [...prev, { fromUserId: selfId, message: v }]);
    socketRef.current?.emit("chat:send", { toUserId: peerId, message: v });
    setText("");
  }

  return (
    <div className="flex h-[min(70vh,480px)] flex-col overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
      <div className="border-b border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800">
        Conversation {subtitle ? `· ${subtitle}` : ""}
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {messages.map((m, i) => {
          const mine = selfId && m.fromUserId === selfId;
          return (
            <div key={`${i}-${m.createdAt ?? ""}`} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ${mine ? "bg-teal-600 text-white" : "bg-white text-slate-800"}`}>{m.message}</div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 border-t border-slate-200 bg-white p-2">
        <input
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
          placeholder="Type a message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), void send())}
        />
        <button type="button" className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700" onClick={() => void send()}>
          Send
        </button>
      </div>
    </div>
  );
}
