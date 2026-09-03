import React from 'react'
import { Laptop, ArrowUpRight, RotateCcw, Plus } from 'lucide-react'

interface SampleLaptop {
  id: number
  assetTag: string
  alias: string
  status: 'STORED' | 'DEPLOYED' | 'MAINTENANCE'
  assignedTo?: string
  deployedHall?: string
}

const sampleLaptops: SampleLaptop[] = [
  {
    id: 1,
    assetTag: 'LAP-001',
    alias: 'Dell XPS 15 (Lab 1)',
    status: 'STORED',
  },
  {
    id: 2,
    assetTag: 'LAP-002',
    alias: 'MacBook Pro M2 (Lab 2)',
    status: 'DEPLOYED',
    assignedTo: 'Student-CS-101',
    deployedHall: 'Turing Computer Lab',
  },
  {
    id: 3,
    assetTag: 'LAP-003',
    alias: 'ThinkPad T14 (Lab 1)',
    status: 'STORED',
  },
]

export const Laptops: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8">
        <div className="glass-shine" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6552D2]/10 border border-[#6552D2]/20 text-[#6552D2] text-xs font-semibold mb-2">
              <Laptop className="w-3.5 h-3.5" />
              <span>Hardware Fleet</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Laptop Inventory & Allocations
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Assign stored laptops to university lecture halls or return deployed units.
            </p>
          </div>

          <button
            type="button"
            className="relative z-10 flex items-center gap-2 px-4 py-2.5 bg-[#6552D2] hover:bg-[#5442BE] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#6552D2]/25 transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Allocation</span>
          </button>
        </div>
      </div>

      {/* Laptop Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleLaptops.map((laptop) => (
          <div key={laptop.id} className="glass-panel p-5 flex flex-col justify-between gap-4">
            <div className="glass-shine" />

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-semibold text-slate-500 bg-white/70 px-2 py-0.5 rounded border border-slate-200">
                  {laptop.assetTag}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">{laptop.alias}</h3>
              </div>

              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                  laptop.status === 'STORED'
                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-700'
                    : laptop.status === 'DEPLOYED'
                    ? 'bg-indigo-500/15 border border-indigo-500/30 text-indigo-700'
                    : 'bg-amber-500/15 border border-amber-500/30 text-amber-700'
                }`}
              >
                {laptop.status}
              </span>
            </div>

            {laptop.deployedHall && (
              <div className="relative z-10 p-3 rounded-xl bg-white/60 border border-white/70 text-xs">
                <p className="text-slate-500">Hall: <span className="font-semibold text-slate-800">{laptop.deployedHall}</span></p>
                <p className="text-slate-500 mt-0.5">Assigned to: <span className="font-semibold text-[#6552D2]">{laptop.assignedTo}</span></p>
              </div>
            )}

            {/* Action */}
            <button
              type="button"
              className={`relative z-10 flex items-center justify-center gap-2 h-10 px-4 rounded-xl font-semibold text-xs shadow-sm transition-all cursor-pointer ${
                laptop.status === 'STORED'
                  ? 'bg-[#6552D2] hover:bg-[#5442BE] text-white shadow-[#6552D2]/25'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              {laptop.status === 'STORED' ? (
                <>
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Assign to Hall</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4 text-[#6552D2]" />
                  <span>Return Laptop</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Laptops
