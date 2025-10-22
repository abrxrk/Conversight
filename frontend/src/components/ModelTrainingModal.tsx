import { Brain, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModelTrainingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ModelTrainingModal({ open, onOpenChange }: ModelTrainingModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-glacier-surface border-glacier-border">
        <DialogHeader>
          <div className="mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative rounded-full p-4 bg-glacier-elevated border border-glacier-border">
              <Brain className="h-12 w-12 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl text-glacier-primary">
            Model Training in Progress
          </DialogTitle>
          <DialogDescription className="text-center text-glacier-secondary pt-2">
            Our AI model is currently being trained to analyze images with precision and accuracy.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-glacier-elevated border border-glacier-border">
            <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-glacier-primary mb-1">
                What's happening?
              </p>
              <p className="text-sm text-glacier-secondary">
                We're fine-tuning our neural networks to provide you with the most accurate image analysis possible.
              </p>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm text-glacier-secondary text-center">
              Please check back later to start analyzing your images.
            </p>
          </div>
          
          <div className="flex justify-center pt-2">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
