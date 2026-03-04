/**
 * Client-side utility functions for user profile management
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
 * Upload profile image to Cloudinary via our API endpoint
 */
export const uploadProfileImage = async (file: File): Promise<{url: string; publicId: string}> => {
  try {
    // Convert file to base64
    const base64Data = await fileToBase64(file);
    
    // Send to our API endpoint
    const response = await fetch('/api/users/upload-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Data }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to upload profile image');
    }
    
    return await response.json();
  } catch (error: any) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};