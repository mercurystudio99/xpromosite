"use client";

import { useState, useCallback } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import { Upload, Image, Loader2 } from 'lucide-react';

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
  className?: string;
  previewUrl?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  folder?: string;
  buttonText?: string;
}

export const CloudinaryUpload = ({
  onUpload,
  className = "",
  previewUrl,
  variant = "outline",
  folder = "xpromo",
  buttonText = "Upload Image"
}: CloudinaryUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleUpload = useCallback((result: any) => {
    setIsLoading(false);
    onUpload(result.info.secure_url);
  }, [onUpload]);

  return (
    <div className={`space-y-4 ${className}`}>
      {previewUrl && (
        <div className="relative h-40 w-40 rounded-md overflow-hidden">
          <img
            src={previewUrl}
            alt="Uploaded image"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onUpload={handleUpload}
        options={{
          maxFiles: 1,
          folder: folder,
          resourceType: "image",
          clientAllowedFormats: ["png", "jpeg", "jpg", "webp"],
          maxImageFileSize: 2000000, // 2MB
        }}
      >
        {({ open }) => {
          const handleClick = () => {
            setIsLoading(true);
            open();
          };

          return (
            <Button
              type="button"
              variant={variant}
              onClick={handleClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : previewUrl ? (
                <Image className="h-4 w-4 mr-2" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {buttonText}
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};