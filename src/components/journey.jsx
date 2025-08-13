import React, { useEffect } from 'react';

const imageNames = [
  'm1.jpg',
  'm2.jpg',
  'm3.jpg',
  'm4.jpg',
  'm5.JPG',
  'm6.jpg',
  'm7.JPG',
  'm8.JPG',
  'm9.JPG',
];

function Marquee() {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes marqueeScroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="overflow-hidden bg-[#FAF3E7] border-y border-[#C69C6D]/30 py-8">
      <div
        className="flex gap-8 whitespace-nowrap animate-marquee px-6"
        style={{
          animation: 'marqueeScroll 30s linear infinite',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = 'paused';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = 'running';
        }}
      >
        {[...imageNames, ...imageNames].map((img, index) => (
          <img
            key={index}
            src={`/${img}`}
            alt={`udyam-marquee-${index}`}
            className="w-48 h-32 object-cover rounded-xl border border-[#C69C6D]/30 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          />
        ))}
      </div>
    </div>
  );
}

export default Marquee;
