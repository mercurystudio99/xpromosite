import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/options';
import { v2 as cloudinary } from 'cloudinary';
import { getSignature } from '@/lib/cloudinary';
import { uploadToCloudinary } from '@/lib/cloudinary-actions';

// Configure Cloudinary (server-side only)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// GET - Generate upload signature for Cloudinary
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Generate signature for the user profiles folder
    const { signature, timestamp, folder } = getSignature('xpromo/profiles');
    
    return NextResponse.json({
      signature,
      timestamp,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: folder,
    });
  } catch (error: any) {
    console.error('Error generating upload signature:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload signature', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Direct server-side upload to Cloudinary
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
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
    const result = await uploadToCloudinary(image, 'xpromo/profiles');
    
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
    console.error('Error uploading profile image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image', message: error.message },
      { status: 500 }
    );
  }
}