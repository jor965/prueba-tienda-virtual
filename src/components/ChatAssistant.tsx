import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  text: string;
  isUser: boolean;
}

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!apiKey) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu API key de Perplexity",
        variant: "destructive",
      });
      return;
    }

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-sonar-small-128k-online",
          messages: [
            {
              role: "system",
              content:
                "Eres un asistente de tienda en línea amable y servicial. Ayudas a los clientes con información sobre productos y proceso de compra.",
            },
            {
              role: "user",
              content: input,
            },
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la comunicación con el asistente");
      }

      const data = await response.json();
      const assistantMessage = {
        text: data.choices[0].message.content,
        isUser: false,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo conectar con el asistente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
          {!apiKey ? (
            <div className="p-4">
              <Input
                type="password"
                placeholder="Ingresa tu API key de Perplexity"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mb-2"
              />
              <p className="text-xs text-gray-500">
                Necesitas una API key de Perplexity para usar el asistente virtual
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-2 rounded-lg ${
                        message.isUser
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="text-center text-gray-500">
                    Escribiendo...
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading}>
                    Enviar
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}