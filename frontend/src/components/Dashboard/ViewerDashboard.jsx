import React from 'react';


export default function ViewerDashboard({ onLogout }) {

  const handleLogoutClick = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      <div className="bg-gradient-to-r from-emerald-800 to-green-700 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold">Welcome to AirGuard Monitor, Citizen!</h1>
          <p className="text-xs text-green-100 mt-1">You are currently logged in with Public Viewer privileges for Safi Region.</p>
        </div>
        
        <button 
          onClick={handleLogoutClick}
          className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
        >
          Sign Out / Exit Panel ✕
        </button>
      </div>

       
 

    </div>
  );
}