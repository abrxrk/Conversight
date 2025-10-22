import { useState } from "react";
import { Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onAttachImage: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  onSendMessage, 
  onAttachImage, 
  disabled = false,
  placeholder = "Ask a question about your image..."
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end gap-2 p-4 bg-glacier-surface border border-glacier-border rounded-2xl transition-smooth focus-within:border-glacier-border-hover">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onAttachImage}
          disabled={disabled}
          className="flex-shrink-0 text-glacier-muted hover:text-glacier-secondary hover:bg-glacier-elevated"
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 min-h-[44px] max-h-32 resize-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-glacier-primary placeholder:text-glacier-muted"
          rows={1}
        />
        
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || disabled}
          className="flex-shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
