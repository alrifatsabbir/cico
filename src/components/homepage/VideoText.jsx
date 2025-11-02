'use client';

import React, { ElementType, ReactNode, useEffect, useState, useRef, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
const cn = (...inputs) => {
  return inputs.filter(Boolean).join(" ");
};
export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 18,
  fontWeight = "bold",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  as: asProp = "div",
  letterSpacing,
  textTransform = "none",
  onVideoLoad,
  onVideoError,
  sources = [],
  poster
}) {
  const Component = asProp;
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const content = useMemo(() => {
    return React.Children.toArray(children).map(child => {
      if (typeof child === 'string' || typeof child === 'number') {
        return child;
      }
      return '';
    }).join('');
  }, [children]);
  const svgMask = useMemo(() => {
    const responsiveFontSize = typeof fontSize === "number" ? `${fontSize}vw` : fontSize;
    const escapedContent = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    const svgString = `
      <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
        <text 
          x='50%' 
          y='50%' 
          font-size='${responsiveFontSize}' 
          font-weight='${fontWeight}' 
          text-anchor='${textAnchor}' 
          dominant-baseline='${dominantBaseline}' 
          font-family='${fontFamily}'
          ${letterSpacing ? `letter-spacing='${letterSpacing}'` : ''}
          ${textTransform !== 'none' ? `text-transform='${textTransform}'` : ''}
        >
          ${escapedContent}
        </text>
      </svg>
    `;
    return `url("data:image/svg+xml,${encodeURIComponent(svgString.trim())}")`;
  }, [content, fontSize, fontWeight, textAnchor, dominantBaseline, fontFamily, letterSpacing, textTransform]);
  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
    onVideoLoad?.();
  }, [onVideoLoad]);
  const handleVideoError = useCallback(event => {
    console.error('Video failed to load:', event);
    onVideoError?.(event.nativeEvent);
  }, [onVideoError]);
  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.play().catch(error => {
        console.warn('Autoplay was prevented:', error);
      });
    }
  }, [autoPlay]);
  return <Component className={cn("relative w-full h-full overflow-hidden", className)}>
      {}
      <div className={cn("absolute inset-0 flex items-center justify-center", !isVideoLoaded && "opacity-0 transition-opacity duration-500")} style={{
      maskImage: svgMask,
      WebkitMaskImage: svgMask,
      maskSize: "contain",
      WebkitMaskSize: "contain",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center",
      opacity: isVideoLoaded ? 1 : 0,
      transition: "opacity 0.5s ease-in-out"
    }}>
        <video ref={videoRef} className="w-full h-full object-cover" autoPlay={autoPlay} muted={muted} loop={loop} preload={preload} playsInline poster={poster} onLoadedData={handleVideoLoad} onError={handleVideoError}>
          {}
          <source src={src} type="video/mp4" />
          
          {}
          {sources.map((source, index) => <source key={index} src={source.src} type={source.type} />)}
          
          Your browser does not support the video tag.
        </video>
      </div>

      {}
      {!isVideoLoaded && <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-opacity-50">Loading...</div>
        </div>}

      {}
      <span className="sr-only">{content}</span>
    </Component>;
}
export default function Videotext() {
  return <main className="text-white flex items-center justify-center w-screen h-[400px] overflow-hidden">
      <div className="w-full h-1/2 max-w-4xl text-border-5-purple-100">
        <Link to={'/'}>
        <VideoText src="https://ls29t3z55w.ufs.sh/f/JEKFIJDsOBct0vrmLYJRG8BKHmvZQkWJ9ElIVcNfzPg63Mbo" fontFamily="Helvetica, Arial, sans-serif" fontSize={20} letterSpacing="0.05em" textTransform="uppercase" sources={[{
        src: "fallback.webm",
        type: "video/webm"
      }, {
        src: "fallback.ogv",
        type: "video/ogg"
      }]} onVideoLoad={() => console.log('Video loaded successfully')} onVideoError={error => console.error('Video error:', error)}>
              CICO
          </VideoText>
        </Link>
      </div>
    </main>;
}