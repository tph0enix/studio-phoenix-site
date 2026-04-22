"use client";

import React, { useEffect, useState } from 'react';

interface PhoenixLogoProps {
  src: string;
  className?: string;
}

export const PhoenixLogo = ({ src, className }: PhoenixLogoProps) => {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((data) => {
        const cleanSvg = data.replace(/<\?xml.*\?>/g, '');
        setSvgContent(cleanSvg);
      })
      .catch((err) => console.error("Error loading SVG:", err));
  }, [src]);

  return (
    <div 
      className={`${className} phoenix-logo-container`}
      dangerouslySetInnerHTML={{ __html: svgContent }} 
    />
  );
};