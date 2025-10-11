import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, UploadCloud, Image as ImageIcon, Sparkles, CheckCircle2, Download, Search, Lightbulb } from "lucide-react";

// --- Direct imports for images ---
import sampleRoom1 from "@/assets/sample-room-1.jpg";
import sampleRoom2 from "@/assets/sample-room-2.jpg";
import sampleRoom3 from "@/assets/sample-room-3.jpg";
import sampleRoom4 from "@/assets/sample-room-4.jpg";

// --- Helper Components ---
const Card = ({ children, className = "" }) => (
  <motion.div 
    className={`bg-white/60 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-6 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

const CardHeader = ({ icon, title, step }) => (
  <div className="flex items-center mb-4">
    <div className="flex-shrink-0 bg-[#5c0b0a] text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm mr-4 shadow-md">{step}</div>
    <div className="flex items-center">{icon}<h3 className="text-xl font-semibold text-gray-800 ml-3">{title}</h3></div>
  </div>
);

// --- Fun facts for the interactive loading screen ---
const funFacts = [
  "A single Persian rug can have over 1 million hand-tied knots.",
  "Natural dyes from plants and insects give traditional rugs their vibrant, lasting colors.",
  "Some intricate rug patterns can take a skilled weaver several years to complete.",
  "The art of rug making is a tradition passed down through generations, often over thousands of years.",
  "No two handcrafted rugs are ever exactly alike, making each one a unique piece of art."
];

const RugVisualizer = () => {
  // --- CORE LOGIC & STATE ---
  const [roomImage, setRoomImage] = useState(null);
  const [roomImagePreview, setRoomImagePreview] = useState('');
  const [selectedRoomName, setSelectedRoomName] = useState('');
  const [rugImage, setRugImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [factIndex, setFactIndex] = useState(0);

  // --- ADDED BACK: State for the dynamic countdown timer ---
  const [countdown, setCountdown] = useState(30);

  const [searchParams] = useSearchParams();
  const rugUrlFromQuery = searchParams.get('rugUrl');
  
  useEffect(() => {
    const fetchAndSetRugImage = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const blob = await response.blob();
        const file = new File([blob], "rug_from_store.jpg", { type: blob.type });
        setRugImage(file);
      } catch (error) {
        console.error("Failed to fetch rug image from URL:", error);
        toast.error("Could not load the selected rug image.");
      }
    };
    if (rugUrlFromQuery) {
      fetchAndSetRugImage(rugUrlFromQuery);
    }
  }, [rugUrlFromQuery]);
  
  // --- UPDATED: useEffect now handles both countdown and fun facts ---
  useEffect(() => {
    let factInterval;
    let countdownInterval;
    if (isLoading) {
      // Fun fact rotation
      factInterval = setInterval(() => {
        setFactIndex(prev => (prev + 1) % funFacts.length);
      }, 5000);
      
      // Countdown timer
      setCountdown(30); // Reset timer
      countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    // Cleanup function to clear intervals
    return () => {
      clearInterval(factInterval);
      clearInterval(countdownInterval);
    };
  }, [isLoading]);


  // --- HANDLER FUNCTIONS ---
  const handleRoomImageSelect = (file) => {
    setRoomImage(file);
    setRoomImagePreview(URL.createObjectURL(file));
    setSelectedRoomName('');
    setPreviewImage(null);
  };

  const handleSampleRoomSelect = async (roomUrl, roomName) => {
    setSelectedRoomName(roomName);
    setRoomImagePreview(roomUrl);
    setPreviewImage(null);
    try {
      const response = await fetch(roomUrl);
      const blob = await response.blob();
      const file = new File([blob], roomUrl.split('/').pop(), { type: blob.type });
      setRoomImage(file);
    } catch (error) {
      toast.error("Could not load sample room.");
    }
  };
  
  const handleRugImageSelect = (file) => {
    setRugImage(file);
    setPreviewImage(null);
  };
  
  const handleDownload = () => {
    if (!previewImage) return;
    const link = document.createElement('a');
    link.href = previewImage;
    link.download = 'rug-visualization.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const canSubmit = !!(roomImage && rugImage);

  const handleSubmit = async () => {
    if (!canSubmit) {
      toast.error("Please select both a room and a rug image.");
      return;
    }
    setIsLoading(true);
    setPreviewImage(null);
    try {
      const formData = new FormData();
      formData.append("room_image", roomImage);
      formData.append("rug_image", rugImage);

      const response = await fetch("http://127.0.0.1:8000/place-rug/", { method: "POST", body: formData });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setPreviewImage(imageUrl);
      toast.success("Visualization generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const browseOurRugs = () => {
    if (window.top) {
        window.top.location.href = '/catalog';
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-100 to-red-50 font-sans"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div className="lg:col-span-4 space-y-6" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <Card>
              <CardHeader icon={<ImageIcon className="text-[#5c0b0a]"/>} title="Choose Your Room" step="1" />
              <ImageUploader onImageSelect={handleRoomImageSelect} />
              <SampleRoomGallery onRoomSelect={handleSampleRoomSelect} selectedRoomName={selectedRoomName} />
            </Card>
            <Card>
              <CardHeader icon={<Sparkles className="text-[#5c0b0a]"/>} title="Select Your Rug" step="2" />
              {rugUrlFromQuery && rugImage ? (
                <div className="text-center p-4 border-2 border-dashed rounded-lg bg-green-50 border-green-300">
                  <p className="font-semibold text-green-800">Rug selected from our store!</p>
                  <img src={URL.createObjectURL(rugImage)} alt="Selected Rug" className="mt-2 w-24 h-24 object-cover mx-auto rounded-md"/>
                </div>
              ) : ( 
                <div className="space-y-4">
                    <ImageUploader onImageSelect={handleRugImageSelect} label="Upload Your Own Rug" />
                    <div className="text-center text-sm font-semibold text-gray-500">- OR -</div>
                    <button onClick={browseOurRugs} className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition font-semibold">
                        <Search size={16} />
                        Browse Our Collection
                    </button>
                </div>
              )}
            </Card>
          </motion.div>

          <motion.div className="lg:col-span-8 lg:sticky lg:top-8" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
            <div className="relative w-full aspect-[4/3] bg-white rounded-xl shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white">
              <AnimatePresence>
                {roomImagePreview && !previewImage && (
                  <motion.img key="room-bg" src={roomImagePreview} alt="Selected Room" className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                )}
                {previewImage && (
                  <motion.img key="final-preview" src={previewImage} alt="Rug Visualization" className="absolute inset-0 w-full h-full object-contain z-10" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} />
                )}
              </AnimatePresence>
              
              {isLoading && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-4">
                  <Loader2 size={48} className="animate-spin text-[#5c0b0a]" />
                  <p className="mt-6 text-gray-800 font-semibold text-lg">Our AI is rendering your space...</p>
                  <p className="text-sm text-gray-500">
                    This can take a moment. Time remaining: <span className="font-bold">{countdown}s</span>
                  </p>
                  <div className="mt-8 text-center w-full max-w-sm">
                      <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#5c0b0a] mb-2">
                        <Lightbulb size={16} />
                        <span>Did you know?</span>
                      </div>
                      <AnimatePresence mode="wait">
                          <motion.p
                              key={factIndex}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.5 }}
                              className="text-gray-600 text-sm italic"
                          >
                              {funFacts[factIndex]}
                          </motion.p>
                      </AnimatePresence>
                  </div>
                </div>
              )}

              {!roomImagePreview && !isLoading && <div className="text-center text-gray-500 p-8"><ImageIcon size={64} className="mx-auto mb-4 opacity-40"/><h3 className="text-xl font-medium">Your visualization will appear here</h3><p className="mt-2">Start by selecting a room in Step 1.</p></div>}
              {previewImage && !isLoading && (
                <motion.button onClick={handleDownload} className="absolute bottom-4 right-4 z-20 bg-[#5c0b0a] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#4a0908] transition-all shadow-lg flex items-center gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} >
                  <Download size={18} /> Download
                </motion.button>
              )}
            </div>
            
            <div className="mt-6 flex justify-center">
              <motion.button
                onClick={handleSubmit}
                disabled={!canSubmit || isLoading}
                className="w-auto bg-gradient-to-r from-red-700 to-red-900 text-white font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.6 }}
              >
                {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Sparkles className="mr-2" />}
                {isLoading ? "Generating..." : "Visualize Now"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Helper Components ---
const ImageUploader = ({ onImageSelect, label = "Upload Photo" }) => {
  const [preview, setPreview] = useState(null);
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onImageSelect(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  return (
    <div className="text-center">
      <label className="cursor-pointer w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center hover:border-[#5c0b0a] transition-colors relative group">
        {preview ? ( <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-md" /> ) : (
          <>
            <UploadCloud className="w-10 h-10 text-gray-400 mb-2 group-hover:text-[#5c0b0a]" />
            <span className="font-semibold text-[#5c0b0a]">{label}</span>
          </>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </label>
    </div>
  );
};

const sampleRooms = [
    { name: 'Living Room', src: sampleRoom1 },
    { name: 'Bedroom', src: sampleRoom2 },
    { name: 'Dining Room', src: sampleRoom3 },
    { name: 'Modern Hall', src: sampleRoom4 },
];

const SampleRoomGallery = ({ onRoomSelect, selectedRoomName }) => (
    <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-600 mb-3 text-center">- OR -</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sampleRooms.map((room) => (
                <button key={room.name} onClick={() => onRoomSelect(room.src, room.name)} className="relative rounded-lg overflow-hidden border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5c0b0a] transition-transform hover:scale-105 group">
                    <img src={room.src} alt={room.name} className="w-full h-20 object-cover" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                    <p className="absolute bottom-1 left-2 text-xs font-bold text-white drop-shadow-md">{room.name}</p>
                    {selectedRoomName === room.name && (
                        <div className="absolute inset-0 bg-green-700/80 flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-white" />
                        </div>
                    )}
                </button>
            ))}
        </div>
    </div>
);

export default RugVisualizer;

