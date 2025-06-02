import { Sidebar } from '@/components/Sidebar'
import React, { useState } from 'react'
import  {TopBar } from '@/components/TopBar'
import { InstructorManagement } from './InstructorManagement'
import { CollectionManagement } from './CollectionManagement'
import { StudentManagement } from './StudentManagement'
import { DashboardOverview } from './DashboardOverview'
import CourseManagement  from './ManageCourses'

export default function AdminDashboard() {
    const [activePage, setActivePage] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderActivePage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardOverview />
      case "students":
        return <StudentManagement />
      case "instructors":
        return <InstructorManagement />
      case "courses":
        return <CourseManagement />
      case "categories":
        return <h1>Category Management</h1>
      case "modules":
        return <CollectionManagement />
      case "sub-admins":
        return <h1>Sub Admin Management</h1>
      case "settings":
        return <h1>Settings</h1>
      default:
        return <h1>Dashboard Overview</h1>
    }
  }
  return (
    <div className="flex h-screen ">
      <Sidebar activePage={activePage} setActivePage={setActivePage} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto p-6">{renderActivePage()}</main>
      </div>
    </div>
  )
}
