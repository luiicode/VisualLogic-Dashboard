"use client"; // Necesario en Next.js App Router para usar estados (useState)

import React, { useState, useRef, useEffect } from "react";

// Interfaz para los mensajes del chat
interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
}

// Interfaz de la respuesta de tu API en Python
interface VisualLogicResponse {
  intent: string;
  target_object: string;
  action: string;
  filters: any;
  visual_component: string;
  graph_data: any;
  audit_log: string; // Usaremos esto como la respuesta principal del agente
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "agent",
      text: "Hola, soy tu Agente VisualLogic. ¿Qué métricas de Salesforce o Data Cloud deseas consultar o modificar?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // 1. Agregar el mensaje del usuario a la UI
    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // 2. Hacer la petición a tu API en Python (FastAPI)
      // Asegúrate de cambiar localhost por tu URL de producción cuando lo subas
      const response = await fetch("http://localhost:8000/api/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ TextoUsuario: newUserMessage.text }),
      });

      if (!response.ok) {
        throw new Error("Error en la comunicación con la API");
      }

      const data: VisualLogicResponse = await response.json();

      // 3. Agregar la respuesta del Agente (usamos el audit_log como texto de respuesta)
      const newAgentMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "agent",
        text: data.audit_log || "Comando procesado correctamente.",
      };

      setMessages((prev) => [...prev, newAgentMessage]);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          text: "Hubo un error al conectar con el servidor de IA.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Ventana del Chat */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[500px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-sans">
          {/* Header */}
          <div className="bg-slate-800 text-white px-4 py-3 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm">VisualLogic AI Engine</h3>
              <p className="text-xs text-slate-300">Conectado a Salesforce</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white self-end rounded-br-none"
                    : "bg-white border border-gray-200 text-gray-800 self-start rounded-bl-none shadow-sm"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white border border-gray-200 text-gray-500 self-start rounded-2xl rounded-bl-none px-4 py-2 text-sm shadow-sm italic">
                Procesando...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input de texto */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Escribe un comando..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 text-black"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 ml-1"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Botón Flotante Circular (El nodo "N" que mostraste en tu imagen) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-800 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform border border-slate-700"
      >
        {isOpen ? (
          <span className="text-xl">✕</span>
        ) : (
          <span className="text-2xl font-semibold font-serif">N</span>
        )}
      </button>
    </div>
  );
}
