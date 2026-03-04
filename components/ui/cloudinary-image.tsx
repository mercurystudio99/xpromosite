"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface CloudinaryImageProps extends Omit<ImageProps, "src"> {
  src: string;
}

export function CloudinaryImage({ src, alt, ...props }: CloudinaryImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Replace with your default image placeholder
  const fallbackSrc = "/placeholder.svg";
  
  // Handle external URLs that might not be from Cloudinary
  const isCloudinaryUrl = 
    src?.startsWith("https://res.cloudinary.com/") || 
    src?.startsWith("/");
  
  const imageSrc = error || !src ? fallbackSrc : src;

  return (
    <div className="overflow-hidden relative" 
      style={{
        width: typeof props.width === "number" ? `${props.width}px` : props.width,
        height: typeof props.height === "number" ? `${props.height}px` : props.height,
      }}
    >
      <Image
        {...props}
        src={imageSrc}
        alt={alt || "Product image"}
        fill={!props.width || !props.height}
        className={`${props.className || ""} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
      />
      
      {isLoading && (
        <div className="absolute inset-0 bg-muted/30 animate-pulse rounded-md" />
      )}
    </div>
  );
}