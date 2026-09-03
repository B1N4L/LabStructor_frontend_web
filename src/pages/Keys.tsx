import React from 'react'
import { KeyRound, ArrowRightLeft, Shield, UserCheck } from 'lucide-react'

interface SampleKey {
  id: number
  label: string
  hallName: string
  designatedRole: string
  currentHolder: string
}

const sampleKeys: SampleKey[] = [
  {
    id: 1,
    label: 'Key-Turing-01',
    hallName: 'Turing Computer Lab',
    designatedRole: 'Instructor',
    currentHolder: 'instructor_jane',
  },
  {
    id: 2,
    label: 'Key-Lovelace-02',
    hallName: 'Lovelace Lecture Hall',
    designatedRole: 'Staff',
    currentHolder: 'staff_john',
  },
]

export const Keys: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8">
        <div className="glass-shine" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6552D2]/10 border border-[#6552D2]/20 text-[#6552D2] text-xs font-semibold mb-2">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Physical Security</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Hall Key Management & Handovers
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Track custody of physical laboratory keys and execute transfer handovers.
            </p>
          </div>
        </div>
      </div>

      {/* Keys Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sampleKeys.map((key) => (
          <div key={key.id} className="glass-panel p-6 flex flex-col justify-between gap-5">
            <div className="glass-shine" />

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#6552D2]/10 text-[#6552D2] font-mono font-semibold text-xs mb-1.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{key.label}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{key.hallName}</h3>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-white/70 px-3 py-1 rounded-full border border-slate-200 font-medium">
                <Shield className="w-3.5 h-3.5 text-[#6552D2]" />
                <span>{key.designatedRole}</span>
              </div>
            </div>

            {/* Current Custody Info */}
            <div className="relative z-10 p-3.5 rounded-xl bg-white/60 border border-white/70 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-medium">Current Holder</span>
              </div>
              <span className="text-xs font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                {key.currentHolder}
              </span>
            </div>

            {/* Handover Button */}
            <button
              type="button"
              className="relative z-10 flex items-center justify-center gap-2 h-11 px-4 bg-[#6552D2] hover:bg-[#5442BE] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#6552D2]/25 transition-all cursor-pointer"
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>Hand Over Key</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Keys
