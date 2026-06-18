import React, { useState } from 'react';
import Logo from '../../assets/logo.png'; 

export default function AdminDashboard({ onLogout, onNavigateHome }) {
  const [activeTab, setActiveTab] = useState('users');

  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. Helena Vance', email: 'h.vance@airguard.com', role: 'admin', isActive: true },
    { id: 2, name: 'Mouad Boumahdi', email: 'mouad.dev@airguard.com', role: 'manager', isActive: true },
    { id: 3, name: 'Anas Alami', email: 'anas@airguard.com', role: 'viewer', isActive: false }
  ]);

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased font-sans flex flex-col justify-between">
      
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white border-b border-slate-200/60 shadow-xs h-20 flex items-center">
        <div className="w-full px-8 flex items-center justify-between">
          
          <div className="flex items-center gap-2 font-bold text-green-700 text-2xl tracking-wide">
            <span className="p-1.5 border border-green-200 rounded-lg flex items-center justify-center">
              <img src={Logo} alt="OCP Logo" className="h-6 w-18 object-contain" />
            </span>
            <span className="font-normal text-3xl tracking-normal font-sans text-slate-900 block select-none">
              Air<span className="text-emerald-600">Guard</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onNavigateHome} 
              className="text-sm font-semibold bg-emerald-800 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 cursor-pointer transition-colors"
            >
              <span>← Main Site</span>
            </button>
            <button 
              onClick={handleLogoutClick} 
              className="text-sm font-semibold bg-rose-50 border border-rose-200 text-rose-700 px-4 py-2 rounded-xl hover:bg-rose-100 cursor-pointer transition-colors flex items-center gap-2"
            >
              <span>Logout</span>
              <span className="font-mono text-xs font-bold">✕</span>
            </button>
          </div>

        </div>
      </header>

      <div className="flex flex-1 w-full px-8 py-8 gap-8 items-stretch min-h-[calc(100vh-5rem)]">
        
        <aside className="w-64 bg-white border border-slate-200/50 rounded-2xl p-4 flex flex-col gap-1 h-[calc(100vh-9rem)] shadow-xs sticky top-24">
          <div className="px-3 py-2 mb-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Admin Panel</h2>
            <span className="text-[11px] font-medium text-slate-400 block mt-0.5">System Control</span>
          </div>
          
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full text-left px-4 py-3 text-sm font-semibold rounded-xl transition-colors cursor-pointer ${activeTab === 'users' ? 'bg-[#f0fdf4] text-emerald-800' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            User Management
          </button>
          
         
        </aside>

        <main className="flex-1 space-y-6 h-full">
          
          {activeTab === 'users' && (
            <>
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Management</h1>
                  <p className="text-sm text-slate-500 max-w-xl mt-1.5 leading-relaxed">
                    Oversee administrative access, manage security protocols, and invite environmental analysts to the AirGuard ecosystem.
                  </p>
                </div>
                <button className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-3 rounded-xl transition-colors shadow-xs flex items-center gap-2 self-start cursor-pointer">
                  Add New User
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Platform Users</span>
                  <span className="text-2xl font-black text-slate-900 mt-1 block">{users.length}</span>
                </div>

                <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Active Now</span>
                  <span className="text-2xl font-black text-emerald-600 mt-1 block">
                    {users.filter(u => u.isActive).length}
                  </span>
                </div>

                <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Disabled Users</span>
                  <span className="text-2xl font-black text-rose-600 mt-1 block">
                    {users.filter(u => !u.isActive).length}
                  </span>
                </div>
              </div>

              <div className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-xs space-y-4">


                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#fafafa] border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="px-5 py-3">Name</th>
                        <th className="px-5 py-3">Email</th>
                        <th className="px-5 py-3">Role Selector</th>
                        <th className="px-5 py-3">Account Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-4 text-slate-900 font-bold flex items-center gap-2">
                            <div className="h-6 w-6 bg-slate-200 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-600">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            {user.name}
                          </td>
                          <td className="px-5 py-4 text-slate-400 font-mono">{user.email}</td>
                          <td className="px-5 py-4">
                            <select
                              value={user.role}
                              onChange={(e) => handleRoleChange(user.id, e.target.value)}
                              className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-transparent cursor-pointer bg-slate-100 text-slate-700 focus:bg-white focus:border-slate-300 outline-none transition-colors ${
                                user.role === 'admin' ? 'bg-rose-50 text-rose-700' :
                                user.role === 'manager' ? 'bg-amber-50 text-amber-700' :
                                'bg-emerald-50 text-emerald-700'
                              }`}
                            >
                              <option value="admin">Admin</option>
                              <option value="manager">Manager</option>
                              <option value="viewer">Viewer</option>
                            </select>
                          </td>
                          <td className="px-5 py-4">
                            <button
                              onClick={() => toggleUserStatus(user.id)}
                              className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide cursor-pointer border transition-all ${
                                user.isActive 
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                                  : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                              }`}
                            >
                              {user.isActive ? '● Active' : '○ Desactivé'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

        </main>
      </div>

    </div>
  );
}