import React from "react";
import { Card, CardContent } from "../ui/card";

const GroupWrapperSubsection = () => {
  return (
    <section className="w-full py-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-normal text-m-3refprimaryprimary-30 mb-8 font-['Playfair_Display',Helvetica] leading-[44px]">
              The Founder
            </h2>
            <p className="text-base text-black font-['Jost',Helvetica] font-normal leading-7">
              Established in 1970, Safina Carpets has its roots in the Mughal
              era, where carpets adorned royal courts and symbolised luxury and
              refinement.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <div
                  className="w-full h-[325px] bg-cover bg-center rounded-md"
                  style={{
                    backgroundImage:
                      "url(https://c.animaapp.com/7kq845Cv/img/firefly-create-a-realistic-image-of-a-luxurious-mughal-inspired-.png)",
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupWrapperSubsection;
