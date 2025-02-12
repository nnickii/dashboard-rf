"use client";

import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface CardProps {
  title: string;
}

const Card: React.FC<CardProps> = ({ title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const hls = new Hls();

      hls.loadSource("https://your-server.com/stream.m3u8");
      hls.attachMedia(video);
    }
  }, []);

  return (
    <div className="w-[500px] h-[350px] bg-opacity-0: text-white flex flex-col items-center justify-center text-center p-4 rounded-lg shadow-lg">
      <p className="text-lg font-medium">{title}</p>
      <video ref={videoRef} className="w-full h-[300px] mt-2 rounded-md" 
      controls autoPlay playsInline />
    </div>
  );
};

export default Card;
