import { NextRequest, NextResponse } from 'next/server';
import { getSignature } from '@/lib/cloudinary';

// Generate upload signature for Cloudinary
export async function GET(req: NextRequest) {
  try {
    const { signature, timestamp, folder } = getSignature('xpromo/categories');
    
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