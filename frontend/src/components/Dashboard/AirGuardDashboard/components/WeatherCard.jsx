import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroBg from '../../../../assets/hero_bg.png';

export default function WeatherCard() {
    const [liveWeather, setLiveWeather] = useState(null);
    const WEATHER_API_KEY = "f7f31a5526fe4b2883e94054261304";

    const normalizeWeatherIcon = (icon) => {
        if (!icon) return 'https://cdn.weatherapi.com/weather/64x64/day/113.png';
        return icon.startsWith('//') ? `https:${icon}` : icon;
    };

    useEffect(() => {
        const fetchWeatherTelemetry = () => {
            axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=Safi,Morocco&days=5`)
                .then((response) => {
                    const data = response.data;
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
                        icon: normalizeWeatherIcon(data.current.condition.icon),
                        forecast: data.forecast.forecastday.map(f => ({
                            day: new Date(f.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' }),
                            status: f.day.condition.text,
                            temp: Math.round(f.day.maxtemp_c) + "°C",
                            icon: normalizeWeatherIcon(f.day.condition.icon)
                        }))
                    });
                })
                .catch((error) => console.error("Weather sync error:", error));
        };

        fetchWeatherTelemetry(); // Initial pull on layout bootup
        const intervalId = setInterval(fetchWeatherTelemetry, 30000); // 🚀 Live refresh weather data & local time every 30 seconds
        return () => clearInterval(intervalId);
    }, []);

    const activeWeather = liveWeather || {
        location: "Safi, MA", current_temp: "--°", condition: "Connecting...", time: "00:00", date: "RESETTING",
        metrics: { clouds: "0%", humidity: "0%", wind: "0 km/h", feels_like: "--°C" }, icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png', forecast: []
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Wide Dark Weather Banner */}
            <div
                className="relative rounded-2xl p-8 text-white shadow-sm flex flex-col justify-between w-full overflow-hidden bg-cover bg-center min-h-[340px]"
                style={{ backgroundImage: `url(${HeroBg})` }}
            >
                {/* Visual Glassmorphism Tints */}
                <div className="absolute inset-0 bg-slate-900/45 z-0"></div>
                <div className="absolute inset-0 bg-emerald-950/10 z-0 backdrop-blur-[1px]" />

                <div className="relative z-10 flex justify-between items-start">
                    <div>
                        <span className="bg-white/10 text-white text-[10px] font-black tracking-wider uppercase px-3 py-1.5 rounded-md backdrop-blur-md border border-white/5">
                            OCP AtmoSafe Terminal
                        </span>
                        <div className="text-xs font-semibold opacity-70 mt-4 uppercase tracking-wider">{activeWeather.location} Perimeter Feed</div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-black tracking-tight font-mono text-emerald-400">{activeWeather.time}</div>
                        <div className="text-[10px] font-black tracking-widest opacity-40 uppercase mt-1">{activeWeather.date}</div>
                    </div>
                </div>

                <div className="relative z-10 my-6">
                    <div className="flex items-center gap-4">
                        <img src={activeWeather.icon} alt={activeWeather.condition || 'Weather icon'} className="h-16 w-16 object-contain" />
                        <div>
                            <h1 className="text-7xl font-black tracking-tighter leading-none select-none">{activeWeather.current_temp}</h1>
                            <p className="text-sm font-bold opacity-80 tracking-wide mt-2 uppercase flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                {activeWeather.condition}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        ['Clouds coverage', activeWeather.metrics.clouds],
                        ['Humidity load', activeWeather.metrics.humidity],
                        ['Real wind speed', activeWeather.metrics.wind],
                        ['Feels Like Temp', activeWeather.metrics.feels_like]
                    ].map(([lbl, val], i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/5 flex flex-col hover:bg-white/10 transition-colors">
                            <span className="text-[9px] uppercase font-black text-slate-300 tracking-wider block opacity-70">{lbl}</span>
                            <span className="text-sm font-extrabold text-white mt-0.5">{val}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Clean Full-Width Forecast Matrix */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs flex flex-col w-full overflow-hidden">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4 shrink-0">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Forecast Matrix</h3>
                </div>
                <div className="divide-y divide-slate-100 overflow-y-auto">
                    {activeWeather.forecast.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-xs font-bold py-4 first:pt-3 last:pb-0">
                            <div className="flex items-center gap-3">
                                <img src={item.icon} alt={item.status} className="h-10 w-10 object-contain" />
                                <div className="flex flex-col">
                                    <span className="text-slate-800 font-black">{item.day}</span>
                                    <span className="text-[10px] text-slate-400 font-medium mt-0.5">{item.status}</span>
                                </div>
                            </div>
                            <span className="text-slate-900 font-black text-sm">{item.temp}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}