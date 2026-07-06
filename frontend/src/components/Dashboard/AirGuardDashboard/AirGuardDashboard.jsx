import React, { useState, useEffect, useRef } from 'react';
import API from '../../../api'; 
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../../assets/logo.png'; 

import WeatherCard from './components/WeatherCard';
import GasMetrics from './components/GasMetrics';
import ActiveAlerts from './components/ActiveAlerts';
import ComplianceHistory from './components/ComplianceHistory';

export default function AirGuardDashboard({ onLogout }) {
    const [currentView, setCurrentView] = useState('dashboard');
    const [liveGases, setLiveGases] = useState([]);
    const [activeAlerts, setActiveAlerts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toasts, setToasts] = useState([]);
    
    const totalAlertsCountRef = useRef(0);
    const ITEMS_PER_PAGE = 5;

    const showToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
    };

    const handleViewChange = (newView) => {
        setCurrentView(newView);
    };

    // ─── REALTIME GAS & ACTIVE ALERTS DATA-LOOP POLLING ENGINE ───
    useEffect(() => {
        const fetchLiveTelemetryStream = () => {
            API.get(`/manager/latest-gases?t=${Date.now()}`)
                .then((res) => {
                    if (res.data?.gases) {
                        setLiveGases(res.data.gases);
                    }
                    if (isLoading) setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Gases tracking error:", err);
                    if (isLoading) setIsLoading(false);
                });

            API.get('/manager/alerts/active?page=1&per_page=100')
                .then(res => {
                    const incomingAlerts = res.data.alerts || [];
                    if (incomingAlerts.length > totalAlertsCountRef.current) {
                        const newest = incomingAlerts[0]; 
                        if (newest) showToast(`🚨 NEW EMERGENCY BREACH: ${newest.gas_type} leaking!`, 'danger');
                    }
                    totalAlertsCountRef.current = incomingAlerts.length;
                    setActiveAlerts(incomingAlerts);
                })
                .catch(err => console.error("Alerts polling sync error:", err));
        };

        fetchLiveTelemetryStream();
        const intervalId = setInterval(fetchLiveTelemetryStream, 5000);
        return () => clearInterval(intervalId);
    }, [isLoading]);

    const handleAcknowledgeAlert = (alertId) => {
        API.post(`/manager/alerts/${alertId}/acknowledge`)
            .then(() => {
                showToast("✅ Boundary threat neutralized. Log transfer complete.");
                setActiveAlerts(prev => prev.filter(alert => alert.id !== alertId));
                totalAlertsCountRef.current = Math.max(0, totalAlertsCountRef.current - 1);
            })
            .catch(() => showToast("❌ Mitigation sequence rejected", 'danger'));
    };

    // ─── 🚀 THE LOGOUT ACTION CORRECTION FRAMEWAY ───
    const handleLogout = () => {
        // 1. Wipe locally compiled user session strings
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('activeView');

        // 2. Trigger parent context router state evictions
        if (typeof onLogout === 'function') {
            onLogout(); 
        }
        
        // 3. Force page reload to ensure clean state
        setTimeout(() => {
            window.location.href = '/';
        }, 100);
    };

    const SharedPagination = ({ targetArray, currentPage, setCurrentPage, itemsPerPage }) => {
        const lastPageCalc = Math.max(1, Math.ceil(targetArray.length / itemsPerPage));
        return (
            <div className="flex items-center justify-between p-4 bg-slate-50/50 border-t border-slate-100 mt-auto shrink-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Page <span className="text-slate-800 font-black font-mono">{currentPage}</span> of <span className="text-slate-800 font-black font-mono">{lastPageCalc}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className="px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg border border-slate-200 bg-white shadow-2xs hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer transition-colors border-none outline-none"
                    >Previous</button>
                    <button
                        disabled={currentPage === lastPageCalc}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, lastPageCalc))}
                        className="px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg border border-slate-200 bg-white shadow-2xs hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer transition-colors border-none outline-none"
                    >Next</button>
                </div>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="flex h-screen w-screen bg-[#f1f5f9] items-center justify-center font-black text-xs uppercase tracking-widest text-slate-400">
                Syncing Safi atmospheric telemetry arrays...
            </div>
        );
    }

    return (
        <div className="flex h-screen w-screen bg-[#f1f5f9] text-slate-800 font-sans antialiased overflow-hidden relative">
            {/* Custom Toast HUD Overlay */}
            <div className="absolute top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-md w-full">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div key={toast.id} initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.8, x: 50 }} className={`p-4 rounded-xl shadow-lg border text-xs font-black uppercase tracking-wider text-white pointer-events-auto flex items-center ${toast.type === 'danger' ? 'bg-gradient-to-r from-rose-600 to-red-700 border-rose-500 animate-pulse' : 'bg-gradient-to-r from-emerald-600 to-teal-700 border-emerald-500'}`}>{toast.message}</motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Sidebar Frame layout */}
            <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col px-6 py-6 shrink-0 h-full shadow-xs">
                <div className="flex items-center gap-2 font-bold text-green-700 text-2xl tracking-wide">
                    <span className="p-1.5 border border-green-200 rounded-lg flex items-center justify-center"><img src={Logo} alt="OCP Logo" className="h-6 w-18 object-contain" /></span>
                    <span className="font-normal text-3xl text-slate-900 block select-none">Air<span className="text-emerald-600 font-bold">Guard</span></span>
                </div>
                <nav className="mt-8 space-y-1 flex-1">
                    {[
                        ['dashboard', 'Dashboard overview'], 
                        ['alerts', 'Active Alerts Room'], 
                        ['history', 'Compliance History']
                    ].map(([viewKey, label]) => (
                        <button key={viewKey} onClick={() => handleViewChange(viewKey)} className={`w-full text-left px-4 py-3.5 text-xs font-bold rounded-xl uppercase tracking-wider block border-none outline-none cursor-pointer ${currentView === viewKey ? 'bg-[#f0fdf4] text-emerald-800 border-l-4 border-emerald-700 font-black' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`}>{label}</button>
                    ))}
                </nav>

                
            </aside>

            {/* Main Content Layout panels workspace */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                <header className="h-20 flex items-center justify-between px-8 shrink-0 bg-white border-b border-slate-200/60 z-10">
                    <div className="text-xs font-black tracking-wider text-slate-500 uppercase">System Terminal — <span className="text-slate-400 font-medium">OCP Safi Environmental Command Center</span></div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest font-mono">LIVE FEED SYNCED</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-black rounded-xl uppercase tracking-wider hover:bg-rose-100 transition-colors cursor-pointer outline-none"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <div className="flex-1 p-8 overflow-y-auto bg-[#f8fafc] h-[calc(100vh-5rem)]">
                    {/* VIEW 1: LIVE DASHBOARD OVERVIEW */}
                    {currentView === 'dashboard' && (
                        <div className="flex flex-col gap-6 w-full min-h-full">
                            {/* Weather section takes 100% full width up top */}
                            <div className="w-full">
                                <WeatherCard />
                            </div>
                            
                            <div className="w-full">
                                <GasMetrics 
                                    key={liveGases.map(g => g.value).join('-') || 'empty'} 
                                    liveGases={liveGases} 
                                />
                            </div>
                        </div>
                    )}

                    {currentView === 'alerts' && (
                        <ActiveAlerts 
                            activeAlerts={activeAlerts} 
                            onAcknowledge={handleAcknowledgeAlert} 
                            PaginationControls={SharedPagination} 
                            itemsPerPage={ITEMS_PER_PAGE} 
                        />
                    )}

                    {currentView === 'history' && (
                        <ComplianceHistory 
                            currentView={currentView} 
                            PaginationControls={SharedPagination} 
                            itemsPerPage={ITEMS_PER_PAGE} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
}