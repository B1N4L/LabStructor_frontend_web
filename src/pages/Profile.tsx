import React, { useState } from 'react'
import {
  User as UserIcon,
  Mail,
  Shield,
  Key,
  LogOut,
  CheckCircle2,
  Settings,
  Sliders,
  Bell,
  Lock,
  Palette,
  Save,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const Profile: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile')

  // Form states for profile details (placeholders)
  const [username, setUsername] = useState(user?.username || '')
  const [email, setEmail] = useState(user?.email || '')
  const [department, setDepartment] = useState('Faculty of Computing')

  // Form states for settings (placeholders)
  const [gpsAutodetect, setGpsAutodetect] = useState(true)
  const [shiftNotifications, setShiftNotifications] = useState(true)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8">
        <div className="glass-shine" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#6552D2] to-[#8675EC] flex items-center justify-center shadow-lg shadow-[#6552D2]/30 text-white">
              <UserIcon className="w-8 h-8 stroke-[2.2]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#6552D2]/10 text-[#6552D2] text-xs font-semibold mb-1">
                <Shield className="w-3 h-3" />
                <span>{user?.role || 'Staff'} Role</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {user?.username || 'User Profile'}
              </h1>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5" />
                <span>{user?.email || 'user@labstructor.edu'}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-700 font-semibold text-xs transition-all self-start sm:self-auto cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation: Profile vs Settings */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#6552D2] text-white shadow-md shadow-[#6552D2]/25'
              : 'glass-panel text-slate-700 hover:bg-white/60'
          }`}
        >
          <UserIcon className="w-4 h-4" />
          <span>Profile Details</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-[#6552D2] text-white shadow-md shadow-[#6552D2]/25'
              : 'glass-panel text-slate-700 hover:bg-white/60'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Account Settings</span>
        </button>
      </div>

      {/* Tab 1: Profile Details */}
      {activeTab === 'profile' && (
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-6 sm:p-8">
            <div className="glass-shine" />

            <div className="relative z-10 flex flex-col gap-5">
              <div className="flex items-center gap-2 text-slate-800">
                <UserIcon className="w-5 h-5 text-[#6552D2]" />
                <h2 className="text-lg font-semibold">Personal Information</h2>
              </div>
              <p className="text-xs text-slate-500 -mt-3">
                Update your contact information and display details.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="glass-input h-11 px-4 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-input h-11 px-4 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Department
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="glass-input h-11 px-4 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    System Role
                  </label>
                  <input
                    type="text"
                    disabled
                    value={user?.role || 'Staff'}
                    className="glass-input h-11 px-4 text-sm opacity-75 bg-slate-100/50 cursor-not-allowed"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert('Profile updates saved (placeholder)')}
                className="flex items-center justify-center gap-2 h-11 px-5 bg-[#6552D2] hover:bg-[#5442BE] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#6552D2]/25 transition-all self-start mt-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </div>

          {/* Permissions Matrix */}
          <div className="glass-panel p-6 sm:p-8">
            <div className="glass-shine" />

            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-slate-800">
                <Key className="w-5 h-5 text-[#6552D2]" />
                <h2 className="text-lg font-semibold">Active Permissions</h2>
              </div>
              <p className="text-xs text-slate-500">
                Permissions granted to your account under the {user?.role || 'Staff'} role.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {user?.permissions && user.permissions.length > 0 ? (
                  user.permissions.map((perm) => (
                    <span
                      key={perm}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 border border-white/80 text-slate-700 font-mono text-xs shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{perm}</span>
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400">No explicit permissions assigned</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Account Settings (Placeholder Page) */}
      {activeTab === 'settings' && (
        <div className="flex flex-col gap-6">
          {/* Security & Password */}
          <div className="glass-panel p-6 sm:p-8">
            <div className="glass-shine" />

            <div className="relative z-10 flex flex-col gap-5">
              <div className="flex items-center gap-2 text-slate-800">
                <Lock className="w-5 h-5 text-[#6552D2]" />
                <h2 className="text-lg font-semibold">Security & Password</h2>
              </div>
              <p className="text-xs text-slate-500 -mt-3">
                Update your authentication credentials and account security.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="glass-input h-11 px-4 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="glass-input h-11 px-4 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="glass-input h-11 px-4 text-sm"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert('Password update requested (placeholder)')}
                className="flex items-center justify-center gap-2 h-11 px-5 bg-[#6552D2] hover:bg-[#5442BE] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#6552D2]/25 transition-all self-start mt-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Update Password</span>
              </button>
            </div>
          </div>

          {/* Preferences & System Settings */}
          <div className="glass-panel p-6 sm:p-8">
            <div className="glass-shine" />

            <div className="relative z-10 flex flex-col gap-5">
              <div className="flex items-center gap-2 text-slate-800">
                <Sliders className="w-5 h-5 text-[#6552D2]" />
                <h2 className="text-lg font-semibold">Preferences & Configuration</h2>
              </div>
              <p className="text-xs text-slate-500 -mt-3">
                Configure your attendance logging and application preferences.
              </p>

              <div className="flex flex-col gap-4 mt-2">
                {/* GPS Autodetect Setting */}
                <div className="p-4 rounded-xl bg-white/60 border border-white/70 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#6552D2]/10 text-[#6552D2] flex items-center justify-center">
                      <Sliders className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Automatic GPS Geolocation</p>
                      <p className="text-xs text-slate-500">Automatically capture coordinates on clock-in</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={gpsAutodetect}
                    onChange={(e) => setGpsAutodetect(e.target.checked)}
                    className="w-5 h-5 accent-[#6552D2] cursor-pointer"
                  />
                </div>

                {/* Shift Reminders Setting */}
                <div className="p-4 rounded-xl bg-white/60 border border-white/70 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#6552D2]/10 text-[#6552D2] flex items-center justify-center">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Shift Reminder Alerts</p>
                      <p className="text-xs text-slate-500">Receive notifications for expected lab schedules</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={shiftNotifications}
                    onChange={(e) => setShiftNotifications(e.target.checked)}
                    className="w-5 h-5 accent-[#6552D2] cursor-pointer"
                  />
                </div>

                {/* Theme Palette indicator */}
                <div className="p-4 rounded-xl bg-white/60 border border-white/70 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#6552D2]/10 text-[#6552D2] flex items-center justify-center">
                      <Palette className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Application Theme</p>
                      <p className="text-xs text-slate-500">Active color scheme: #6552D2 Lavender Liquid Glass</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#6552D2] shadow-sm border border-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
