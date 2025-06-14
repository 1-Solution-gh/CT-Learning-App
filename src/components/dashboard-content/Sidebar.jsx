"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FolderTree,
  Archive,
  UserCog,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { NavLink } from "react-router-dom"

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "students", label: "Students", icon: Users, path: "/dashboard/students" },
  { id: "instructors", label: "Instructors", icon: GraduationCap, path: "/dashboard/instructors" },
  { id: "courses", label: "Courses", icon: BookOpen, path: "/dashboard/courses" },
  // { id: "categories", label: "Categories", icon: FolderTree, path: "/categories" },
  { id: "modules", label: "Modules", icon: Archive, path: "/dashboard/modules" },
  // { id: "sub-admins", label: "Sub Admins", icon: UserCog, path: "/sub-admins" },
  { id: "settings", label: "Settings", icon: Settings, path: "/dashboard/settings" },
]
  
export function Sidebar({ isOpen, setIsOpen }) {
  return (
    <div className={cn("bg-card border-r transition-all duration-300 flex flex-col", isOpen ? "w-64" : "w-16")}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {isOpen && <h2 className="text-lg font-semibold text-primary">CT-Edu Hub</h2>}
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="h-8 w-8">
            {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.id}
              to={item.path}
              end
              className={({ isActive }) =>
                cn(
                  "flex items-center w-full px-3 py-2 rounded-md transition-colors",
                  !isOpen && "px-2 justify-center",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              <Icon className="h-4 w-4" />
              {isOpen && <span className="ml-2">{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}
