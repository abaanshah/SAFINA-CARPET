import React from "react";
import "./ShopSize.css";
import ShopSizeCard from "./ShopSizeCard";
const ShopSize = () => {
  return (
    // <div className="shopsize_container">
     <section className="bg-[#E5E5E5] max-w-[100vw] mx-auto px-4 py-8">
      <h2 className="sizeheading">SHOP BY SIZE</h2>
      <div className="w-[90vw] m-auto grid gap-8 grid-cols-6">  <ShopSizeCard
          // image="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d"
          title="Mountain Escape"
         />

        <ShopSizeCard
          // image="https://images.unsplash.com/photo-1526403227224-60c2f4c1d95c"
          title="Coffee Culture"
 
        />

        <ShopSizeCard
          // image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          title="Ocean Breeze"
          description="Feel the salty air and the calming sound of waves."
          tags={["Beach", "Relax"]}
          ctaLabel="Book Now"
        />

        <ShopSizeCard
          // image="https://images.unsplash.com/photo-1491553895911-0055eca6402d"
          title="Urban Streets"
       
        />

        <ShopSizeCard
          // image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
          title="Tech Trends"
   
        />

        <ShopSizeCard
          // image="https://images.unsplash.com/photo-1556911220-e15b29be8c8f"
          title="Culinary Journey"
     
        />

        <ShopSizeCard
          // image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
          title="Cozy Corners"
         
        />

        <ShopSizeCard
          // image="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          title="Desert Vibes"
        
        />

        <ShopSizeCard
          // image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          title="Modern Living"
        
        />

        <ShopSizeCard
          // image="https://images.unsplash.com/photo-1534791547704-9f47f6b4b6c5"
          title="Street Food Finds"
        
        />

        <ShopSizeCard
          // image="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
          title="Snowy Peaks"
        
        />

        <ShopSizeCard
          // image="https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
          title="Festival Lights"
        
        />
      </div>
    </section>
    // </div>
  );
};

export default ShopSize;
