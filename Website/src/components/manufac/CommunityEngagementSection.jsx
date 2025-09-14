import React from "react";

const CommunityEngagementSection = () => {
  const founderInfo = {
    title: "The Founder",
    paragraphs: [
      "Established in 1970, Safina Carpets has its roots in the Mughal era, where carpets adorned royal courts and symbolised luxury and refinement.",
      "Established in 1970, Safina Carpets has its roots in the Mughal era, where carpets adorned royal courts and symbolised luxury and refinement.",
    ],
    imageUrl:
      "https://c.animaapp.com/7kq845Cv/img/parham-moieni-adoi9b6wzuo-unsplash.png",
  };

  return (
    <section className="w-full py-5 px-1">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-[550px] h-[325px] overflow-hidden">
            <img
              src={founderInfo.imageUrl}
              alt="The Founder"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="font-['Playfair_Display',Helvetica] font-normal text-m-3refprimaryprimary-30 text-4xl mb-6">
              {founderInfo.title}
            </h2>

            <div className="space-y-6">
              {founderInfo.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-['Jost',Helvetica] font-normal text-black text-base leading-7"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityEngagementSection;
