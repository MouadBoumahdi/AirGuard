import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AirGuardDashboard() {
    const [currentView, setCurrentView] = useState('dashboard');
    
    // ─── STATE MANAGEMENT FOR LIVE WEATHER ───
    const [liveWeather, setLiveWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Free developer API key from weatherapi.com
    const WEATHER_API_KEY = "f7f31a5526fe4b2883e94054261304";

    useEffect(() => {
        // This runs automatically once when the component opens
        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=Safi,Morocco&days=5`)
            .then((response) => {
                const data = response.data;
                
                // We map the raw API data directly to match your precise layout look
                setLiveWeather({
                    location: `${data.location.name}, ${data.location.country}`,
                    current_temp: Math.round(data.current.temp_c) + "°",
                    condition: data.current.condition.text,
                    time: data.location.localtime.split(' ')[1] || "00:00",
                    date: new Date(data.location.localtime.split(' ')[0]).toLocaleDateString('en-US', {
                        weekday: 'short', day: '2-digit', month: 'long', year: 'numeric'
                    }).toUpperCase(),
                    metrics: {
                        clouds: data.current.cloud + "%",
                        humidity: data.current.humidity + "%",
                        wind: data.current.wind_kph + " km/h",
                        feels_like: Math.round(data.current.feelslike_c) + "°C"
                    },
                    forecast: data.forecast.forecastday.map(f => ({
                        day: new Date(f.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' }),
                        status: f.day.condition.text,
                        temp: Math.round(f.day.maxtemp_c) + "°C"
                    }))
                });
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Weather data sync failed:", error);
                setIsLoading(false);
            });
    }, []);

    // ─── INTERNAL FACTORY EMISSIONS DATA (STAYS WITHIN AIRGUARD) ───
    const factoryData = {
        gases: [
            { name: "Sulfur Dioxide (SO2)", value: "45.2 ppm" },
            { name: "Nitrogen Oxides (NOx)", value: "82.1 ppm" },
            { name: "Hydrogen Fluoride (HF)", value: "24.8 ppm" },
            { name: "Ammonia (NH3)", value: "12.4 ppm" }
        ],
        active_alerts: [
            { id: "ALT-904", gas_type: "SO2", value: "124.5 ppm", threshold: "100.0 ppm", wind: "Towards City (NE)", time: "09:12", severity: "Critical" },
            { id: "ALT-902", gas_type: "HF", value: "24.8 ppm", threshold: "20.0 ppm", wind: "Towards City (N)", time: "08:45", severity: "High" }
        ],
        historical_logs: [
            { id: "LOG-881", date: "2026-06-03", gas_type: "H2S", peak_value: "58.2 ppm", operator: "Manager_Safi_01", action: "Automated Plant Production Cutoff Triggered" },
            { id: "LOG-879", date: "2026-06-02", gas_type: "SO2", peak_value: "142.0 ppm", operator: "Manager_Safi_01", action: "Manual Chamber Valve Purge Acknowledged" },
            { id: "LOG-875", date: "2026-05-30", gas_type: "NH3", peak_value: "41.9 ppm", operator: "System_Auto", action: "Wind Vector Shift Cleared Alarm State" },
            { id: "LOG-870", date: "2026-05-28", gas_type: "HF", peak_value: "29.1 ppm", operator: "Manager_Safi_02", action: "Scrubber Unit Subsystem Restarted" }
        ]
    };

    // Show a clean, calm loading interface while the network requests process
    if (isLoading) {
        return (
            <div className="flex h-screen w-screen bg-[#f1f5f9] items-center justify-center font-black text-xs uppercase tracking-widest text-slate-400">
                Syncing Safi atmospheric telemetry arrays...
            </div>
        );
    }

    // Fallback object to ensure the screen doesn't break if you are offline
    const activeWeather = liveWeather || {
        location: "Safi, MA", current_temp: "--°", condition: "Connecting...", time: "00:00", date: "RESETTING CONNECTION",
        metrics: { clouds: "0%", humidity: "0%", wind: "0 km/h", feels_like: "--°C" }, forecast: []
    };

    return (
        <div className="flex h-screen w-screen bg-[#f1f5f9] text-slate-800 font-sans antialiased overflow-hidden">
            
            {/* SIDEBAR NAVIGATION */}
            <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col px-6 py-6 shrink-0 h-full shadow-xs">
                <div className="flex items-center gap-2 font-bold text-green-700 text-xl tracking-wide border-b border-slate-100 pb-5">
                    <span className="px-2 py-1 border border-slate-200 rounded-lg text-xs font-black bg-slate-50 text-slate-900">OCP</span>
                    <span className="font-normal text-xl text-slate-900 block select-none">
                        Air<span className="text-emerald-600 font-bold">Guard</span>
                    </span>
                </div>
                
                <nav className="mt-8 space-y-1 flex-1">
                    {[
                        ['dashboard', 'Dashboard overview'],
                        ['alerts', 'Active Alerts Room'],
                        ['history', 'Compliance History']
                    ].map(([viewKey, label]) => (
                        <button 
                            key={viewKey}
                            onClick={() => setCurrentView(viewKey)}
                            className={`w-full text-left px-4 py-3.5 text-xs font-bold rounded-xl uppercase tracking-wider transition-all cursor-pointer block border-none outline-none ${
                                currentView === viewKey 
                                    ? 'bg-[#f0fdf4] text-emerald-800 border-l-4 border-emerald-700 font-black shadow-xs' 
                                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* MAIN WORKSPACE CONTENT */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                
                <header className="h-20 flex items-center justify-between px-8 shrink-0 bg-white border-b border-slate-200/60 z-10">
                    <div className="text-xs font-black tracking-wider text-slate-500 uppercase">
                        System Terminal — <span className="text-slate-400 font-medium">OCP Safi Environmental Command Center</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] bg-slate-50 text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg font-black uppercase tracking-wider">
                            Role: Environment Manager
                        </span>
                    </div>
                </header>

                <div className="flex-1 p-8 overflow-hidden bg-[#f8fafc] h-[calc(100vh-5rem)]">
                    
                    {/* VIEW 1: LIVE DASHBOARD WITH REAL WEATHER API DATA */}
                    {currentView === 'dashboard' && (
                        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-stretch h-full">
                            <div className="xl:col-span-3 flex flex-col gap-6 h-full">
                                <div className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl p-8 text-white relative shadow-sm flex flex-col justify-between flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="bg-white/10 text-white text-[10px] font-black tracking-wider uppercase px-3 py-1.5 rounded-md backdrop-blur-md">OCP AtmoSafe Terminal</span>
                                            <div className="text-xs font-semibold opacity-70 mt-3 uppercase tracking-wider">{activeWeather.location} Perimeter Feed</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-black tracking-tight font-mono">{activeWeather.time}</div>
                                            <div className="text-[10px] font-black tracking-widest opacity-40 uppercase mt-1">{activeWeather.date}</div>
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <h1 className="text-7xl font-black tracking-tighter leading-none select-none">{activeWeather.current_temp}</h1>
                                        <p className="text-sm font-bold opacity-80 tracking-wide mt-2 uppercase">{activeWeather.condition}</p>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {[
                                            ['Clouds coverage', activeWeather.metrics.clouds],
                                            ['Humidity load', activeWeather.metrics.humidity],
                                            ['Real wind speed', activeWeather.metrics.wind],
                                            ['Feels Like Temp', activeWeather.metrics.feels_like]
                                        ].map(([lbl, val], i) => (
                                            <div key={i} className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/5 flex flex-col">
                                                <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider block">{lbl}</span>
                                                <span className="text-sm font-extrabold text-white mt-0.5">{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 shrink-0">
                                    {factoryData.gases.map((gas, i) => (
                                        <div key={i} className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-xs flex flex-col justify-between">
                                            <div>
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">{gas.name}</span>
                                                <span className="text-2xl font-black text-slate-900 block mt-1 font-mono">{gas.value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs flex flex-col h-full overflow-hidden">
                                <div className="flex flex-col justify-start h-full">
                                    <div className="flex justify-between items-center border-b border-slate-100 pb-4 shrink-0">
                                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Forecast Matrix</h3>
                                    </div>
                                    <div className="divide-y divide-slate-100 flex-1 overflow-y-auto pr-1">
                                        {activeWeather.forecast.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center text-xs font-bold py-4 first:pt-3 last:pb-0">
                                                <div className="flex flex-col">
                                                    <span className="text-slate-800 font-black">{item.day}</span>
                                                    <span className="text-[10px] text-slate-400 font-medium mt-0.5">{item.status}</span>
                                                </div>
                                                <span className="text-slate-900 font-black text-sm">{item.temp}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* VIEW 2: ACTIVE ALERTS ROOM */}
                    {currentView === 'alerts' && (
                        <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs flex flex-col h-full overflow-hidden">
                            <div className="flex justify-between items-center border-b pb-4 border-slate-100 shrink-0">
                                <div className="text-slate-900 font-black text-xs uppercase tracking-wider">Active Environmental Threats Terminal</div>
                                <span className="bg-rose-50 border border-rose-100 text-rose-700 text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">Requires Action Logs Authorization</span>
                            </div>
                            <div className="flex-1 overflow-y-auto space-y-3 mt-4 pr-1">
                                {factoryData.active_alerts.map((alert) => (
                                    <div key={alert.id} className="border border-slate-100 rounded-xl p-5 bg-slate-50/50 shadow-2xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider border ${alert.severity === 'Critical' ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>{alert.severity} Breach</span>
                                                <span className="text-[10px] font-mono font-black text-slate-400">{alert.id}</span>
                                                <span className="text-[11px] text-slate-400 font-medium">• Detected at {alert.time} UTC</span>
                                            </div>
                                            <h4 className="text-sm font-black text-slate-800 mt-1">
                                                Gas Dispersion Incident: <span className="text-rose-600 font-black font-mono">{alert.gas_type}</span> has violated emission boundary limits.
                                            </h4>
                                            <div className="text-[11px] text-slate-500 font-semibold flex flex-wrap gap-x-4 gap-y-1 pt-0.5">
                                                <span>Live Metric: <strong className="text-slate-700 font-mono">{alert.value}</strong></span>
                                                <span>Allowed Ceiling: <strong className="text-slate-700 font-mono">{alert.threshold}</strong></span>
                                                <span>Vector Path: <strong className="text-slate-700 uppercase">{alert.wind}</strong></span>
                                            </div>
                                        </div>
                                        <button className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black rounded-xl uppercase tracking-wider shadow-xs whitespace-nowrap cursor-pointer transition-colors border-none outline-none">Acknowledge & Dispatch Intervention</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* VIEW 3: COMPLIANCE HISTORY */}
                    {currentView === 'history' && (
                        <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs flex flex-col h-full overflow-hidden">
                            <div className="flex justify-between items-center border-b pb-4 border-slate-100 shrink-0">
                                <div className="text-slate-900 font-black text-xs uppercase tracking-wider">Historical System Compliance Logs</div>
                                <span className="bg-slate-50 border border-slate-200 text-slate-500 text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">Immutable Security Ledger</span>
                            </div>
                            <div className="flex-1 overflow-auto mt-4 rounded-xl border border-slate-100">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead className="sticky top-0 z-10 bg-slate-50 shadow-2xs">
                                        <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                            <th className="py-4 px-4">Log Token</th>
                                            <th className="py-4 px-4">Timestamp</th>
                                            <th className="py-4 px-4">Analyzed Gas</th>
                                            <th className="py-4 px-4">Peak Output</th>
                                            <th className="py-4 px-4">Automated/Manual Remediation Action</th>
                                            <th className="py-4 px-4 text-right border-none">Authorized Operator</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs font-bold text-slate-600 divide-y divide-slate-100 bg-white">
                                        {factoryData.historical_logs.map((log) => (
                                            <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4 px-4 font-mono text-slate-400 font-semibold">{log.id}</td>
                                                <td className="py-4 px-4 text-slate-900 font-medium">{log.date}</td>
                                                <td className="py-4 px-4 text-emerald-800 uppercase tracking-wider font-mono">{log.gas_type}</td>
                                                <td className="py-4 px-4 text-rose-600 font-extrabold font-mono">{log.peak_value}</td>
                                                <td className="py-4 px-4 text-slate-500 font-medium">{log.action}</td>
                                                <td className="py-4 px-4 font-mono text-[11px] text-slate-400 text-right">{log.operator}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}