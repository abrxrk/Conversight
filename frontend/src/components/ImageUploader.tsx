import { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  currentImage?: string;
  onRemoveImage?: () => void;
}

export function ImageUploader({ onImageUpload, currentImage, onRemoveImage }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageUpload(file);
      }
    }
  }, [onImageUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageUpload(file);
      }
    }
  }, [onImageUpload]);

  if (currentImage) {
    return (
      <div className="relative rounded-xl overflow-hidden border-2 border-glacier-border bg-glacier-elevated">
        <img 
          src={currentImage} 
          alt="Uploaded preview" 
          className="w-full h-auto max-h-96 object-contain"
        />
        {onRemoveImage && (
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-lg"
            onClick={onRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative rounded-xl border-2 border-dashed transition-smooth ${
        isDragging
          ? 'border-primary bg-primary/5 scale-[1.02]'
          : 'border-glacier-border bg-glacier-elevated hover:border-glacier-border-hover'
      }`}
    >
      <label className="flex flex-col items-center justify-center py-12 px-6 cursor-pointer">
        <div className={`rounded-full p-4 mb-4 transition-smooth ${
          isDragging ? 'bg-primary/20' : 'bg-glacier-surface'
        }`}>
          <Upload className={`h-8 w-8 transition-smooth ${
            isDragging ? 'text-primary' : 'text-glacier-muted'
          }`} />
        </div>
        
        <div className="text-center">
          <p className="text-glacier-primary font-medium mb-1">
            {isDragging ? 'Drop your image here' : 'Drag and drop an image'}
          </p>
          <p className="text-sm text-glacier-muted mb-4">
            or click to browse files
          </p>
          <div className="flex items-center gap-2 text-xs text-glacier-muted">
            <ImageIcon className="h-3.5 w-3.5" />
            <span>Supports: JPG, PNG, WEBP</span>
          </div>
        </div>
        
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileInput}
        />
      </label>
    </div>
  );
}
