import React from "react";
import { AboutUsSection } from "../../components/Services/AboutUsSection";
// import { FooterSection } from "../components/layout/FooterSection";
// import { HeaderSection } from "../components/layout/HeaderSection";
import { ServicesSection } from "../../components/Services/ServicesSection";

export const Services = () => {
  return (
    <main className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-full max-w-[1440px] relative">
        {/* <HeaderSection /> */}
        <ServicesSection />
        <AboutUsSection />
        {/* <FooterSection /> */}
      </div>
    </main>
  );
};