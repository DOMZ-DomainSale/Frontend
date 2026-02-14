"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";

interface DomainGroup {
  domainId: string;
  domain: string;
  conversations: Conversation[];
}

interface Conversation {
  conversationId: string;
  user: string;
}

interface Message {
  _id: string;
  message: string;
  createdAt: string;
  isMine: boolean;
}

export default function MessagesPage() {
  const [domains, setDomains] = useState<DomainGroup[]>([]);
  const [activeDomain, setActiveDomain] = useState<DomainGroup | null>(null);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [reply, setReply] = useState("");

  const API = process.env.NEXT_PUBLIC_apiLink;

  /* ---------------- LOAD INBOX ---------------- */
  useEffect(() => {
    const loadInbox = async () => {
      try {
        const res = await axios.get(`${API}communication`, {
          withCredentials: true
        });

        setDomains(res.data);

        if (res.data.length) {
          setActiveDomain(res.data[0]);
          setActiveConversation(res.data[0].conversations[0]);
        }
      } catch (err) {
        console.error("Failed to load inbox", err);
      }
    };

    loadInbox();
  }, [API]);

  /* ---------------- LOAD MESSAGES ---------------- */
  useEffect(() => {
    if (!activeConversation) return;

    const loadMessages = async () => {
      try {
        const res = await axios.get(
          `${API}communication/${activeConversation.conversationId}/messages`,
          { withCredentials: true }
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };

    loadMessages();
  }, [activeConversation, API]);


  /* ---------------- SEND REPLY ---------------- */
  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim() || !activeConversation) return;

    try {
      await axios.post(
        `${API}communication/${activeConversation.conversationId}/reply`,
        { message: reply },
        { withCredentials: true }
      );
      setReply("");
      const res = await axios.get(
        `${API}communication/${activeConversation.conversationId}/messages`,
        { withCredentials: true }
      );
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to send reply", err);
    }
  };

  return (
    <div className="h-screen flex bg-gray-100">

      <aside className="w-64 bg-white border-r overflow-y-auto">
        <div className="p-4 font-semibold border-b">Domains</div>
        {domains.map(d => (
          <button
            key={d.domainId}
            onClick={() => {
              setActiveDomain(d);
              setActiveConversation(d.conversations[0]);
            }}
            className={`w-full text-left px-4 py-3 border-b hover:bg-gray-50 ${
              activeDomain?.domainId === d.domainId ? "bg-blue-50" : ""
            }`}
          >
            {d.domain}
          </button>
        ))}
      </aside>

      {/* ---------------- CONVERSATIONS ---------------- */}
      <aside className="w-72 bg-white border-r overflow-y-auto">
        <div className="p-4 font-semibold border-b">Conversations</div>
        {activeDomain?.conversations.map(c => (
          <button
            key={c.conversationId}
            onClick={() => setActiveConversation(c)}
            className={`w-full text-left px-4 py-3 border-b hover:bg-gray-50 ${
              activeConversation?.conversationId === c.conversationId
                ? "bg-blue-100"
                : ""
            }`}
          >
            <div className="font-medium">{c.user}</div>
          </button>
        ))}
      </aside>

      {/* ---------------- CHAT ---------------- */}
      <main className="flex-1 flex flex-col bg-gray-50">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map(m => (
            <div
              key={m._id}
              className={`flex ${m.isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm
                  ${m.isMine
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-white text-gray-900 border rounded-bl-sm"
                  }
                `}
              >
                <p className="whitespace-pre-wrap">{m.message}</p>
                <div
                  className={`text-xs mt-1 ${
                    m.isMine ? "text-blue-100" : "text-gray-400"
                  }`}
                >
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Reply */}
        <div className="bg-white border-t px-4 py-2 shrink-0">
          <form onSubmit={sendReply} className="flex items-center gap-2">
            <input
              value={reply}
              onChange={e => setReply(e.target.value)}
              placeholder="Type your reply…"
              className="flex-1 h-9 border rounded-md px-3 text-sm focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="h-9 bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700 text-sm"
            >
              Send
            </button>
          </form>
        </div>

      </main>
    </div>
  );
}
