
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
 * Upload a project logo to Cloudinary
 * @param logoFile - Base64 encoded image data
 * @returns URL of the uploaded image
 */
export const uploadProjectLogo = async (logoFile: File): Promise<string> => {
  try {
    // Convert file to base64
    const base64Data = await fileToBase64(logoFile);
    
    // Send to our public API endpoint (no authentication required)
    const response = await fetch('/api/projects/upload-logo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Data }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to upload logo');
    }
    
    const result = await response.json();
    // Return just the URL string, not the entire object
    return result.url;
  } catch (error: any) {
    console.error('Error uploading logo:', error);
    throw error;
  }
};

/**
 * Delete a project logo from Cloudinary
 * @param logoUrl - URL of the image to delete
 */
export const deleteProjectLogo = async (logoUrl: string): Promise<void> => {
  try {
    // Extract the public ID from the URL
    const publicId = logoUrl.split('/').slice(-1)[0].split('.')[0];
    const fullPublicId = `xpromo/project-logos/${publicId}`;
    
    // Send to our API endpoint
    const response = await fetch('/api/users/delete-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl: logoUrl, publicId: fullPublicId }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete logo');
    }
    
    await response.json();
  } catch (error: any) {
    console.error('Error deleting project logo:', error);
    throw error;
  }
};