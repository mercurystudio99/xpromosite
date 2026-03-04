import { v2 as cloudinary } from 'cloudinary';

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Delete an image from Cloudinary
 * @param publicId - The public ID of the image to delete
 * @returns Object indicating success or failure
 */
export async function deleteCloudinaryImage(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { 
      success: result.result === 'ok', 
      error: result.result !== 'ok' ? result : null 
    };
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    return { success: false, error };
  }
}

/**
 * Upload an image to Cloudinary
 * @param fileUrl - The URL or base64 data of the image to upload
 * @param folder - Optional folder path
 * @returns The upload result with secure_url and public_id
 */
export async function uploadToCloudinary(fileUrl: string, folder = 'xpromo/products') {
  try {
    const uploadResult = await cloudinary.uploader.upload(fileUrl, {
      folder,
      resource_type: 'image',
      transformation: [
        { quality: 'auto:good', fetch_format: 'auto' }
      ]
    });
    
    return {
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return { success: false, error };
  }
}

/**
 * Get optimized URL with transformations
 * @param url - The original image URL
 * @param options - Transformation options
 * @returns The optimized URL
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