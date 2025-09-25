import { useState, useRef } from "react";
import { Upload, Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  label: string;
}

const ImageUpload = ({ onImageSelect, selectedImage, label }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith("image/")) {
      onImageSelect(file);
      toast.success("Image uploaded successfully");
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 }
      });
      setStream(mediaStream);
      setIsCameraOpen(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      toast.error("Camera access denied");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      context?.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" });
          handleFileSelect(file);
          closeCamera();
        }
      }, "image/jpeg", 0.9);
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  return (
    <Card className="p-6 bg-gradient-warm shadow-soft">
      <h3 className="font-semibold text-foreground mb-4">{label}</h3>
      
      {!isCameraOpen ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {selectedImage ? (
            <div className="space-y-4">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="max-h-48 mx-auto rounded-lg shadow-soft"
              />
              <p className="text-sm text-muted-foreground">{selectedImage.name}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onImageSelect(null as any)}
              >
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <p className="text-foreground font-medium">
                  Drop your image here, or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  PNG, JPG up to 10MB
                </p>
              </div>
              
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Browse Files
                </Button>
                <Button
                  variant="outline"
                  onClick={openCamera}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Use Camera
                </Button>
              </div>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full max-h-64 object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>
          
          <div className="flex gap-2 justify-center">
            <Button onClick={capturePhoto} className="bg-gradient-luxury">
              <Camera className="w-4 h-4 mr-2" />
              Capture Photo
            </Button>
            <Button variant="outline" onClick={closeCamera}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ImageUpload;