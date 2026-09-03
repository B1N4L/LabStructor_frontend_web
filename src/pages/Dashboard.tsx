import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Clock,
  LogIn,
  LogOut,
  MapPin,
  User as UserIcon,
  Loader2,
  AlertCircle,
  Users,
  RotateCw,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import {
  checkInApi,
  checkOutApi,
  getAttendanceHistoryApi,
  type AttendanceRecord,
} from '../api/attendance'

export const Dashboard: React.FC = () => {
  const { user } = useAuth()

  const [isClockedIn, setIsClockedIn] = useState<boolean>(false)
  const [activeSession, setActiveSession] = useState<AttendanceRecord | null>(null)
  const [activeUsers, setActiveUsers] = useState<AttendanceRecord[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [gpsStatus, setGpsStatus] = useState<string | null>(null)

  // Load attendance data from backend
  const loadAttendanceData = useCallback(async (isInitial = false) => {
    if (!isInitial) setIsRefreshing(true)
    try {
      const { attendances } = await getAttendanceHistoryApi()

      // Find current user's active session
      const myActive = attendances.find(
        (a) => a.user_id === user?.id && a.check_out_time === null
      )
      if (myActive) {
        setIsClockedIn(true)
        setActiveSession(myActive)
      } else {
        setIsClockedIn(false)
        setActiveSession(null)
      }

      // Filter personnel currently active today
      const currentlyActive = attendances.filter((a) => a.check_out_time === null)
      setActiveUsers(currentlyActive)
    } catch {
      // Graceful fallback
    } finally {
      if (!isInitial) {
        setTimeout(() => setIsRefreshing(false), 300)
      }
    }
  }, [user?.id])

  // Fetch initial attendance state on mount
  useEffect(() => {
    if (user?.id) {
      loadAttendanceData(true)
    }
  }, [user?.id, loadAttendanceData])

  // Single dynamic toggle handler for Clock In / Clock Out
  const handleToggleAttendance = async () => {
    setError(null)
    setIsLoading(true)

    if (!isClockedIn) {
      // CLOCK IN FLOW
      let coords: { latitude: number; longitude: number } | undefined

      if ('geolocation' in navigator) {
        try {
          coords = await new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                setGpsStatus('GPS attached')
                resolve({
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                })
              },
              () => {
                setGpsStatus('GPS unavailable')
                resolve(undefined)
              },
              { timeout: 4000 }
            )
          })
        } catch {
          // GPS optional
        }
      }

      try {
        const res = await checkInApi(coords)
        setIsClockedIn(true)
        setActiveSession(res.attendance)
        setActiveUsers((prev) => [
          res.attendance,
          ...prev.filter((u) => u.user_id !== user?.id),
        ])
      } catch (err: unknown) {
        const msg =
          err && typeof err === 'object' && 'response' in err
            ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
            : 'Clock-in failed. Please try again.'
        setError(msg || 'Clock-in failed')
      } finally {
        setIsLoading(false)
      }
    } else {
      // CLOCK OUT FLOW
      try {
        await checkOutApi()
        setIsClockedIn(false)
        setActiveSession(null)
        setActiveUsers((prev) => prev.filter((u) => u.user_id !== user?.id))
        setGpsStatus(null)
      } catch (err: unknown) {
        const msg =
          err && typeof err === 'object' && 'response' in err
            ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
            : 'Clock-out failed. Please try again.'
        setError(msg || 'Clock-out failed')
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Format check-in time cleanly
  const formatTime = (isoString?: string) => {
    if (!isoString) return ''
    const d = new Date(isoString)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Banner */}
      <div className="glass-panel p-6 sm:p-7 relative">
        <div className="glass-shine" />
        <div className="glass-flare" />

        <div className="relative z-10 flex items-center justify-between gap-4">
          {/* Left: User & Role Status */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {user?.username || 'User'}
            </h1>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6552D2]/10 border border-[#6552D2]/25 text-[#6552D2] text-xs font-semibold">
              <span>{user?.role || 'Staff'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>

          {/* Right: Profile Button at Upper Right Corner */}
          <Link
            to="/profile"
            aria-label="User Profile & Settings"
            className="w-11 h-11 rounded-2xl glass-panel flex items-center justify-center text-[#6552D2] hover:scale-105 active:scale-95 shadow-md border border-white/70 transition-all cursor-pointer"
          >
            <UserIcon className="w-5 h-5 stroke-[2.2]" />
          </Link>
        </div>
      </div>

      {/* Error alert if API call fails */}
      {error && (
        <div className="glass-alert-error flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
          <span className="text-xs font-medium text-red-800">{error}</span>
        </div>
      )}

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Attendance Card with Single Toggle Button */}
        <div className="glass-panel p-6 lg:col-span-2 flex flex-col justify-between gap-6 relative">
          <div className="glass-shine" />

          {/* Card Title & Status Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-slate-800">
              <Clock className="w-5 h-5 text-[#6552D2]" />
              <h2 className="text-base font-semibold">Attendance</h2>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                isClockedIn
                  ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-700'
                  : 'bg-slate-200/60 border border-slate-300/60 text-slate-600'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isClockedIn ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                }`}
              />
              {isClockedIn
                ? `Clocked In (${formatTime(activeSession?.check_in_time)})`
                : 'Not Clocked In'}
            </span>
          </div>

          {/* SINGLE Dynamic Toggle Button */}
          <div className="relative z-10">
            <button
              type="button"
              onClick={handleToggleAttendance}
              disabled={isLoading}
              className={`w-full h-14 rounded-2xl font-semibold text-sm shadow-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed ${
                isClockedIn
                  ? 'bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white shadow-rose-600/25 hover:shadow-xl hover:shadow-rose-600/30'
                  : 'bg-[#6552D2] hover:bg-[#5442BE] text-white shadow-[#6552D2]/25 hover:shadow-xl hover:shadow-[#6552D2]/35'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : isClockedIn ? (
                <>
                  <LogOut className="w-5 h-5" />
                  <span>Clock Out</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Clock In</span>
                </>
              )}
            </button>
          </div>

          {/* Bottom GPS status indicator */}
          <div className="relative z-10 flex items-center gap-2 text-xs text-slate-500">
            <MapPin className="w-4 h-4 text-[#6552D2]" />
            <span>{gpsStatus || 'GPS Geolocation verified on clock-in'}</span>
          </div>
        </div>

        {/* Active Today Personnel Card with Refresh Button */}
        <div className="glass-panel p-6 flex flex-col gap-4 relative">
          <div className="glass-shine" />

          {/* Header with Refresh Button */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/60 pb-3">
            <div className="flex items-center gap-2 text-slate-800">
              <Users className="w-4 h-4 text-[#6552D2]" />
              <h3 className="text-sm font-semibold">Active Today</h3>
              <span className="text-xs text-slate-500 font-medium">
                ({activeUsers.length})
              </span>
            </div>

            {/* Minimalist Refresh Icon Button */}
            <button
              type="button"
              onClick={() => loadAttendanceData(false)}
              disabled={isRefreshing}
              aria-label="Refresh active personnel list"
              title="Refresh active personnel"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-[#6552D2] hover:bg-white/60 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#6552D2]' : ''}`} />
            </button>
          </div>

          {/* List of active staff */}
          <div className="relative z-10 flex flex-col gap-2.5">
            {activeUsers.length > 0 ? (
              activeUsers.map((person, idx) => (
                <div
                  key={person.id || idx}
                  className="p-3 rounded-xl bg-white/60 border border-white/70 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-medium text-slate-700">
                      {person.username || user?.username || 'Staff Member'}
                    </span>
                  </div>
                  <span className="text-[#6552D2] text-xs font-semibold">
                    {person.role_name || user?.role || 'Staff'}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-xl bg-white/40 border border-white/50 text-center">
                <p className="text-xs text-slate-500">No other active staff clocked in.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
