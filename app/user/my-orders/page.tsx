"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CloudinaryImage } from "@/components/ui/cloudinary-image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Icons
import {
  Download,
  Filter,
  FileText,
  ChevronDown,
  Search,
  Calendar,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  ShoppingBag,
  Box,
  MoreVertical,
  AlertCircle,
  Loader2,
  DollarSign,
  Tag,
  Clipboard,
  Building2,
  Phone,
  Mail,
} from "lucide-react";

// Define project interface based on your Project model
interface Project {
  _id: string;
  projectFor: string;
  budget: string;
  quantity: number;
  deadline?: string;
  noDeadline: boolean;
  logo?: string;
  specialInstructions?: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  status: 'new' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// Helper functions
const formatDate = (dateString?: string) => {
  if (!dateString) return 'No deadline';
  
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
          Completed
        </Badge>
      );
    case "in-progress":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Clock className="w-3.5 h-3.5 mr-1" />
          In Progress
        </Badge>
      );
    case "cancelled":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <XCircle className="w-3.5 h-3.5 mr-1" />
          Cancelled
        </Badge>
      );
    case "new":
    default:
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <Clock className="w-3.5 h-3.5 mr-1" />
          New
        </Badge>
      );
  }
};

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("date-desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const router = useRouter();
  const { data: session, status } = useSession();

  // Fetch projects when component mounts or when filters change
  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        setError(null);
        
        // Build query parameters
        const params = new URLSearchParams();
        params.append('page', currentPage.toString());
        params.append('limit', '10');
        
        if (activeTab !== "all") {
          params.append('status', activeTab);
        }
        
        const response = await fetch(`/api/projects/user?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const data = await response.json();
        setProjects(data.projects || []);
        setTotalPages(data.pagination.pages || 1);
        
      } catch (err: any) {
        console.error('Error fetching projects:', err);
        setError(err.message || 'Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    // Only fetch if user is logged in
    if (status === "authenticated") {
      fetchProjects();
    } else if (status === "unauthenticated") {
      router.push('/auth/signin?callbackUrl=/user/my-orders');
    }
  }, [activeTab, currentPage, status, router]);

  // Filter projects based on search query
  const filteredProjects = projects.filter((project) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        project.projectFor.toLowerCase().includes(query) ||
        project.company.toLowerCase().includes(query) ||
        project.name.toLowerCase().includes(query)
      );
    }
    return true;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "date-asc":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "quantity-desc":
        return b.quantity - a.quantity;
      case "quantity-asc":
        return a.quantity - b.quantity;
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const getProjectDetails = (projectId: string) => {
    return projects.find((project) => project._id === projectId);
  };

  // Handle page change for pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show loading state while checking authentication or loading projects
  if (status === "loading" || (isLoading && !error)) {
    return (
      <div className="container max-w-7xl mx-auto py-8 px-4 md:px-6 flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Loading your projects...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all your projects in one place
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Button variant="outline" onClick={() => router.push("/")}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search projects..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortBy("date-desc")}>
                    Newest First
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("date-asc")}>
                    Oldest First
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("quantity-desc")}>
                    Quantity (High-Low)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("quantity-asc")}>
                    Quantity (Low-High)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <TabsContent value="all" className="mt-6">
            <ProjectsList projects={sortedProjects} setSelectedProject={setSelectedProject} />
          </TabsContent>

          <TabsContent value="new" className="mt-6">
            <ProjectsList 
              projects={sortedProjects.filter(project => project.status === "new")} 
              setSelectedProject={setSelectedProject} 
            />
          </TabsContent>

          <TabsContent value="in-progress" className="mt-6">
            <ProjectsList 
              projects={sortedProjects.filter(project => project.status === "in-progress")} 
              setSelectedProject={setSelectedProject} 
            />
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <ProjectsList 
              projects={sortedProjects.filter(project => project.status === "completed")} 
              setSelectedProject={setSelectedProject} 
            />
          </TabsContent>

          <TabsContent value="cancelled" className="mt-6">
            <ProjectsList 
              projects={sortedProjects.filter(project => project.status === "cancelled")} 
              setSelectedProject={setSelectedProject} 
            />
          </TabsContent>
        </Tabs>

        {/* Project Details Modal/Section */}
        {selectedProject && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">
                      Project Details
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Project for {getProjectDetails(selectedProject)?.projectFor}
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="mt-3 md:mt-0" 
                    onClick={() => setSelectedProject(null)}
                  >
                    Back to Projects
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {getProjectDetails(selectedProject) && (
                  <ProjectDetail project={getProjectDetails(selectedProject)!} />
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {!selectedProject && sortedProjects.length > 0 && totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    isActive={currentPage === i + 1}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              )).slice(
                Math.max(0, currentPage - 3), 
                Math.min(totalPages, currentPage + 2)
              )}
              
              {currentPage + 2 < totalPages && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}

interface ProjectsListProps {
  projects: Project[];
  setSelectedProject: (id: string) => void;
}

function ProjectsList({ projects, setSelectedProject }: ProjectsListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center p-10 border rounded-lg bg-background">
        <Box className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No projects found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You don't have any projects yet.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[180px]">Project For</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project._id} className="group">
              <TableCell className="font-medium">{project.projectFor}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  {formatDate(project.createdAt)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                  {project.budget}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Tag className="mr-1 h-4 w-4 text-muted-foreground" />
                  {project.quantity}
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(project.status)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedProject(project._id)}>
                      <FileText className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    {project.status === "new" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">
                          <XCircle className="mr-2 h-4 w-4" />
                          Cancel Project
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  const deadlineDisplay = project.noDeadline 
    ? "No deadline" 
    : project.deadline 
      ? formatDate(project.deadline)
      : "Not specified";
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-8">
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground">Submission Date</h4>
          <div className="flex items-center mt-1">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{formatDate(project.createdAt)}</span>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground">Project Status</h4>
          <div className="mt-1">{getStatusBadge(project.status)}</div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground">Deadline</h4>
          <div className="mt-1">{deadlineDisplay}</div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-3">Project Details</h4>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <Clipboard className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
              <div>
                <div className="text-sm font-medium">Project For</div>
                <div className="text-muted-foreground">{project.projectFor}</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <DollarSign className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
              <div>
                <div className="text-sm font-medium">Budget</div>
                <div className="text-muted-foreground">{project.budget}</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <Tag className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
              <div>
                <div className="text-sm font-medium">Quantity</div>
                <div className="text-muted-foreground">{project.quantity}</div>
              </div>
            </div>
            
            {project.specialInstructions && (
              <div className="flex items-start">
                <FileText className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
                <div>
                  <div className="text-sm font-medium">Special Instructions</div>
                  <div className="text-muted-foreground whitespace-pre-wrap">{project.specialInstructions}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-3">Contact Information</h4>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <Building2 className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
              <div>
                <div className="text-sm font-medium">Company</div>
                <div className="text-muted-foreground">{project.company}</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <FileText className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
              <div>
                <div className="text-sm font-medium">Name</div>
                <div className="text-muted-foreground">{project.name}</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
              <div>
                <div className="text-sm font-medium">Phone</div>
                <div className="text-muted-foreground">{project.phone}</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
              <div>
                <div className="text-sm font-medium">Email</div>
                <div className="text-muted-foreground">{project.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {project.logo && (
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-3">Logo</h4>
          <div className="relative h-40 w-40 overflow-hidden rounded-md border">
            <CloudinaryImage 
              src={project.logo} 
              alt="Project Logo" 
              width={160}
              height={160}
              className="object-contain"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-end space-x-2 pt-4">
        {project.status === "new" && (
          <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
            <XCircle className="mr-2 h-4 w-4" />
            Cancel Project
          </Button>
        )}
        <Button>
          Contact Support
        </Button>
      </div>
    </div>
  );
}