import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { deleteCloudinaryImage } from '@/lib/cloudinary-actions';

// Configure cloudinary (server-side only)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// POST - Upload a product image
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image } = body;
    
    // Validate image data
    if (!image) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      );
    }
    
    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(image, {
      folder: 'xpromo/products',
      resource_type: 'auto', // This helps with base64 uploads
      transformation: [
        { quality: 'auto:good', fetch_format: 'auto' }
      ]
    });
    
    return NextResponse.json({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image', message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete a product image from Cloudinary
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('publicId');
    
    if (!publicId) {
      return NextResponse.json(
        { error: 'Public ID is required' },
        { status: 400 }
      );
    }
    
    const result = await deleteCloudinaryImage(publicId);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to delete image', details: result.error },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image', message: error.message },
      { status: 500 }
    );
  }
}