import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/mongodb';
import { authOptions } from '@/app/api/auth/options';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// POST - Reset a user's password (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is an admin
    if (!session?.user?.id || session?.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }
    
    await connectToDatabase();
    
    // Get userId from request body
    const { userId } = await request.json();
    
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: 'Invalid or missing user ID' },
        { status: 400 }
      );
    }
    
    // Find the user
    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Generate a random temporary password (8 characters)
    const tempPassword = crypto.randomBytes(4).toString('hex');
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(tempPassword, 12);
    
    // Update the user's password
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    
    // Return the temporary password (in a real app, you might send this via email)
    return NextResponse.json({ 
      message: 'Password reset successfully',
      tempPassword 
    });
  } catch (error: any) {
    console.error('Error resetting password:', error);
    return NextResponse.json(
      { error: 'Failed to reset password', message: error.message },
      { status: 500 }
    );
  }
}