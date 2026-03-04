import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { uploadToCloudinary } from '@/lib/cloudinary-actions';

// Configure Cloudinary (server-side only)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// POST - Direct server-side upload to Cloudinary for project logos
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
    
    // Upload image to Cloudinary in project-logos folder
    const result = await uploadToCloudinary(image, 'xpromo/project-logos');
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to upload image', details: result.error },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      url: result.url,
      publicId: result.publicId
    });
  } catch (error: any) {
    console.error('Error uploading project logo:', error);
    return NextResponse.json(
      { error: 'Failed to upload image', message: error.message },
      { status: 500 }
    );
  }
} 