import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import Project from '@/models/Project';
import { connectToDatabase } from '@/lib/mongodb';
import { authOptions } from '@/app/api/auth/options';

// POST - Create a new project submission
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Get form data
    const data = await request.json();
    
    // Create new project in database
    const project = await Project.create(data);
    
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    console.error('Error creating project:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors: Record<string, string> = {};
      
      // Extract validation error messages
      Object.keys(error.errors).forEach((key) => {
        validationErrors[key] = error.errors[key].message;
      });
      
      return NextResponse.json(
        { error: 'Validation failed', validationErrors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create project', message: error.message },
      { status: 500 }
    );
  }
}

// GET - List all projects (admin only)
export async function GET(request: NextRequest) {
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
    
    // Get query params for filtering
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    
    // Build filter object
    const filter: Record<string, any> = {};
    
    // Add status filter if provided
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    // Add search filter if provided
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { projectFor: { $regex: search, $options: 'i' } },
      ];
    }
    
    // Find projects with filters and sort by newest first
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects', message: error.message },
      { status: 500 }
    );
  }
}