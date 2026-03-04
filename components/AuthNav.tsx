"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AuthNav() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  if (isLoading) {
    return (
      <div className="h-8 w-8 animate-pulse bg-gray-200 rounded-full"></div>
    );
  }

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative rounded-full h-8 w-auto p-0 flex justify-center items-center">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "Profile"}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <UserCircle className="h-8 w-auto text-newprimary" />
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 rounded-xl">
          <div className="px-4 py-3 text-sm">
            <div className="font-medium">{session?.user?.name}</div>
            <div className="text-xs text-gray-500">{session?.user?.email}</div>
          </div>
          {session.user.role === "user" && (<Link href="/user/my-account" className="w-full">
            <DropdownMenuItem className="cursor-pointer rounded-full hover:bg-[#B2B8BE] hover:border-newprimary border-2 border-transparent">
              My Account
            </DropdownMenuItem>
          </Link>)}
          {session.user.role === "user" && <Link href="/user/my-orders" className="w-full">
            <DropdownMenuItem className="cursor-pointer rounded-full hover:bg-[#B2B8BE] hover:border-newprimary border-2 border-transparent">
              Orders
            </DropdownMenuItem>
          </Link>}
          {session.user.role === "admin" && (
            <a href="/admin" className="w-full">
              <DropdownMenuItem className="cursor-pointer rounded-full hover:bg-[#B2B8BE] hover:border-newprimary border-2 border-transparent">
                Admin Dashboard
              </DropdownMenuItem>
            </a>
          )}
          <DropdownMenuItem
            className="cursor-pointer text-red-500 hover:text-red-600 rounded-full hover:bg-[#B2B8BE] hover:border-newprimary border-2 border-transparent"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link href="/auth/signin">
      <Image
        src="/user-1.png"
        className="h-8 w-auto"
        width={100}
        height={100}
        alt="user-icon"
      />
    </Link>
  );
}