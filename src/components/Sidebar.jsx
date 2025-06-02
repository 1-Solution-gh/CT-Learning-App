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

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "instructors", label: "Instructors", icon: GraduationCap },
  { id: "courses", label: "Courses", icon: BookOpen },
  // { id: "categories", label: "Categories", icon: FolderTree },
  { id: "modules", label: "Modules", icon: Archive },
  // { id: "sub-admins", label: "Sub Admins", icon: UserCog },
  { id: "settings", label: "Settings", icon: Settings },
]
  
export function Sidebar({ activePage, setActivePage, isOpen, setIsOpen }) {
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
            <Button
              key={item.id}
              variant={activePage === item.id ? "default" : "ghost"}
              className={cn("w-full justify-start", !isOpen && "px-2")}
              onClick={() => setActivePage(item.id)}
            >
              <Icon className="h-4 w-4" />
              {isOpen && <span className="ml-2">{item.label}</span>}
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
