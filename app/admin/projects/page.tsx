"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Search,
  Mail,
  Eye,
  PhoneCall,
  CalendarClock,
  Loader2,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { toast } from "sonner";

interface Project {
  _id: string;
  projectFor: string;
  budget: string;
  quantity: number;
  deadline: string | null;
  noDeadline: boolean;
  logo: string | null;
  specialInstructions: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  status: string;
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isViewProjectOpen, setIsViewProjectOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newStatus, setNewStatus] = useState<string>("new");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();


  // Fetch projects with filters
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setLoadingError(null);

        // Build query string with filters
        const queryParams = new URLSearchParams();
        if (searchTerm) queryParams.set('search', searchTerm);
        if (statusFilter !== 'all') queryParams.set('status', statusFilter);

        const response = await fetch(`/api/projects?${queryParams.toString()}`);

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch projects');
        }

        const data = await response.json();
        setProjects(data);
      } catch (error: any) {
        console.error('Error fetching projects:', error);
        setLoadingError(error.message || 'Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    // Session check
    if (status === 'loading') return;
    if (!session || session?.user?.role !== 'admin') {
      router.push('/');
      return;
    }

    fetchProjects();
  }, [searchTerm, statusFilter, session, status, router]);

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new':
        return 'default';
      case 'in-progress':
        return 'secondary';
      case 'completed':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No deadline';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Update project status
  const handleStatusUpdate = async () => {
    if (!selectedProject || !newStatus) return;

    try {
      setIsSubmitting(true);
      
      const response = await fetch(`/api/projects/${selectedProject._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update status');
      }

      // Update project in the list
      setProjects((prev) => 
        prev.map((project) => (project._id === selectedProject._id ? { ...project, status: newStatus } : project))
      );
      
      // Close dialog
      setIsUpdateStatusOpen(false);
      setSelectedProject(null);
      
      toast(`Project status updated to ${newStatus}.`);
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast( error.message || 'Failed to update status');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle search with debounce
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="space-y-6 py-6 pl-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Project Requests</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-4">
            <div className="flex w-full max-w-lg items-center space-x-2">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loadingError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {loadingError}
              </AlertDescription>
            </Alert>
          )}

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Client Info</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex justify-center items-center">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        <span className="ml-2">Loading projects...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : projects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      {searchTerm || statusFilter !== 'all'
                        ? "No projects match your filters."
                        : "No project requests found."}
                    </TableCell>
                  </TableRow>
                ) : (
                  projects.map((project) => (
                    <TableRow key={project._id}>
                      <TableCell>
                        <div className="font-medium">{project.projectFor}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-muted-foreground">{project.company}</div>
                      </TableCell>
                      <TableCell>{project.quantity}</TableCell>
                      <TableCell>{project.budget}</TableCell>
                      <TableCell>
                        {project.noDeadline 
                          ? <span className="text-gray-500">No deadline</span>
                          : formatDate(project.deadline)
                        }
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(project.status)}>
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              className="flex items-center"
                              onClick={() => {
                                setSelectedProject(project);
                                setIsViewProjectOpen(true);
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="flex items-center"
                              onClick={() => window.location.href = `mailto:${project.email}`}
                            >
                              <Mail className="mr-2 h-4 w-4" /> Email Client
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="flex items-center"
                              onClick={() => window.location.href = `tel:${project.phone}`}
                            >
                              <PhoneCall className="mr-2 h-4 w-4" /> Call Client
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="flex items-center"
                              onClick={() => {
                                setSelectedProject(project);
                                setNewStatus(project.status);
                                setIsUpdateStatusOpen(true);
                              }}
                            >
                              <CalendarClock className="mr-2 h-4 w-4" /> Update Status
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Project Details Dialog */}
      <Dialog open={isViewProjectOpen} onOpenChange={(open) => {
        setIsViewProjectOpen(open);
        if (!open) setSelectedProject(null);
      }}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Project Details</DialogTitle>
            <DialogDescription>
              View the complete details of this project request
            </DialogDescription>
          </DialogHeader>

          {selectedProject && (
            <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
              {/* Project Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Project Information</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 gap-1">
                      <div className="text-sm font-medium">Purpose</div>
                      <div>{selectedProject.projectFor}</div>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <div className="text-sm font-medium">Budget</div>
                      <div>{selectedProject.budget}</div>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <div className="text-sm font-medium">Quantity</div>
                      <div>{selectedProject.quantity} units</div>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <div className="text-sm font-medium">Deadline</div>
                      <div>
                        {selectedProject.noDeadline 
                          ? 'No deadline specified'
                          : selectedProject.deadline
                            ? formatDate(selectedProject.deadline)
                            : 'No deadline specified'
                        }
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <div className="text-sm font-medium">Status</div>
                      <div>
                        <Badge variant={getStatusBadgeVariant(selectedProject.status)}>
                          {selectedProject.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Client Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Client Information</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 gap-1">
                      <div className="text-sm font-medium">Name</div>
                      <div>{selectedProject.name}</div>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <div className="text-sm font-medium">Company</div>
                      <div>{selectedProject.company}</div>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <div className="text-sm font-medium">Email</div>
                      <div>
                        <a href={`mailto:${selectedProject.email}`} className="text-blue-600 hover:underline">
                          {selectedProject.email}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <div className="text-sm font-medium">Phone</div>
                      <div>
                        <a href={`tel:${selectedProject.phone}`} className="text-blue-600 hover:underline">
                          {selectedProject.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Special Instructions</h3>
                <div className="bg-gray-50 rounded-lg p-3 border">
                  {selectedProject.specialInstructions 
                    ? selectedProject.specialInstructions
                    : <span className="text-gray-500 italic">No special instructions provided</span>
                  }
                </div>
              </div>

              {/* Logo */}
              {selectedProject.logo && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Logo</h3>
                  <div className="border rounded-lg p-4 flex justify-center">
                    <div className="relative h-40 w-40">
                      <Image 
                        src={selectedProject.logo} 
                        alt="Client Logo" 
                        fill
                        className="object-contain" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submission Details */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Submission Details</h3>
                <div className="text-sm text-gray-600">
                  Submitted on {new Date(selectedProject.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setIsViewProjectOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={isUpdateStatusOpen} onOpenChange={(open) => {
        setIsUpdateStatusOpen(open);
        if (!open) setSelectedProject(null);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Project Status</DialogTitle>
            <DialogDescription>
              Change the current status of this project
            </DialogDescription>
          </DialogHeader>

          {selectedProject && (
            <div className="py-4 space-y-4">
              <div className="space-y-1">
                <div className="font-medium">{selectedProject.projectFor}</div>
                <div className="text-sm text-muted-foreground">
                  {selectedProject.company} • Submitted on {new Date(selectedProject.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Status</label>
                <Badge variant={getStatusBadgeVariant(selectedProject.status)} className="mr-2">
                  {selectedProject.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">New Status</label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateStatusOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleStatusUpdate}
              disabled={isSubmitting || !selectedProject || selectedProject.status === newStatus}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Status"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}