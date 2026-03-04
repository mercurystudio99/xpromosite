"use client";

import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
  LogOut,
  Tags,
  BarChart3,
  FileText,
  Image
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Protect admin routes client-side
  useEffect(() => {
    if (status === "loading") return;
    
    // Redirect to home if user is not authenticated or not an admin
    if (!session || !session.user || session.user.role !== "admin") {
      router.push("/");
    }
  }, [session, status, router]);

  // Show loading state while checking authentication
  if (status === "loading" || !session || !session.user || session.user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Loading...</h2>
          <p>Please wait while we check your credentials.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen bg-gray-100 antialiased", inter.className)}>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function AdminSidebar() {
  const pathname = usePathname();
  
  const routes = [
    // {
    //   title: "Dashboard",
    //   href: "/admin",
    //   icon: <LayoutDashboard className="h-5 w-5" />,
    // },
    {
      title: "Products",
      href: "/admin",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: "Categories",
      href: "/admin/categories",
      icon: <Tags className="h-5 w-5" />,
    },
    // {
    //   title: "Orders",
    //   href: "/admin/orders",
    //   icon: <Package className="h-5 w-5" />,
    // },
    {
      title: "Custom Orders",
      href: "/admin/projects",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col  md:inset-y-0">
      <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pt-5 overflow-y-auto">
        <div className="px-4 pb-2 flex items-center justify-center">
          <Link href="/admin" className="flex items-center space-x-2">
            <span className="font-bold text-2xl text-newprimary">XPromo</span>
            <span className="bg-newprimary text-white px-2 py-1 text-xs rounded-md">Admin</span>
          </Link>
        </div>
        <Separator className="my-4" />
        <ScrollArea className="flex-grow px-3">
          <nav className="flex-1 space-y-1 pt-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center p-3 rounded-lg text-sm font-medium transition-colors",
                  pathname === route.href
                    ? "bg-newprimary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {route.icon}
                <span className="ml-3">{route.title}</span>
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="px-3 pb-5 pt-2">
          <Separator className="my-4" />
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => signOut()}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}