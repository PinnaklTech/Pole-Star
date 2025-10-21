import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { UserButton } from "@/components/auth/UserButton";

export function MainLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-card">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="p-2" />
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  Pole Star
                </h1>
                <p className="text-sm text-muted-foreground">
                  Design according to ASCE/SEI 48-19 Standards
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <UserButton />
            </div>
          </header>
          
          <main className="flex-1 p-6 bg-secondary/30">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}