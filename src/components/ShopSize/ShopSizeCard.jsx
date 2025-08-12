import React from "react";

export default function ShopSizeCard({
  image = "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
  title = "Card title",
  className = "",
}) {
  return (
    <article
      className={`max-w-sm w-full bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-[1.01] ${className}`}
      aria-label={title}
    >
      <div className="h-[420px] md:h-[360px] flex flex-col">
        <div className="h-1/2 w-full relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" aria-hidden />
        </div>

        <div className="h-1/2 p-4 flex items-center justify-center">
          <h3 className="text-lg md:text-xl font-semibold text-slate-900 text-center">
            {title}
          </h3>
        </div>
      </div>
    </article>
  );
}
