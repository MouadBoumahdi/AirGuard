import React, { useState } from 'react';

export default function AirGuardDashboard() {
    const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'simulation', 'alerts', 'history'
    const [gasFlow, setGasFlow] = useState(1500);
    const [simulatedWind, setSimulatedWind] = useState('S');
    const [predictionResult, setPredictionResult] = useState(null);

    // Static mock data modeling live alerts and archived historical audit streams
    const staticData = {
        location: "Safi, MA",
        current_temp: "22°",
        condition: "Partially Cloudy",
        time: "09:16",
        date: "THU. 04 JUNE 2026",
        metrics: { clouds: "30%", humidity: "70%", wind: "6.3 m/s", feels_like: "22°C" },
        forecast: [
            { day: "Thursday 4 June", status: "Partially Cloudy", temp: "26°C" },
            { day: "Friday 5 June", status: "Partially Cloudy", temp: "28°C" },
            { day: "Saturday 6 June", status: "Partially Cloudy", temp: "29°C" },
            { day: "Sunday 7 June", status: "Clear Sky", temp: "30°C" },
            { day: "Monday 8 June", status: "Clear Sky", temp: "31°C" },
        ],
        active_alerts: [
            { id: "ALT-904", gas_type: "SO2", value: "124.5 ppm", threshold: "100.0 ppm", wind: "Towards City (NE)", time: "09:12", severity: "Critical" },
            { id: "ALT-902", gas_type: "HF", value: "24.8 ppm", threshold: "20.0 ppm", wind: "Towards City (N)", time: "08:45", severity: "High" }
        ],
        historical_logs: [
            { id: "LOG-881", date: "2026-06-03", gas_type: "H2S", peak_value: "58.2 ppm", status: "Resolved", operator: "Manager_Safi_01", action: "Automated Plant Production Cutoff Triggered" },
            { id: "LOG-879", date: "2026-06-02", gas_type: "SO2", peak_value: "142.0 ppm", status: "Resolved", operator: "Manager_Safi_01", action: "Manual Chamber Valve Purge Acknowledged" },
            { id: "LOG-875", date: "2026-05-30", gas_type: "NH3", peak_value: "41.9 ppm", status: "Resolved", operator: "System_Auto", action: "Wind Vector Shift Cleared Alarm State" },
            { id: "LOG-870", date: "2026-05-28", gas_type: "HF", peak_value: "29.1 ppm", status: "Resolved", operator: "Manager_Safi_02", action: "Scrubber Unit Subsystem Restarted" }
        ]
    };

    const handleRunPrediction = () => {
        if (gasFlow > 2000 && (simulatedWind === 'N' || simulatedWind === 'NE')) {
            setPredictionResult({ risk: true, msg: "CRITICAL RISK DETECTED: Dispersions heading towards urban areas.", confidence: "94.2%" });
        } else {
            setPredictionResult({ risk: false, msg: "Aucun risque détecté", confidence: "99.8%" });
        }
    };

    return (
        <div className="flex h-screen w-screen bg-[#EAEFEA] text-slate-800 font-sans antialiased overflow-hidden">
            
            {/* 1. SIDEBAR NAVIGATION */}
            <aside className="w-64 bg-white border-r border-slate-200/60 flex flex-col px-6 py-6 shrink-0 h-full">
                <div className="flex items-center gap-2 font-bold text-emerald-700 text-xl tracking-wide">
                    <span className="px-2 py-1 border border-slate-200 rounded-lg text-xs font-black bg-slate-50 text-slate-900">OCP</span>
                    <span className="font-normal text-xl text-slate-900 block select-none">
                        Air<span className="text-emerald-600 font-bold">Guard</span>
                    </span>
                </div>
                <nav className="mt-10 space-y-1.5 flex-1">
                    {/* Dynamic View Toggles Linked to State Controllers */}
                    {[
                        ['dashboard', 'Dashboard'],
                        ['simulation', 'AI Simulation'],
                        ['alerts', 'Active Alerts'],
                        ['history', 'History Logs']
                    ].map(([viewKey, label]) => (
                        <button 
                            key={viewKey}
                            onClick={() => setCurrentView(viewKey)}
                            className={`w-full text-left px-4 py-3 text-xs font-bold rounded-xl uppercase tracking-wider transition-all ${
                                currentView === viewKey ? 'bg-emerald-50 text-emerald-800 border-l-4 border-emerald-700' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* MAIN WORKSPACE WRAPPER */}
            <div className="flex-1 flex flex-col min-w-0 h-full">
                
                {/* SYSTEM UTILITY GLOBAL HEADER */}
                <header className="h-16 flex items-center justify-between px-10 shrink-0 bg-white border-b border-slate-200/40 z-10">
                    <div className="text-xs font-black tracking-wider text-slate-500 uppercase">
                        System Terminal — <span className="text-slate-400 font-medium">OCP Safi Operations Control</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] bg-slate-100 text-slate-500 border border-slate-200 px-3 py-1 rounded-md font-black uppercase tracking-wider">
                            Role: Environment Manager
                        </span>
                        <div className="flex bg-emerald-800 px-4 py-1.5 rounded-full shadow-xs text-white text-xs font-bold tracking-wide">
                            Connected
                        </div>
                    </div>
                </header>

                {/* VIEW ROUTER BODY WRAPPER CONTAINER */}
                <div className="flex-1 h-[calc(100vh-4rem)] p-8 overflow-hidden">
                    
                    {/* VIEW 1: DASHBOARD VIEWFINDER PANEL */}
                    {currentView === 'dashboard' && (
                        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-full items-stretch animate-fade-in">
                            <div className="xl:col-span-3 flex flex-col gap-6 h-full justify-between">
                                <div className="bg-gradient-to-br from-[#4A5559] to-[#2D3336] rounded-[28px] p-8 text-white relative shadow-md flex flex-col justify-between flex-1 min-h-[340px]">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="bg-white/10 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md">OCP AtmoSafe — Air Monitoring</span>
                                            <div className="text-xs font-medium opacity-80 mt-3">{staticData.location}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-4xl font-black tracking-tight">{staticData.time}</div>
                                            <div className="text-[10px] font-bold tracking-widest opacity-60 uppercase mt-1">{staticData.date}</div>
                                        </div>
                                    </div>
                                    <div className="my-auto pt-6 pb-4">
                                        <h1 className="text-9xl font-black tracking-tighter leading-none select-none">{staticData.current_temp}</h1>
                                        <p className="text-xl font-bold opacity-90 tracking-wide mt-2">{staticData.condition}</p>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                                        {['Clouds ' + staticData.metrics.clouds, 'Humidity ' + staticData.metrics.humidity, 'Wind ' + staticData.metrics.wind, 'Visibility 10k km'].map((val, i) => (
                                            <div key={i} className="bg-white/10 backdrop-blur-md py-4 rounded-2xl border border-white/5 text-center text-xs font-bold uppercase tracking-wide">{val}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 shrink-0">
                                    {[["Temperature", staticData.metrics.feels_like], ["Humidity", staticData.metrics.humidity], ["Wind Speed", staticData.metrics.wind], ["Clouds Coverage", staticData.metrics.clouds]].map(([lbl, val], i) => (
                                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-xs">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{lbl}</span>
                                            <span className="text-2xl font-black text-slate-900 block mt-1">{val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-[28px] p-6 border border-slate-200/60 shadow-sm flex flex-col h-full justify-between">
                                <div className="flex flex-col h-full justify-start space-y-6">
                                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Weather Forecast</h3>
                                        <span className="bg-emerald-50 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded border border-emerald-100">Safi Grid</span>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-2">
                                        {staticData.forecast.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center text-xs font-bold py-3 border-b border-slate-50 last:border-none">
                                                <div className="flex flex-col">
                                                    <span className="text-slate-800 font-extrabold">{item.day}</span>
                                                    <span className="text-[10px] text-slate-400 font-medium mt-0.5">{item.status}</span>
                                                </div>
                                                <span className="text-slate-900 text-sm font-black">{item.temp}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* VIEW 2: AI SIMULATION COCKPIT PANEL */}
                    {currentView === 'simulation' && (
                        <div className="flex flex-col h-full gap-6 justify-between items-stretch animate-fade-in">
                            <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm flex flex-col justify-between flex-1">
                                <div className="text-slate-900 font-black text-sm uppercase tracking-wider border-b pb-4 border-slate-100 shrink-0">Simulation Personnalisée IA</div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-1 py-6">
                                    <div className="space-y-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-black text-slate-400 tracking-wider uppercase">Débit de gaz (OCP)</span>
                                            <span className="text-3xl font-black text-slate-900">{gasFlow} <span className="text-sm text-slate-400">m³/h</span></span>
                                        </div>
                                        <input type="range" min="0" max="3000" value={gasFlow} onChange={(e) => setGasFlow(Number(e.target.value))} className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none" />
                                        <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wide"><span>0</span><span className="text-yellow-600 font-black">1000 Modéré</span><span className="text-orange-500 font-black">2000 Danger</span><span>3000 m³/h</span></div>
                                    </div>
                                    <div className="space-y-4">
                                        <span className="text-xs font-black text-slate-400 tracking-wider uppercase block mb-1">Direction du vent simulée</span>
                                        <div className="grid grid-cols-4 gap-3">
                                            {['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'].map((dir) => (
                                                <button key={dir} onClick={() => setSimulatedWind(dir)} className={`py-4 text-xs font-black rounded-xl border tracking-widest transition-all ${simulatedWind === dir ? 'bg-emerald-800 border-emerald-800 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{dir}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-6 border-t border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 shrink-0">
                                    <span className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-200/50">Temp: 22.1°C</span>
                                    <span className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-200/50">Humidité: 70%</span>
                                    <span className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-200/50">Vent Réel: 6.3 m/s</span>
                                </div>
                            </div>
                            <div className="shrink-0 space-y-4">
                                <button onClick={handleRunPrediction} className="w-full py-5 bg-emerald-700 hover:bg-emerald-800 transition-colors text-white font-black text-xs tracking-widest rounded-2xl shadow-md uppercase">Lancer la prédiction IA</button>
                                {predictionResult ? (
                                    <div className={`p-5 rounded-2xl text-white font-bold tracking-wide shadow-md flex justify-between items-center ${predictionResult.risk ? 'bg-red-600' : 'bg-slate-900'}`}>
                                        <div className="flex flex-col gap-1"><span className="text-[10px] uppercase font-black tracking-widest opacity-75">Résultat du modèle prédictif</span><p className="text-sm font-semibold">{predictionResult.msg}</p></div>
                                        <span className="text-xs bg-white/20 px-4 py-1.5 rounded-xl backdrop-blur-sm font-black uppercase tracking-wider">Confiance: {predictionResult.confidence}</span>
                                    </div>
                                ) : (
                                    <div className="p-5 bg-slate-200 text-slate-400 text-xs font-bold text-center rounded-2xl border border-dashed border-slate-300 uppercase tracking-widest">En attente de paramètres de simulation...</div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* VIEW 3: ACTIVE ALERTS SECURITY CONTROL ROOM PANEL */}
                    {currentView === 'alerts' && (
                        <div className="flex flex-col h-full gap-6 animate-fade-in overflow-hidden">
                            <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm flex flex-col flex-1 overflow-hidden">
                                <div className="flex justify-between items-center border-b pb-4 border-slate-100 shrink-0">
                                    <div className="text-slate-900 font-black text-sm uppercase tracking-wider">Active Environmental Threats</div>
                                    <span className="bg-red-50 text-red-700 text-[10px] font-black px-3 py-1 rounded-full border border-red-100 uppercase tracking-wider">
                                        Requires Manager Review
                                    </span>
                                </div>

                                <div className="flex-1 overflow-y-auto mt-6 space-y-4 pr-2">
                                    {staticData.active_alerts.map((alert) => (
                                        <div key={alert.id} className="border border-red-200 rounded-2xl p-6 bg-gradient-to-r from-red-50/30 to-white shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-black text-red-700 bg-red-100 px-2 py-0.5 rounded uppercase tracking-wider">{alert.severity} Incident</span>
                                                    <span className="text-xs font-mono text-slate-400 font-bold">{alert.id}</span>
                                                    <span className="text-xs text-slate-400 font-semibold">• Logged at {alert.time}</span>
                                                </div>
                                                <h4 className="text-lg font-black text-slate-900">
                                                    Gas Spike Found: <span className="text-red-600 font-black">{alert.gas_type}</span> has breached critical compliance boundaries.
                                                </h4>
                                                <div className="text-xs text-slate-500 font-medium flex gap-4 pt-1">
                                                    <span>Recorded: <strong className="text-slate-700">{alert.value}</strong></span>
                                                    <span>Allowed Limit: <strong className="text-slate-700">{alert.threshold}</strong></span>
                                                    <span>Wind Vector Direction: <strong className="text-slate-700 uppercase">{alert.wind}</strong></span>
                                                </div>
                                            </div>
                                            <button className="px-5 py-3 bg-red-700 hover:bg-red-800 transition-colors text-white text-xs font-black rounded-xl uppercase tracking-wider shadow-xs whitespace-nowrap">
                                                Acknowledge & Clear Alarm
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* VIEW 4: HISTORICAL LOGS COMPLIANCE AUDIT TABLE PANEL */}
                    {currentView === 'history' && (
                        <div className="flex flex-col h-full gap-6 animate-fade-in overflow-hidden">
                            <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm flex flex-col flex-1 overflow-hidden">
                                <div className="flex justify-between items-center border-b pb-4 border-slate-100 shrink-0">
                                    <div className="text-slate-900 font-black text-sm uppercase tracking-wider">Historical Incident Logs</div>
                                    <span className="bg-slate-50 text-slate-500 text-[10px] font-black px-3 py-1 rounded-full border border-slate-200 uppercase tracking-wider">
                                        Audit Database
                                    </span>
                                </div>

                                <div className="flex-1 overflow-x-auto mt-6 pr-2">
                                    <table className="w-full text-left border-collapse min-w-[700px]">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/70 rounded-xl">
                                                <th className="py-4 px-4">Log ID</th>
                                                <th className="py-4 px-4">Date</th>
                                                <th className="py-4 px-4">Gas Type</th>
                                                <th className="py-4 px-4">Peak Reading</th>
                                                <th className="py-4 px-4">Resolution Path Taken</th>
                                                <th className="py-4 px-4">Signed Operator</th>
                                                <th className="py-4 px-4 text-right">State</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-xs font-bold text-slate-600 divide-y divide-slate-50">
                                            {staticData.historical_logs.map((log) => (
                                                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="py-4 px-4 font-mono text-slate-400 font-semibold">{log.id}</td>
                                                    <td className="py-4 px-4 text-slate-900">{log.date}</td>
                                                    <td className="py-4 px-4 text-emerald-800 uppercase tracking-wider">{log.gas_type}</td>
                                                    <td className="py-4 px-4 text-red-600 font-extrabold">{log.peak_value}</td>
                                                    <td className="py-4 px-4 text-slate-500 font-medium">{log.action}</td>
                                                    <td className="py-4 px-4 font-mono text-[11px] text-slate-500">{log.operator}</td>
                                                    <td className="py-4 px-4 text-right">
                                                        <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black px-2 py-0.5 border border-emerald-100 rounded uppercase tracking-wider">
                                                            {log.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}