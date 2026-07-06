import React, { useState, useEffect } from 'react';
import API from '../../api';
import Logo from '../../assets/logo.png'; 

export default function AdminDashboard({ onLogout, onNavigateHome }) {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  // Profile Settings States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  // ─── NEW USER CREATION MODAL STATES ───
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newManagerName, setNewManagerName] = useState('');
  const [newManagerEmail, setNewManagerEmail] = useState('');
  const [newManagerPassword, setNewManagerPassword] = useState('');
  const [modalError, setModalError] = useState(null);
  const [modalSuccess, setModalSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch users from the backend when activeTab is 'users'
  useEffect(() => {
    if (activeTab === 'users') {
      API.get('/admin')
      .then(res => {
        setUsers(res.data.users || []);
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Failed to fetch user database entries.');
      });
    }
  }, [activeTab]);

  // Ban / Unban Toggle Function
  const toggleUserStatus = (userId) => {
    API.patch(`/admin/toggle-ban/${userId}`)
    .then(res => {
      setUsers(users.map(u => u.id === userId ? res.data.data : u));
    })
    .catch(err => {
      alert(err.response?.data?.message || 'Failed to update compliance status.');
    });
  };

  // Create Manager Form Submission Dispatcher
  const handleCreateManagerSubmit = (e) => {
    e.preventDefault();

    setModalError(null);
    setModalSuccess(null);
    setIsSubmitting(true);

    API.post('/admin/create-manager', {
      name: newManagerName,
      email: newManagerEmail,
      password: newManagerPassword
    })
    .then(res => {
      setModalSuccess('Operational profile authorized successfully!');
      setUsers([...users, res.data.data]);
      
      // Clear forms
      setNewManagerName('');
      setNewManagerEmail('');
      setNewManagerPassword('');
      setIsSubmitting(false);

      // Auto-close modal after brief delay
      setTimeout(() => {
        setIsModalOpen(false);
        setModalSuccess(null);
      }, 1500);
    })
    .catch(err => {
      setModalError(err.message);
      setIsSubmitting(false);
    });
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    if (onLogout) onLogout();
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (newPassword !== confirmPassword) {
      setFormError("New passwords do not match!");
      return;
    }

    API.put('/admin/update-password', {
      currentPassword,
      newPassword,
    })
    .then(() => {
      setFormSuccess("Password updated successfully!");
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    })
    .catch(err => {
      setFormError(err.response?.data?.message || err.message || 'Failed to update system credentials.'); 
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased font-sans flex flex-col justify-between relative">
      
      {/* HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white border-b border-slate-200/60 shadow-xs h-20 flex items-center">
        <div className="w-full px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-green-700 text-xl sm:text-2xl tracking-wide">
            <span className="p-1.5 border border-green-200 rounded-lg flex items-center justify-center">
              <img src={Logo} alt="OCP Logo" className="h-5 sm:h-6 w-16 sm:w-18 object-contain" />
            </span>
            <span className="font-normal text-2xl sm:text-3xl tracking-normal font-sans text-slate-900 block select-none">
              Air<span className="text-emerald-600 font-bold">Guard</span>
            </span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-slate-500 hover:text-slate-900 text-xl cursor-pointer"
            >
              ☰
            </button>
            <button onClick={onNavigateHome} className="text-[10px] sm:text-xs font-bold bg-emerald-800 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl uppercase tracking-wider hover:bg-emerald-700 cursor-pointer transition-colors">
              Main Site
            </button>
            <button onClick={handleLogoutClick} className="text-[10px] sm:text-xs font-bold bg-rose-50 border border-rose-200 text-rose-700 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl uppercase tracking-wider hover:bg-rose-100 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* WORKSPACE CONTENT CONTAINER */}
      <div className="flex flex-col lg:flex-row flex-1 w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 gap-4 sm:gap-6 lg:gap-8 items-stretch min-h-[calc(100vh-5rem)]">
        
        {/* VIEW SELECTOR SIDEBAR PANEL */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 bg-white border border-slate-200/50 rounded-2xl p-4 flex flex-col gap-1 h-auto lg:h-[calc(100vh-9rem)] shadow-xs lg:sticky lg:top-24`}>
          <div className="px-3 py-2 mb-2">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">Admin Panel</h2>
            <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 block mt-0.5 uppercase tracking-wide">System Control</span>
          </div>
          
          <button onClick={() => { setActiveTab('users'); setSidebarOpen(false); }} className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer ${activeTab === 'users' ? 'bg-[#f0fdf4] text-emerald-800' : 'text-slate-500 hover:bg-slate-50'}`}>
            User Management
          </button>
          <button onClick={() => { setActiveTab('profile'); setSidebarOpen(false); }} className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer ${activeTab === 'profile' ? 'bg-[#f0fdf4] text-emerald-800' : 'text-slate-500 hover:bg-slate-50'}`}>
            Profile Settings
          </button>
        </aside>

        {/* WORKSPACE ACTIVE SUBVIEW GATE */}
        <main className="flex-1 space-y-4 sm:space-y-6 h-full w-full">
          
          {activeTab === 'users' && (
            <>
              <div className="flex flex-col gap-3 sm:gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">User Management</h1>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1.5 leading-relaxed">
                    Oversee administrative access, manage security protocols, and invite environmental analysts to the AirGuard ecosystem.
                  </p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-colors shadow-sm self-start cursor-pointer"
                >
                  Add New User
                </button>
              </div>

              {/* ANALYTICS STAT STRIP METRIC PANELS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white border border-slate-200/60 p-4 sm:p-5 rounded-2xl shadow-xs">
                  <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-wider block">Total Platform Personnel</span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 block">{users.length}</span>
                </div>
                <div className="bg-white border border-slate-200/60 p-4 sm:p-5 rounded-2xl shadow-xs">
                  <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-wider block">Active Analysts</span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1 block">{users.filter(u => !u.is_banned).length}</span>
                </div>
                <div className="bg-white border border-slate-200/60 p-4 sm:p-5 rounded-2xl shadow-xs">
                  <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-wider block">Access Suspended</span>
                  <span className="text-2xl sm:text-3xl font-black text-rose-700 mt-1 block">{users.filter(u => u.is_banned).length}</span>
                </div>
              </div>

              {/* LIVE ACCESS DATATABLE PANEL */}
              <div className="bg-white border border-slate-200/60 rounded-2xl p-3 sm:p-4 shadow-xs space-y-4 overflow-x-auto">
                {error && <p className="text-xs text-rose-600 font-bold text-center">Error: {error}</p>}
                
                <div className="border border-slate-100 rounded-xl overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#fafafa] border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[9px] sm:text-[10px]">
                        <th className="px-3 sm:px-5 py-3 sm:py-4 whitespace-nowrap">Name</th>
                        <th className="px-3 sm:px-5 py-3 sm:py-4 whitespace-nowrap">Email Address</th>
                        <th className="px-3 sm:px-5 py-3 sm:py-4 whitespace-nowrap">Assigned Role</th>
                        <th className="px-3 sm:px-5 py-3 sm:py-4 whitespace-nowrap">Access Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-3 sm:px-5 py-3 sm:py-4 text-slate-900 font-bold whitespace-nowrap">{user.name}</td>
                          <td className="px-3 sm:px-5 py-3 sm:py-4 text-slate-400 font-mono text-[11px] sm:text-sm truncate">{user.email}</td>
                          <td className="px-3 sm:px-5 py-3 sm:py-4 text-emerald-800 uppercase text-[9px] sm:text-[10px] font-black tracking-wider whitespace-nowrap">{user.role?.replace('_', ' ') || 'user'}</td>
                          <td className="px-3 sm:px-5 py-3 sm:py-4">
                            <button
                              onClick={() => toggleUserStatus(user.id)}
                              className={`px-2 sm:px-3 py-1 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-wider border transition-all cursor-pointer whitespace-nowrap ${
                                !user.is_banned
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                  : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                              }`}
                            >
                              {!user.is_banned ? '● Active' : '○ Disabled'}
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

          {/* PROFILE PASSWORD PANELS */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl w-full">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Profile Settings</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">Update administrative credentials to preserve network safety rules.</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="mt-6 sm:mt-8 bg-white border border-slate-200/60 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4 sm:space-y-5">
                {formError && <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-xs font-bold">Error: {formError}</div>}
                {formSuccess && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-xs font-bold">Success: {formSuccess}</div>}

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-wider">Current Password</label>
                  <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="w-full border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm focus:outline-hidden focus:border-emerald-600 bg-slate-50/50" placeholder="••••••••" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-wider">New Password</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm focus:outline-hidden focus:border-emerald-600 bg-slate-50/50" placeholder="Min 8 characters" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-wider">Confirm Password</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm focus:outline-hidden focus:border-emerald-600 bg-slate-50/50" placeholder="••••••••" />
                </div>
                <div className="pt-2">
                  <button type="submit" className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-2 sm:py-3 rounded-xl transition-colors shadow-xs cursor-pointer">Update Credentials</button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* ─── MODAL ACCOUNT PROVISIONING DIALOG ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="bg-white rounded-2xl w-full max-w-md border border-slate-200 shadow-xl overflow-hidden relative z-10 animate-none max-h-[90vh] overflow-y-auto">
            
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center sticky top-0">
              <div className="flex flex-col">
                <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">Authorize Operations Profile</h3>
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">Create Environment Manager Account</span>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900 font-bold text-sm cursor-pointer ml-2 flex-shrink-0">✕</button>
            </div>

            <form onSubmit={handleCreateManagerSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {modalError && <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold">Error: {modalError}</div>}
              {modalSuccess && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold">Authorized! {modalSuccess}</div>}

              <div className="flex flex-col gap-1.5">
                <label className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-wider">Full Operator Name</label>
                <input type="text" value={newManagerName} onChange={(e) => setNewManagerName(e.target.value)} required placeholder="e.g. Jamal El Idrissi" className="w-full border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs focus:outline-hidden focus:border-emerald-600 bg-slate-50/20" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-wider">Corporate Work Email</label>
                <input type="email" value={newManagerEmail} onChange={(e) => setNewManagerEmail(e.target.value)} required placeholder="username@ocpgroup.ma" className="w-full border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs focus:outline-hidden focus:border-emerald-600 bg-slate-50/20" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-wider">Temporary Passcode</label>
                <input type="password" value={newManagerPassword} onChange={(e) => setNewManagerPassword(e.target.value)} required minLength={8} placeholder="Minimum 8 safety tokens" className="w-full border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs focus:outline-hidden focus:border-emerald-600 bg-slate-50/20" />
              </div>

              <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end border-t border-slate-100 mt-4 sm:mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-bold text-slate-400 uppercase tracking-wider hover:bg-slate-50 rounded-xl cursor-pointer order-2 sm:order-1">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 sm:px-5 py-2 sm:py-2.5 bg-emerald-800 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer order-1 sm:order-2">
                  {isSubmitting ? 'Authorizing...' : 'Provision Access'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}