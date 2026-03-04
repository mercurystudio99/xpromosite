"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, Loader2, UploadCloud } from 'lucide-react';
import { uploadProfileImage } from '@/lib/user-profile';
import { CloudinaryImage } from './cloudinary-image';
import Image from 'next/image';

interface ProfileImageUploadProps {
    onUpload: (url: string) => void;
    profileImage: string | null;
    className?: string;
}

export function ProfileImageUpload({
    onUpload,
    profileImage,
    className = "",
}: ProfileImageUploadProps) {
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
            setError('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            setError('Image size should be less than 2MB');
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            // Upload the image using our custom function
            const result = await uploadProfileImage(file);

            // Call the onUpload callback with the URL
            onUpload(result.url);
        } catch (err: any) {
            console.error('Error uploading profile image:', err);
            setError(err.message || 'Failed to upload image');
        } finally {
            setIsLoading(false);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full overflow-hidden mb-4 relative bg-gray-100 flex items-center justify-center">
                    {profileImage ? (
                        <CloudinaryImage
                            src={profileImage}
                            alt="Profile picture"
                            width={96}
                            height={96}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="text-gray-400">
                            <UploadCloud size={32} />
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    className="hidden"
                />

                <Button
                    type="button"
                    variant="outline"
                    onClick={handleButtonClick}
                    disabled={isLoading}
                    className="mb-1"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Uploading...
                        </>
                    ) : profileImage ? (
                        <>
                            <ImageIcon className="h-4 w-4 mr-2" />
                            Change Photo
                        </>
                    ) : (
                        <>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Photo
                        </>
                    )}
                </Button>

                {error && (
                    <p className="text-xs text-red-500 mt-1">{error}</p>
                )}

                <p className="text-xs text-muted-foreground mt-1">
                    JPEG, PNG or GIF. Max size 2MB.
                </p>
            </div>
        </div>
    );
}