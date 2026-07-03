import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ActiveAlerts({ activeAlerts, onAcknowledge, PaginationControls, itemsPerPage }) {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAlerts = activeAlerts.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs flex flex-col h-fit max-h-full overflow-hidden">
            <div className="flex justify-between items-center border-b pb-4 border-slate-100 shrink-0">
                <div className="text-slate-900 font-black text-xs uppercase tracking-wider">Active Environmental Threats Terminal</div>
                <span className="bg-rose-50 border border-rose-100 text-rose-700 text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">Requires Action Logs Authorization</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 mt-4 pr-1 mb-4">
                <AnimatePresence>
                    {currentAlerts.length > 0 ? (
                        currentAlerts.map((alert) => (
                            <motion.div 
                                key={alert.id}
                                initial={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100, height: 0, marginBottom: 0, padding: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="border border-slate-100 rounded-xl p-5 bg-slate-50/50 shadow-2xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4 overflow-hidden"
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-[9px] font-black px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 uppercase tracking-wider">Critical Breach</span>
                                        <span className="text-[11px] text-slate-400 font-medium">• Recorded: {alert.created_at ? new Date(alert.created_at).toLocaleTimeString() : 'N/A'}</span>
                                    </div>
                                    <h4 className="text-sm font-black text-slate-800 mt-1">{alert.message}</h4>
                                    <div className="text-[11px] text-slate-500 font-semibold flex flex-wrap gap-x-4 gap-y-1 pt-0.5">
                                        <span>Concentration: <strong className="text-slate-700 font-mono">{alert.concentration_value} ppm</strong></span>
                                        <span>Vector Path: <strong className="text-slate-700 uppercase">{alert.wind_direction}</strong></span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => onAcknowledge(alert.id)}
                                    className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black rounded-xl uppercase tracking-wider shadow-xs whitespace-nowrap cursor-pointer transition-colors border-none outline-none"
                                >
                                    Acknowledge & Clear Alarm
                                </button>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-slate-400 text-xs font-bold uppercase tracking-wider">Perimeter system status nominal. No active gas leaks reported.</div>
                    )}
                </AnimatePresence>
            </div>
            {activeAlerts.length > 0 && (
                <PaginationControls 
                    targetArray={activeAlerts} 
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage} 
                    itemsPerPage={itemsPerPage}
                />
            )}
        </div>
    );
}