import React, { useState, useEffect } from 'react';
import API from '../../../../api';

export default function ComplianceHistory({ currentView, PaginationControls, itemsPerPage }) {
    const [historyLogs, setHistoryLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (currentView === 'history') {
            API.get('/manager/alerts/history')
                .then((res) => setHistoryLogs(res.data.logs || []))
                .catch(err => console.error("Could not fetch historical logs:", err));
        }
    }, [currentView]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLogs = historyLogs.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs flex flex-col h-fit max-h-full overflow-hidden">
            <div className="flex justify-between items-center border-b pb-4 border-slate-100 shrink-0">
                <div className="text-slate-900 font-black text-xs uppercase tracking-wider">Historical System Compliance Logs</div>
            </div>
            <div className="overflow-auto mt-4 rounded-xl border border-slate-100 mb-4">
                {currentLogs.length > 0 ? (
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className="sticky top-0 z-10 bg-slate-50 shadow-2xs">
                            <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                <th className="py-4 px-4">Log Token</th>
                                <th className="py-4 px-4">Timestamp</th>
                                <th className="py-4 px-4">Analyzed Gas</th>
                                <th className="py-4 px-4">Peak Output</th>
                                <th className="py-4 px-4">Remediation Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs font-bold text-slate-600 divide-y divide-slate-100 bg-white">
                            {currentLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-4 font-mono text-slate-400 font-semibold">LOG-{log.id}</td>
                                    <td className="py-4 px-4 text-slate-900 font-medium">
                                        {log.date ? new Date(log.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                                                    </td>
                                    <td className="py-4 px-4 text-emerald-800 uppercase tracking-wider font-mono">{log.gas_type}</td>
                                    <td className="py-4 px-4 text-rose-600 font-extrabold font-mono">{log.peak_value} ppm</td>
                                    <td className="py-4 px-4 text-slate-500 font-medium">Automated Environmental Plant Mitigation Approved</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-12 text-slate-400 text-xs font-bold uppercase tracking-wider">No historical logs found in database repository.</div>
                )}
            </div>
            {historyLogs.length > 0 && (
                <PaginationControls 
                    targetArray={historyLogs} 
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage} 
                    itemsPerPage={itemsPerPage}
                />
            )}
        </div>
    );
}