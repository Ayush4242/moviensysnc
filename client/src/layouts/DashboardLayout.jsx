import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
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
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans">
      {/* Top Navbar - Minimal Solid Black */}
      <header className="bg-black text-white sticky top-0 z-30 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-zinc-800 p-2 rounded-lg text-white border border-zinc-700">
              <Car className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">DriveHub</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-zinc-200">{user?.name || 'User'}</p>
              <p className="text-[11px] font-mono text-zinc-400">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white px-3 py-1.5 rounded text-xs font-medium transition-colors border border-zinc-700 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Sidebar - Clean Minimal */}
        <aside className="w-56 shrink-0 hidden md:block">
          <nav className="bg-white border border-zinc-200 rounded-lg p-2 space-y-0.5 sticky top-22">
            <div className="px-3 py-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Navigation
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-black text-white font-semibold'
                        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
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
