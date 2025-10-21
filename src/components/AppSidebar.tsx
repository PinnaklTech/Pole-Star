import { NavLink, useLocation } from "react-router-dom";
import {
  Building2,
  Cloud,
  Zap,
  Cable,
  Calculator,
  Activity,
  CheckCircle,
  Target,
  Wrench,
  FileText,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Project Info", url: "/", icon: Building2 },
  { title: "Environmental Data", url: "/environmental", icon: Cloud },
  { title: "Pole Geometry", url: "/geometry", icon: Zap },
  { title: "Conductor Data", url: "/conductor", icon: Cable },
  { title: "Load Calculations", url: "/loads", icon: Calculator },
  { title: "Structural Analysis", url: "/analysis", icon: Activity },
  { title: "Design Checks", url: "/checks", icon: CheckCircle },
  { title: "Serviceability", url: "/serviceability", icon: Target },
  { title: "Connections & Foundations", url: "/connections", icon: Wrench },
  { title: "Output Report", url: "/report", icon: FileText },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const getCurrentStepIndex = () => {
    const index = navigationItems.findIndex(item => item.url === currentPath);
    return index === -1 ? 0 : index;
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <Sidebar className={collapsed ? "w-16" : "w-72"} collapsible="icon">
      <SidebarContent className="bg-sidebar-background">
        <div className="p-6 border-b border-sidebar-border">
          {!collapsed && (
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-sidebar-foreground">
                Pole Star
              </h2>
              <p className="text-xs text-sidebar-foreground/60">
                Steel Transmission Pole Design
              </p>
            </div>
          )}
        </div>

        <SidebarGroup className="px-3 py-4">
          {!collapsed && (
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-sidebar-foreground/60 px-3 py-2 mb-2">
              Design Workflow
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item, index) => {
                const isCompleted = index < currentStepIndex;
                const isActive = index === currentStepIndex;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={({ isActive: linkActive }) =>
                          `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 relative ${
                            linkActive
                              ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                          }`
                        }
                      >
                        {!collapsed && isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-sidebar-primary rounded-r-full" />
                        )}
                        <div className={`flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full transition-all ${
                          isActive
                            ? "bg-white/20 text-sidebar-primary-foreground"
                            : isCompleted
                            ? "bg-sidebar-primary/20 text-sidebar-primary"
                            : "bg-sidebar-accent text-sidebar-foreground/60"
                        }`}>
                          {isCompleted ? "✓" : index + 1}
                        </div>
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <span className="text-sm font-medium flex-1 text-left">
                            {item.title}
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-sidebar-foreground/60">
                <span>Progress</span>
                <span>{Math.round(((currentStepIndex + 1) / navigationItems.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-sidebar-accent rounded-full overflow-hidden">
                <div
                  className="h-full bg-sidebar-primary transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStepIndex + 1) / navigationItems.length) * 100}%` }}
                />
              </div>
              <p className="text-xs text-sidebar-foreground/60">
                Step {currentStepIndex + 1} of {navigationItems.length}
              </p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}