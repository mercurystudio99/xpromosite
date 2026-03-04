/**
 * Client-side only Cloudinary utility functions
 * These functions are safe to use in client components and avoid Node.js specific imports
 */

/**
 * Convert File to base64 string for upload
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Upload image to Cloudinary via our API endpoint
 */
export const uploadImage = async (file: File): Promise<{url: string; publicId: string}> => {
  try {
    // Convert file to base64
    const base64Data = await fileToBase64(file);
    
    // Send to our API endpoint
    const response = await fetch('/api/products/upload-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Data }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to upload image');
    }
    
    return await response.json();
  } catch (error: any) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Delete image from Cloudinary via our API endpoint
 */
export const deleteImage = async (publicId: string): Promise<{success: boolean}> => {
  try {
    const response = await fetch(`/api/products/upload-image?publicId=${encodeURIComponent(publicId)}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete image');
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting image:', error);
    return { success: false };
  }
};

/**
 * Get optimized URL with transformations
 */
export const getOptimizedUrl = (url: string, options: {
  width?: number,
  height?: number,
  crop?: string,
  quality?: number,
  format?: string
} = {}) => {
  if (!url) return '';
  
  const {
    width = 800,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto'
  } = options;
  
  try {
    // Only process Cloudinary URLs
    if (!url.includes('cloudinary.com')) return url;

    // Find where the upload/ part starts
    const uploadIndex = url.indexOf('/upload/');
    if (uploadIndex === -1) return url;

    // Split the URL to insert transformations
    const baseUrl = url.substring(0, uploadIndex + 8); // Include '/upload/'
    const restUrl = url.substring(uploadIndex + 8);

    // Build transformation string
    const transform = [
      `w_${width}`,
      height ? `h_${height}` : '',
      `c_${crop}`,
      `q_${quality}`,
      `f_${format}`
    ].filter(Boolean).join(',');

    return `${baseUrl}${transform}/${restUrl}`;
  } catch (e) {
    console.error('Error generating optimized URL:', e);
    return url;
  }
};