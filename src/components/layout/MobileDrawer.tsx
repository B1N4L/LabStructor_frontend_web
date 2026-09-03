import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  Clock,
  DoorClosed,
  Laptop,
  KeyRound,
  Users,
} from 'lucide-react'

interface NavItem {
  name: string
  to: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { name: 'Dashboard', to: '/dashboard', icon: Clock },
  { name: 'Halls', to: '/halls', icon: DoorClosed },
  { name: 'Laptops', to: '/laptops', icon: Laptop },
  { name: 'Keys', to: '/keys', icon: KeyRound },
  { name: 'Users', to: '/users', icon: Users },
]

export const MobileDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Automatically close drawer when navigating to a new route
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="md:hidden">
      {/* 1. Floating glass menu toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
        style={{ position: 'fixed' }}
        className="fixed top-4 left-4 z-50 w-11 h-11 flex items-center justify-center rounded-2xl glass-panel shadow-lg border border-white/60 text-slate-800 active:scale-95 transition-all cursor-pointer"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-[#6552D2]" />
        ) : (
          <Menu className="w-5 h-5 text-slate-700" />
        )}
      </button>

      {/* 2. Backdrop Scrim */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/35 backdrop-blur-[2px] z-40 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* 3. Minimalist Slide-in Drawer (Vertically Centered on the Left, Icons Only) */}
      <div
        className={`fixed left-4 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ease-out ${
          isOpen
            ? 'translate-x-0 opacity-100 pointer-events-auto'
            : '-translate-x-28 opacity-0 pointer-events-none'
        }`}
      >
        <div className="glass-panel py-5 px-3 flex flex-col items-center gap-3.5 rounded-[26px] shadow-2xl border border-white/70">
          {/* Specular sheen */}
          <div className="glass-shine" />

          {/* Navigation icons */}
          <nav className="relative z-10 flex flex-col items-center gap-2.5">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  aria-label={item.name}
                  className={({ isActive }) =>
                    `relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all ${
                      isActive
                        ? 'bg-[#6552D2] text-white shadow-lg shadow-[#6552D2]/35 scale-105'
                        : 'text-slate-600 hover:text-[#6552D2] hover:bg-white/50'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </NavLink>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default MobileDrawer
