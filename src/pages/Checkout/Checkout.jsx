import React from "react";
import { PaymentSection } from "../../components/checkOut/PaymentSection";
import { ShippingAddressSection } from "../../components/Checkout/ShippingAddressSection";
export const CheckOut = () => {
  return (
    <div className="bg-white min-h-screen w-full">
      <div className="max-w-7xl mx-auto">
        {/* Simple Header */}
      
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                className="w-6 h-6"
                alt="Location"
                src="https://c.animaapp.com/oLaUSUeq/img/mdi-light-map-marker.svg"
              />
              <span className="hidden sm:inline text-white text-sm">
                Book an Appointment
              </span>
            </div>

            <div className="text-center">
              <h1 className="text-white text-xl font-bold tracking-wide">
                SAFINA CARPETS
              </h1>
            </div>

            <div className="flex items-center">
              <img
                className="w-6 h-6"
                alt="Cart"
                src="https://c.animaapp.com/oLaUSUeq/img/mdi-light-cart.svg"
              />
            </div>
          </div>
   

        {/* Main Content */}
        <main className="w-full">
          <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Payment Section - Left on desktop, bottom on mobile */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1 bg-gray-50">
              <PaymentSection />
            </div>

            {/* Shipping Address Section - Right on desktop, top on mobile */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2 bg-white">
              <ShippingAddressSection />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
