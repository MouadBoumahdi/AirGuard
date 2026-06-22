import React, { useState, useEffect } from 'react';
import Logo from '../../assets/logo.png'; 

export default function AdminDashboard({ onLogout, onNavigateHome }) {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); 
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });


  useEffect(() => {
    if (activeTab === 'users') {
      const token = localStorage.getItem('token');
      fetch('http://localhost:8000/api/admin', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        return res.json();
      })
      .then(data => {
        // Matches your controller response: 'users' => $managers
        setUsers(data.users || []);
      })
      .catch(err => {
        setError(err.message);
      });
    }
  }, [activeTab]);


  const toggleUserStatus = (userId) => {
    const token = localStorage.getItem('token');
    
    fetch(`http://localhost:8000/api/admin/toggle-ban/${userId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to update ban status');
      }
      return res.json();
    })
    .then(data => {
      setUsers(users.map(u => u.id === userId ? data.data : u));
    })
    .catch(err => {
      alert(err.message);
    });
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    if (onLogout) {
      onLogout();
    }
  };

const handlePasswordSubmit = (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  // Frontend validation quick check
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    alert("New passwords do not match!");
    return;
  }

  fetch('http://localhost:8000/api/admin/update-password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(passwordForm),
  })
  .then(res => {
    return res.json().then(data => {
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update password');
      }
      return data;
    });
  })
  .then(data => {
    alert(data.message); 
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  })
  .catch(err => {
    alert(err.message); 
  });
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

          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 text-sm font-semibold rounded-xl transition-colors cursor-pointer ${activeTab === 'profile' ? 'bg-[#f0fdf4] text-emerald-800' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Profile Settings
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

              {/* UNCOMMENTED STATS AND REWIRED TO !is_banned STATUS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Platform Users</span>
                  <span className="text-2xl font-black text-slate-900 mt-1 block">{users.length}</span>
                </div>

                <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Active Now</span>
                  <span className="text-2xl font-black text-emerald-600 mt-1 block">
                    {users.filter(u => !u.is_banned).length}
                  </span>
                </div>

                <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Disabled Users</span>
                  <span className="text-2xl font-black text-rose-600 mt-1 block">
                    {users.filter(u => u.is_banned).length}
                  </span>
                </div>
              </div>

              <div className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-xs space-y-4">
                {error && <p className="text-xs text-rose-600 font-bold text-center">Error: {error}</p>}
                
                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#fafafa] border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="px-5 py-3">Name</th>
                        <th className="px-5 py-3">Email</th>
                        <th className="px-5 py-3">Role</th>
                        <th className="px-5 py-3">Account Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-4 text-slate-900 font-bold flex items-center gap-2">
                            {user.name}
                          </td>
                          <td className="px-5 py-4 text-slate-400 font-mono">{user.email}</td>
                          <td className="px-5 py-4 text-slate-500 uppercase font-semibold tracking-wide">{user.role || 'user'}</td>

                          {/* RE-ENABLED ACCOUNT STATUS TOGGLE BUTTON */}
                          <td className="px-5 py-4">
                            <button
                              onClick={() => toggleUserStatus(user.id)}
                              className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide cursor-pointer border transition-all ${
                                !user.is_banned
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                  : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                              }`}
                            >
                              {!user.is_banned ? '● Active' : '○ Desactivé'}
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

          {activeTab === 'profile' && (
            <div className="max-w-2xl">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Profile Settings</h1>
                <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                  Update your administrative account password to maintain server security thresholds.
                </p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="mt-8 bg-white border border-slate-200/60 rounded-2xl p-6 shadow-xs space-y-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Current Password</label>
                  <input 
                    type="password" 
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-emerald-600 bg-slate-50/50" 
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">New Password</label>
                  <input 
                    type="password" 
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-emerald-600 bg-slate-50/50" 
                    placeholder="Minimum 8 characters"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Confirm New Password</label>
                  <input 
                    type="password" 
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-emerald-600 bg-slate-50/50" 
                    placeholder="••••••••"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-3 rounded-xl transition-colors shadow-xs cursor-pointer"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}