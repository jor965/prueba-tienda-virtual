import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  text: string;
  isUser: boolean;
}

const FAQ_RESPONSES = {
  "compra": {
    question: "¿Cómo puedo realizar una compra?",
    answer: "Para realizar una compra, solo tienes que añadir los productos que te interesan al carrito de compras y luego proceder a la caja. Si necesitas ayuda, puedo guiarte en el proceso."
  },
  "productos": {
    question: "¿Dónde puedo encontrar información sobre los productos?",
    answer: "Cada producto tiene una descripción detallada en su página. Si deseas saber más sobre características, precios o disponibilidad, solo pregúntame por el producto específico."
  },
  "pago": {
    question: "¿Cuáles son las opciones de pago disponibles?",
    answer: "Aceptamos varias opciones de pago, incluyendo tarjetas de crédito/débito, PayPal, y pagos a través de plataformas seguras."
  },
  "envio": {
    question: "¿Cuál es el costo de envío?",
    answer: "El costo de envío depende de tu ubicación y del peso de los productos. Puedes ver el costo exacto antes de finalizar tu compra."
  },
  "tiempo": {
    question: "¿Cuánto tiempo tarda el envío?",
    answer: "El tiempo de envío varía según tu ubicación. En general, los pedidos nacionales tardan entre 3 y 7 días hábiles."
  },
  "devolucion": {
    question: "¿Puedo hacer una devolución?",
    answer: "Sí, ofrecemos una política de devoluciones dentro de 30 días después de recibir tu pedido. Asegúrate de que el producto esté en su estado original."
  },
  "stock": {
    question: "¿Tienen productos en stock?",
    answer: "Para verificar la disponibilidad de un producto, puedes ver su estado en la tienda. Si no está disponible, te puedo avisar cuando vuelva a estar en stock."
  }
};

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { toast } = useToast();

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
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit">
                Enviar
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}