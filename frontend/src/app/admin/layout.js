import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <SidebarTrigger className={"text-gray-500"} />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
