"use client"

import { useState } from "react"
import { FileText, Activity, BarChart2, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    // In a real app, you would call an API to log out
    console.log("Logging out...")
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-50 md:hidden"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <Menu /> : <X />}
      </Button>

      <div
        className={cn(
          "bg-muted/40 border-r border-border flex flex-col w-64 transition-all duration-300 ease-in-out",
          collapsed ? "-translate-x-full" : "translate-x-0",
          "md:translate-x-0 fixed md:static h-full z-40",
        )}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold">DocManager</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Button
            variant={activeView === "documents" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onViewChange("documents")}
          >
            <FileText className="mr-2 h-5 w-5" />
            Documents
          </Button>

          <Button
            variant={activeView === "activity" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onViewChange("activity")}
          >
            <Activity className="mr-2 h-5 w-5" />
            Activity Logs
          </Button>

          <Button
            variant={activeView === "monitoring" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onViewChange("monitoring")}
          >
            <BarChart2 className="mr-2 h-5 w-5" />
            Logs & Monitoring
          </Button>

          <Button
            variant={activeView === "settings" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onViewChange("settings")}
          >
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center mb-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </div>

          <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-5 w-5" />
            Log Out
          </Button>
        </div>
      </div>
    </>
  )
}

