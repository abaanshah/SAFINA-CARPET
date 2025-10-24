import React, { useState } from 'react';

export default function Story() {
  const [activeTab, setActiveTab] = useState('STORIES');
  
  const tabsData = {
    'STORIES': {
      title: 'STORY',
      content: 'Lorem ipsum dolor sit amet consectetur. Vel vulputate gravida vulputate sapien volutpat et magna sed. Mattis massa diam condimentum in bibendum dolor dapibus. Scelerisque tempor purus felis ultricies neque quam mauris sem luctus. Auctor in morbi a viverra aliquam aliquet.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Three elderly men sitting on marble steps reading'
    },
    'GUIDE': {
      title: 'GUIDE',
      content: 'Discover comprehensive guides to help you navigate through our curated collections. Our expert team provides detailed insights into furniture selection, interior design principles, and space optimization. From contemporary minimalism to classic elegance, we guide you through every step of creating your perfect living space.',
      image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Interior design consultation with blueprints and samples'
    },
    'VISION': {
      title: 'VISION',
      content: 'Our vision is to transform living spaces into personal sanctuaries that reflect individual style and comfort. We believe that great design should be accessible to everyone, combining functionality with aesthetic appeal. Through innovative solutions and timeless pieces, we create environments that inspire and nurture the human spirit.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Modern living room with natural lighting and plants'
    },
    'HERITAGE': {
      title: 'HERITAGE',
      content: 'With decades of craftsmanship heritage, we honor traditional techniques while embracing modern innovation. Our legacy spans generations of artisans who have perfected the art of furniture making. Each piece tells a story of dedication, quality, and the timeless pursuit of excellence in design and construction.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Traditional craftsman working on wooden furniture'
    },
    'SERVICES': {
      title: 'SERVICES',
      content: 'We offer comprehensive interior design services including space planning, furniture selection, custom design solutions, and project management. Our team of experienced designers works closely with clients to bring their vision to life, ensuring every detail meets the highest standards of quality and style.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Professional interior design service consultation'
    }
  };

  const tabs = ['STORIES', 'GUIDE', 'VISION', 'HERITAGE', 'SERVICES'];

  return (
    <div className="max-w-7xl mx-auto bg-gray-50">
      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        {/* Mobile: Horizontal scrollable tabs */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto px-4 py-4 space-x-4 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 text-sm font-medium tracking-wide transition-colors duration-200 hover:text-red-700 px-3 py-2 rounded-lg whitespace-nowrap ${
                  activeTab === tab 
                    ? 'text-red-700 bg-red-50 border border-red-200' 
                    : 'text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        {/* Desktop: Regular tab layout */}
        <div className="hidden md:flex justify-evenly px-10 py-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg font-medium tracking-wide transition-colors duration-200 hover:text-red-700 ${
                activeTab === tab 
                  ? 'text-red-700 border-b-2 border-red-700 pb-1' 
                  : 'text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Mobile: Image first, then text (flex-col) */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12">
            {/* Image - Shows first on mobile */}
            <div className="w-full md:flex-1 md:max-w-2xl order-1 md:order-2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={tabsData[activeTab].image}
                  alt={tabsData[activeTab].alt}
                  className="w-full h-full object-cover transition-opacity duration-500"
                  key={activeTab} // Force re-render for smooth transition
                />
              </div>
            </div>

            {/* Text Content - Shows second on mobile */}
            <div className="w-full md:flex-1 md:max-w-lg order-2 md:order-1">
              <h2 className="text-2xl md:text-4xl font-light text-gray-900 mb-4 md:mb-6">
                {tabsData[activeTab].title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                {tabsData[activeTab].content}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="flex justify-center pb-8">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-red-700 w-8' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}