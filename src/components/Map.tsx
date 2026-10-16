"use client";

import React from 'react';

const Map = () => {
  // Using a standard embed URL format for the location
  const embedUrl = "https://maps.google.com/maps?q=Farm%20Masters%20Village%20III&t=&z=13&ie=UTF8&iwloc=&output=embed";

  return (
    <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
      <iframe
        title="Farm Masters Village III Location"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        src={embedUrl}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;