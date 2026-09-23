import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Building2,
  UserCheck,
  Truck,
  Calendar,
  MapPin,
  Clock,
  LogOut,
  Car,
  Shield,
} from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Visitors', path: '/visitors', icon: Users },
    { label: 'Vendors', path: '/vendors', icon: Building2 },
    { label: 'Drivers', path: '/drivers', icon: UserCheck },
    { label: 'Vehicles', path: '/vehicles', icon: Truck },
    { label: 'Shuttle Bookings', path: '/bookings', icon: Calendar },
    { label: 'Routes', path: '/routes', icon: MapPin },
    { label: 'Driver Schedule', path: '/schedules', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-30 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-emerald-600 to-teal-500 p-2 rounded-xl text-white shadow-md shadow-emerald-900/30">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-wider text-white">DriveHub</span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 ml-2">
                Enterprise
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-100">{user?.name || 'User'}</p>
              <div className="flex items-center justify-end gap-1 text-[11px] font-bold text-emerald-400">
                <Shield className="w-3 h-3" />
                <span>{user?.role}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border border-slate-700 cursor-pointer shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 hidden md:block">
          <nav className="bg-white border border-slate-200/80 rounded-2xl p-3 shadow-sm space-y-1 sticky top-22">
            <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Management Modules
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 border-l-4 border-emerald-600 shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
