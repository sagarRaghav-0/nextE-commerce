"use client";

import AdminSideBar from "@/components/dashboard/AdminSideBar";
import Header from "@/components/dashboard/Header";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isSignedIn, user, isLoaded } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      openSignIn();
      return;
    }

    const isAdmin = user?.publicMetadata?.role === "admin";

    if (!isAdmin) {
      router.push("/");
      alert("Access denied: Admins only");
    }
  }, [isSignedIn, isLoaded, user]);

  if (!isLoaded) return null;

  if (!isSignedIn) return null;

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex overflow-hidden">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <AdminSideBar />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
}