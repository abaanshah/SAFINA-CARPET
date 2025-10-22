import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import sampleRoom1 from "@/assets/sample-room-1.jpg";
import sampleRoom2 from "@/assets/sample-room-2.jpg";
import sampleRoom3 from "@/assets/sample-room-3.jpg";
import sampleRoom4 from "@/assets/sample-room-4.jpg";
import rugroom from "@/assets/rugroom.jpg";
import rugroom2 from "@/assets/rugroom2.jpg";
import rugroom3 from "@/assets/rugroom3.jpg";
import rugroom4 from "@/assets/rugroom4.jpg";
import rugroom5 from "@/assets/rugroom5.jpg";
import rugroom6 from "@/assets/rugroom6.jpg";

interface SampleRoomGalleryProps {
  onRoomSelect: (file: File, roomName: string) => void;
  selectedRoom: string | null;
}

// --- UPDATED: Unique IDs, Names, and Descriptions ---
const sampleRooms = [
  {
    id: "living-room",
    name: "Modern Living Room",
    image: sampleRoom1,
    description: "Spacious living area with hardwood floors",
  },
  {
    id: "bedroom",
    name: "Cozy Bedroom",
    image: sampleRoom2,
    description: "Warm bedroom with natural lighting",
  },
  {
    id: "dining-room",
    name: "Elegant Dining Room",
    image: sampleRoom3,
    description: "Perfect for large area rugs",
  },
  {
    id: "office",
    name: "Luxury Office",
    image: sampleRoom4,
    description: "Modern workspace with polished floors",
  },
  {
    id: "rugroom-1",
    name: "Classic Nook",
    image: rugroom,
    description: "Elegant rug for a cozy corner",
  },
  {
    id: "rugroom-2",
    name: "Modern Study",
    image: rugroom2,
    description: "A professional touch for your office",
  },
  {
    id: "rugroom-3",
    name: "Bright Hallway",
    image: rugroom3,
    description: "Welcoming and warm runner",
  },
  {
    id: "rugroom-4",
    name: "Minimalist Lounge",
    image: rugroom4,
    description: "Clean design for a modern space",
  },
  {
    id: "rugroom-5",
    name: "Executive Suite",
    image: rugroom5,
    description: "Bold patterns for a statement office",
  },
  {
    id: "rugroom-6",
    name: "Sunlit Den",
    image: rugroom6,
    description: "A bright rug for a bright room",
  },
];

const SampleRoomGallery = ({
  onRoomSelect,
  selectedRoom,
}: SampleRoomGalleryProps) => {
  const convertImageToFile = async (
    imageUrl: string,
    fileName: string
  ): Promise<File> => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  };

  const handleRoomSelect = async (room: (typeof sampleRooms)[0]) => {
    try {
      const file = await convertImageToFile(room.image, `${room.id}.jpg`);
      onRoomSelect(file, room.name);
    } catch (error) {
      console.error("Error converting image to file:", error);
    }
  };

  return (
    <Card className="p-6 bg-gradient-warm shadow-soft">
      <h3 className="font-semibold text-foreground mb-4">
        Or Choose a Sample Room
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sampleRooms.map((room) => (
          // --- FIX: Using the now-unique room.id as the key ---
          <div key={room.id} className="relative group">
            <div
              className={`relative rounded-lg overflow-hidden cursor-pointer transition-smooth border-2 ${
                selectedRoom === room.name
                  ? "border-primary shadow-glow"
                  : "border-transparent hover:border-primary/50"
              }`}
              onClick={() => handleRoomSelect(room)}
            >
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-24 md:h-32 object-cover transition-smooth group-hover:scale-105"
              />

              {selectedRoom === room.name && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="bg-primary text-white p-1 rounded-full">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-smooth">
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-medium">{room.name}</p>
                  <p className="text-white/80 text-xs">{room.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SampleRoomGallery;

