import React from 'react'
import { NavLink } from 'react-router-dom'
import {
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

export const Sidebar: React.FC = () => {
  return (
    <aside
      aria-label="Sidebar Navigation"
      className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-40"
    >
      <div className="glass-panel py-5 px-3 flex flex-col items-center gap-3.5 rounded-[26px] shadow-2xl">
        {/* Specular shine highlight */}
        <div className="glass-shine" />

        {/* Navigation sections */}
        <nav className="relative z-10 flex flex-col items-center gap-2.5">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                aria-label={item.name}
                className={({ isActive }) =>
                  `relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all group ${
                    isActive
                      ? 'bg-[#6552D2] text-white shadow-lg shadow-[#6552D2]/35 scale-105'
                      : 'text-slate-600 hover:text-[#6552D2] hover:bg-white/50'
                  }`
                }
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />

                {/* Tooltip */}
                <span className="absolute left-16 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-xs font-medium whitespace-nowrap shadow-xl opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all z-50">
                  {item.name}
                </span>
              </NavLink>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
