import { Sidebar } from '@/components/dashboard-content/Sidebar'
import { TopBar } from '@/components/dashboard-content/TopBar'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
  return (
    <div className="flex h-screen ">
    <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto p-6"><Outlet /></main>
    </div>
  </div>
  )
}
