import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import MobileDrawer from './MobileDrawer'

export const AppLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#F5F3FF] via-[#F8FAFC] to-[#EDE9FE] text-slate-900 flex flex-col">
      {/* Desktop Floating Left Dock */}
      <Sidebar />

      {/* Mobile Slide-in Left Drawer & Toggle */}
      <MobileDrawer />

      {/* Main Page Content Area */}
      <main className="flex-1 w-full pt-20 px-4 pb-12 md:pt-8 md:pl-28 md:pr-8 transition-all">
        <div className="max-w-6xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AppLayout
