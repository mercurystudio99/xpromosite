import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import Order from '@/models/Order';
import { connectToDatabase } from '@/lib/mongodb';
import { authOptions } from '@/app/api/auth/options';

// GET - Get orders for the current logged in user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized - User must be logged in' },
        { status: 401 }
      );
    }
    
    await connectToDatabase();
    
    // Get query parameters for filtering and pagination
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter: any = { user: session.user.id };
    
    // Add status filter if provided
    if (status && status !== 'all') {
      filter.status = status.toUpperCase(); // Status is stored in uppercase in the database
    }
    
    // Find orders with filters and sort by newest first
    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate({
          path: 'items.product', 
          select: 'name price images slug'
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      
      Order.countDocuments(filter)
    ]);
    
    return NextResponse.json({
      orders,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      }
    });
  } catch (error: any) {
    console.error('Error fetching user orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders', message: error.message },
      { status: 500 }
    );
  }
}