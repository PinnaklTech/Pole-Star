import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { UserButton } from "@/components/auth/UserButton";
import { Zap } from "lucide-react";

const pageInfo: Record<string, { title: string; description: string }> = {
  "/": { title: "Project Information", description: "Define project details and pole configuration" },
  "/environmental": { title: "Environmental Loading", description: "Configure wind, ice, and temperature conditions" },
  "/geometry": { title: "Pole Geometry", description: "Specify structural dimensions and properties" },
  "/conductor": { title: "Conductor Configuration", description: "Define conductor and hardware loads" },
  "/loads": { title: "Load Calculations", description: "Review calculated load combinations" },
  "/analysis": { title: "Structural Analysis", description: "Analyze structural response and forces" },
  "/checks": { title: "Design Verification", description: "Verify code compliance and capacity checks" },
  "/serviceability": { title: "Serviceability Limits", description: "Check deflection and service criteria" },
  "/connections": { title: "Connections & Foundations", description: "Design connection and foundation details" },
  "/report": { title: "Design Report", description: "Generate comprehensive design documentation" },
};

export function MainLayout() {
  const location = useLocation();
  const currentPage = pageInfo[location.pathname] || { title: "Pole Star", description: "Steel Transmission Pole Design" };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="container flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="p-2 hover:bg-accent rounded-md transition-colors" />
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-foreground leading-none">
                      {currentPage.title}
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1">
                      {currentPage.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  ASCE/SEI 48-19
                </div>
                <UserButton />
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 md:p-8 bg-gradient-to-br from-background to-secondary/20">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}