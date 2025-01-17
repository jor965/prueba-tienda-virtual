import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";
import { FAQ_RESPONSES } from "@/constants/chatResponses";

interface Message {
  text: string;
  isUser: boolean;
}

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const findResponse = (userInput: string) => {
    const lowercaseInput = userInput.toLowerCase();
    for (const [key, value] of Object.entries(FAQ_RESPONSES)) {
      if (lowercaseInput.includes(key)) {
        return value.answer;
      }
    }
    return "Lo siento, no entiendo tu pregunta. ¿Podrías reformularla? Puedes preguntarme sobre compras, productos, pagos, envíos, devoluciones o stock.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    
    const response = findResponse(input);
    const assistantMessage = { text: response, isUser: false };
    
    setMessages((prev) => [...prev, assistantMessage]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      ) : (
        <div className="bg-white rounded-lg shadow-lg w-80 max-h-[500px] flex flex-col">
          <div className="p-4 bg-primary text-white flex justify-between items-center">
            <h3 className="font-semibold">Asistente Virtual</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500">
                ¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?
              </div>
            )}
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
          </div>
          <ChatInput 
            input={input}
            setInput={setInput}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
}