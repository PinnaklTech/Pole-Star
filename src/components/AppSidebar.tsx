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

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card border-r border-border">
        <div className="p-4 border-b border-border">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-foreground">
              Pole Star
            </h2>
          )}
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-3 py-2">
            Design Workflow
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`
                      }
                    >
                      <span className="flex items-center justify-center w-6 h-6 text-sm font-medium bg-primary/10 text-primary rounded">
                        {index + 1}
                      </span>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}