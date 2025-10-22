import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ImageUploader } from "@/components/ImageUploader";
import { ModelTrainingModal } from "@/components/ModelTrainingModal";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
}

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentImage, setCurrentImage] = useState<string>();
  const [chatHistory] = useState<ChatHistory[]>([
    { id: '1', title: 'Product Image Analysis', timestamp: new Date(Date.now() - 86400000) },
    { id: '2', title: 'Logo Design Review', timestamp: new Date(Date.now() - 172800000) },
  ]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setCurrentImage(imageUrl);
      
      // Add user message with image
      const newMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: 'I uploaded an image for analysis',
        image: imageUrl,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newMessage]);
      
      // Show training modal
      setShowModal(true);
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Show training modal
    setShowModal(true);
  };

  const handleRemoveImage = () => {
    setCurrentImage(undefined);
  };

  return (
    <div className="flex h-screen bg-glacier dark">
      {/* Sidebar */}
      <div 
        className={`transition-all duration-300 ${
          sidebarOpen ? 'w-80' : 'w-0'
        } overflow-hidden`}
      >
        <ChatSidebar
          chatHistory={chatHistory}
          onNewChat={() => {
            setMessages([]);
            setCurrentImage(undefined);
          }}
          onSelectChat={(id) => console.log('Selected chat:', id)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-glacier-border bg-glacier-surface flex items-center px-4 gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-glacier-secondary hover:text-glacier-primary hover:bg-glacier-elevated"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-glacier-primary">
              Conversight
            </h1>
            <p className="text-xs text-glacier-muted">
              AI-powered image intelligence
            </p>
          </div>
        </header>

        {/* Chat Area */}
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-6">
                <div className="text-center space-y-3 mb-8">
                  <h2 className="text-3xl font-bold text-glacier-primary">
                    Welcome to Conversight
                  </h2>
                  <p className="text-glacier-secondary max-w-md">
                    Upload an image and start asking questions. Our AI will help you analyze and understand your images.
                  </p>
                </div>
                
                <div className="w-full max-w-2xl">
                  <ImageUploader
                    onImageUpload={handleImageUpload}
                    currentImage={currentImage}
                    onRemoveImage={handleRemoveImage}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                
                {currentImage && (
                  <div className="mt-6">
                    <ImageUploader
                      onImageUpload={handleImageUpload}
                      currentImage={currentImage}
                      onRemoveImage={handleRemoveImage}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-glacier-border bg-glacier-surface p-4">
          <div className="max-w-4xl mx-auto">
            <ChatInput
              onSendMessage={handleSendMessage}
              onAttachImage={() => document.getElementById('image-input')?.click()}
              placeholder={currentImage ? "Ask a question about your image..." : "Upload an image first..."}
              disabled={!currentImage}
            />
          </div>
        </div>
      </div>

      {/* Training Modal */}
      <ModelTrainingModal open={showModal} onOpenChange={setShowModal} />
    </div>
  );
};

export default Index;
