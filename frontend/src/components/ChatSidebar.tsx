import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
}

interface ChatSidebarProps {
  chatHistory: ChatHistory[];
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  currentChatId?: string;
}

export function ChatSidebar({ 
  chatHistory, 
  onNewChat, 
  onSelectChat,
  currentChatId 
}: ChatSidebarProps) {
  return (
    <div className="flex h-full flex-col bg-glacier-surface border-r border-glacier">
      <div className="p-4">
        <Button 
          onClick={onNewChat}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth"
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          New Chat
        </Button>
      </div>
      
      <Separator className="bg-glacier-border" />
      
      <div className="px-4 py-3">
        <h3 className="text-sm font-medium text-glacier-secondary">Chat History</h3>
      </div>
      
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 pb-4">
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full rounded-lg px-3 py-2.5 text-left transition-smooth hover:bg-glacier-elevated group ${
                currentChatId === chat.id 
                  ? 'bg-glacier-elevated border border-glacier-border-hover' 
                  : 'border border-transparent'
              }`}
            >
              <div className="flex items-start gap-3">
                <MessageSquare className="h-4 w-4 mt-0.5 text-glacier-muted group-hover:text-glacier-secondary transition-smooth flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-glacier-primary truncate">
                    {chat.title}
                  </p>
                  <p className="text-xs text-glacier-muted mt-0.5">
                    {chat.timestamp.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </button>
          ))}
          
          {chatHistory.length === 0 && (
            <div className="text-center py-8 px-4">
              <MessageSquare className="h-8 w-8 mx-auto text-glacier-muted mb-2" />
              <p className="text-sm text-glacier-muted">No chat history yet</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
