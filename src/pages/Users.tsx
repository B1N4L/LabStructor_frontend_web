import React from 'react'
import { Users, UserPlus, Key } from 'lucide-react'

interface SampleUser {
  id: number
  username: string
  email: string
  role: string
  permissionsCount: number
}

const sampleUsers: SampleUser[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@labstructor.edu',
    role: 'Admin',
    permissionsCount: 11,
  },
  {
    id: 2,
    username: 'instructor_jane',
    email: 'jane@labstructor.edu',
    role: 'Instructor',
    permissionsCount: 8,
  },
  {
    id: 3,
    username: 'staff_john',
    email: 'john@labstructor.edu',
    role: 'Staff',
    permissionsCount: 4,
  },
]

export const UsersPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8">
        <div className="glass-shine" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6552D2]/10 border border-[#6552D2]/20 text-[#6552D2] text-xs font-semibold mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>RBAC Administration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              User & Permission Management
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Configure system user accounts, assign roles, and audit granular permissions.
            </p>
          </div>

          <button
            type="button"
            className="relative z-10 flex items-center gap-2 px-4 py-2.5 bg-[#6552D2] hover:bg-[#5442BE] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#6552D2]/25 transition-all self-start sm:self-auto cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create User</span>
          </button>
        </div>
      </div>

      {/* Users List Card */}
      <div className="glass-panel p-6">
        <div className="glass-shine" />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/60">
            <h2 className="text-base font-bold text-slate-900">System Users</h2>
            <span className="text-xs text-slate-500">{sampleUsers.length} accounts configured</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleUsers.map((u) => (
              <div
                key={u.id}
                className="p-4 rounded-2xl bg-white/60 border border-white/80 shadow-xs flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-900">{u.username}</span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                        u.role === 'Admin'
                          ? 'bg-purple-600 text-white'
                          : u.role === 'Instructor'
                          ? 'bg-[#6552D2]/15 text-[#6552D2] border border-[#6552D2]/30'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {u.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{u.email}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-[#6552D2]" />
                    <span>{u.permissionsCount} Permissions</span>
                  </div>
                  <button
                    type="button"
                    className="text-[#6552D2] hover:text-[#5442BE] font-semibold hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersPage
