import AdminSideBar from "@/components/dashboard/AdminSideBar";
import Header from "@/components/dashboard/Header";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {


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
