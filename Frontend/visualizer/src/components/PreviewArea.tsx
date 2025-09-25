import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Download, Maximize } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface PreviewAreaProps {
  previewImage: string | null;
  isLoading: boolean;
}

const PreviewArea = ({ previewImage, isLoading }: PreviewAreaProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const transformRef = useRef<any>(null);

  const handleDownload = () => {
    if (previewImage) {
      const link = document.createElement('a');
      link.href = previewImage;
      link.download = 'rug-visualization.png';
      link.click();
    }
  };

  const handleReset = () => {
    if (transformRef.current) {
      transformRef.current.resetTransform();
    }
  };

  return (
    <Card className="p-6 bg-gradient-subtle shadow-soft h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Preview</h3>
        
        {previewImage && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="text-xs"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="text-xs"
            >
              <Download className="w-3 h-3 mr-1" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(true)}
              className="text-xs"
            >
              <Maximize className="w-3 h-3 mr-1" />
              Fullscreen
            </Button>
          </div>
        )}
      </div>

      <div className="relative bg-muted/30 rounded-lg overflow-hidden border border-border min-h-[400px] flex items-center justify-center">
        {isLoading ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto">
              <div className="w-full h-full border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
            <div>
              <p className="text-foreground font-medium">Placing your rug...</p>
              <p className="text-sm text-muted-foreground">This may take 30-60 seconds</p>
            </div>
          </div>
        ) : previewImage ? (
          <TransformWrapper
            ref={transformRef}
            initialScale={1}
            initialPositionX={0}
            initialPositionY={0}
            wheel={{ step: 0.1 }}
            pinch={{ step: 5 }}
            doubleClick={{ mode: "reset" }}
          >
            {({ zoomIn, zoomOut }) => (
              <>
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => zoomIn()}
                    className="bg-white/90 backdrop-blur-sm"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => zoomOut()}
                    className="bg-white/90 backdrop-blur-sm"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                </div>
                
                <TransformComponent
                  wrapperClass="w-full h-full"
                  contentClass="w-full h-full flex items-center justify-center"
                >
                  <img
                    src={previewImage}
                    alt="Rug visualization result"
                    className="max-w-full max-h-full object-contain rounded-lg shadow-premium"
                    style={{ maxHeight: "600px", maxWidth: "100%" }}
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Maximize className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-foreground font-medium">Your visualization will appear here</p>
              <p className="text-sm text-muted-foreground">
                Upload a room image, select rug dimensions, and click visualize
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && previewImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-10 bg-white/10 text-white border-white/20"
            >
              Close
            </Button>
            
            <TransformWrapper
              initialScale={0.8}
              initialPositionX={0}
              initialPositionY={0}
              wheel={{ step: 0.1 }}
              pinch={{ step: 5 }}
              doubleClick={{ mode: "reset" }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => zoomIn()}
                      className="bg-white/10 text-white border-white/20"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => zoomOut()}
                      className="bg-white/10 text-white border-white/20"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => resetTransform()}
                      className="bg-white/10 text-white border-white/20"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <TransformComponent
                    wrapperClass="w-full h-full"
                    contentClass="w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={previewImage}
                      alt="Rug visualization result fullscreen"
                      className="max-w-full max-h-full object-contain"
                    />
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PreviewArea;