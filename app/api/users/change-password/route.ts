import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/mongodb';
import { authOptions } from '@/app/api/auth/options';
import bcrypt from 'bcryptjs';

// POST - Change password
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectToDatabase();

        const { currentPassword, newPassword } = await request.json();

        // Validate input
        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { error: 'Current password and new password are required' },
                { status: 400 }
            );
        }

        // Get user with password
        const user = await User.findById(session.user.id);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Check if current password is correct
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Current password is incorrect' },
                { status: 400 }
            );
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Update user's password
        await User.findByIdAndUpdate(
            session.user.id,
            { $set: { password: hashedPassword } },
            { runValidators: true }
        );

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error changing password:', error);
        return NextResponse.json(
            { error: 'Failed to change password', message: error.message },
            { status: 500 }
        );
    }
}