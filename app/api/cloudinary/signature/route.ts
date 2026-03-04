import { getSignature } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { signature, timestamp } = getSignature();
    
    return NextResponse.json({ 
      signature,
      timestamp,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: 'xpromo'
    });
  } catch (error) {
    console.error('Error generating signature:', error);
    return NextResponse.json(
      { error: 'Failed to generate signature' },
      { status: 500 }
    );
  }
}