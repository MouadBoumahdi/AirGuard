import React from 'react';

export default function GasMetrics({ liveGases }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 shrink-0">
            {liveGases.map((gas, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-xs flex flex-col justify-between">
                    <div>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">{gas.name}</span>
                        <span className="text-2xl font-black text-slate-900 block mt-1 font-mono tracking-tight">{gas.value}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}