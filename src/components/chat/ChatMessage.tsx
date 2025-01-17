interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

export function ChatMessage({ text, isUser }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] p-2 rounded-lg ${
          isUser
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {text}
      </div>
    </div>
  );
}