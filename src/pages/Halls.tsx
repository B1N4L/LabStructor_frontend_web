import React from 'react'
import { DoorClosed, DoorOpen, Laptop, Layers, Lock, Unlock } from 'lucide-react'

interface SampleHall {
  id: number
  name: string
  floor: string
  isOpen: boolean
  laptopsCount: number
  sessionLecturer?: string
}

const sampleHalls: SampleHall[] = [
  {
    id: 1,
    name: 'Turing Computer Lab',
    floor: 'Floor 1',
    isOpen: false,
    laptopsCount: 12,
  },
  {
    id: 2,
    name: 'Lovelace Lecture Hall',
    floor: 'Floor 2',
    isOpen: true,
    laptopsCount: 20,
    sessionLecturer: 'Dr. Ada Lovelace',
  },
]

export const Halls: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8">
        <div className="glass-shine" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6552D2]/10 border border-[#6552D2]/20 text-[#6552D2] text-xs font-semibold mb-2">
              <DoorClosed className="w-3.5 h-3.5" />
              <span>Halls & Labs</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Lab & Hall Control
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Toggle lock/unlock access states and inspect live laptop allocations.
            </p>
          </div>
        </div>
      </div>

      {/* Hall Cards Grid Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sampleHalls.map((hall) => (
          <div key={hall.id} className="glass-panel p-6 flex flex-col justify-between gap-5">
            <div className="glass-shine" />
            
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{hall.floor}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{hall.name}</h3>
                {hall.sessionLecturer && (
                  <p className="text-xs text-slate-600 mt-0.5">
                    Session Lecturer: <span className="font-medium text-[#6552D2]">{hall.sessionLecturer}</span>
                  </p>
                )}
              </div>

              {/* Status Badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  hall.isOpen
                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-700'
                    : 'bg-rose-500/15 border border-rose-500/30 text-rose-700'
                }`}
              >
                {hall.isOpen ? (
                  <>
                    <DoorOpen className="w-3.5 h-3.5" />
                    <span>Unlocked</span>
                  </>
                ) : (
                  <>
                    <DoorClosed className="w-3.5 h-3.5" />
                    <span>Locked</span>
                  </>
                )}
              </span>
            </div>

            {/* Laptop Allocation Preview */}
            <div className="relative z-10 p-3.5 rounded-xl bg-white/60 border border-white/70 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700">
                <Laptop className="w-4 h-4 text-[#6552D2]" />
                <span className="text-xs font-medium">Allocated Laptops</span>
              </div>
              <span className="text-xs font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                {hall.laptopsCount} Units
              </span>
            </div>

            {/* Action Button */}
            <button
              type="button"
              className={`relative z-10 flex items-center justify-center gap-2 h-11 px-4 rounded-xl font-semibold text-xs shadow-sm transition-all cursor-pointer ${
                hall.isOpen
                  ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20'
                  : 'bg-[#6552D2] hover:bg-[#5442BE] text-white shadow-[#6552D2]/25'
              }`}
            >
              {hall.isOpen ? (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Lock & End Session</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Unlock Hall</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Halls
