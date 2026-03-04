"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Check, Trash, UploadCloud, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { uploadImage } from "@/lib/cloudinary-client";

interface ProductImageGalleryProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export function ProductImageGallery({
  images,
  onChange,
  maxImages = 10,
}: ProductImageGalleryProps) {
  const [isUploading, setIsUploading] = useState(false);

  // Handle file selection for upload
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      toast.error(`You can only upload a maximum of ${maxImages} images`);
      return;
    }

    setIsUploading(true);
    
    try {
      // Upload each file using our client-side utility
      const newImages: string[] = [];
      
      for (const file of Array.from(files)) {
        // Use our client-safe utility to upload the image
        const result = await uploadImage(file);
        newImages.push(result.url);
      }
      
      // Update the images list
      const updatedImages = [...images, ...newImages];
      onChange(updatedImages);
      toast.success('Images uploaded successfully');
      
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
      // Reset the file input
      e.target.value = '';
    }
  };

  // Handle image removal
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  // Handle drag and drop reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onChange(items);
  };

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="product-images" direction="horizontal">
          {(provided) => (
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {images.map((image, index) => (
                <Draggable key={image} draggableId={image} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="border rounded-md p-2 relative group"
                    >
                      <div className="aspect-square bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                        <Image
                          src={image}
                          alt={`Product image ${index + 1}`}
                          width={200}
                          height={200}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      {index === 0 && (
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            <Check className="mr-1 h-3 w-3" />
                            Main
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

              {images.length < maxImages && (
                <label className="border border-dashed rounded-md aspect-square flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    multiple
                    onChange={handleFileSelect}
                    disabled={isUploading}
                  />
                  {isUploading ? (
                    <>
                      <Loader2 className="h-10 w-10 text-gray-400 animate-spin mb-2" />
                      <p className="text-sm font-medium">Uploading...</p>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="h-10 w-10 text-gray-300 mb-2" />
                      <p className="text-sm font-medium">Upload Image</p>
                      <p className="text-xs text-muted-foreground">
                        Click to upload
                      </p>
                    </>
                  )}
                </label>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      <div className="text-sm text-muted-foreground">
        <p>Drag images to reorder. First image will be the main product image.</p>
        <p>You can upload up to {maxImages} images (currently {images.length}/{maxImages}).</p>
      </div>
    </div>
  );
}