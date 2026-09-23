import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Car,
  Users,
  Building2,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Lock,
  FileCheck,
  Layers,
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePortalAccess = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans">
      {/* Header Navbar */}
      <header className="border-b border-zinc-800 bg-black sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-white text-black p-1.5 rounded">
              <Car className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">DriveHub</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#modules" className="hover:text-white transition-colors">Modules</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePortalAccess}
              className="bg-white hover:bg-zinc-200 text-black font-semibold text-xs px-4 py-2 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>{user ? 'Go to Dashboard' : 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 border-b border-zinc-800 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold">
            Workplace Fleet & Visitor Management MVP
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Simple, Functional Operations Platform
          </h1>

          <p className="text-zinc-400 text-sm max-w-2xl mx-auto font-normal leading-relaxed">
            Centralized management dashboard built for visitor gate security, multi-level vendor fleet management, driver document compliance, and shuttle shift scheduling.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handlePortalAccess}
              className="w-full sm:w-auto bg-white text-black font-bold text-xs px-6 py-3 rounded hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{user ? 'Open Dashboard' : 'Launch Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#modules"
              className="w-full sm:w-auto bg-zinc-900 text-zinc-300 hover:bg-zinc-800 font-semibold text-xs px-6 py-3 rounded border border-zinc-800 transition-colors"
            >
              View 3 Modules
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded">
              <div className="text-xl font-bold text-white">6 Roles</div>
              <div className="text-[11px] text-zinc-400">Role-Based Access</div>
            </div>
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded">
              <div className="text-xl font-bold text-white">Audit Ready</div>
              <div className="text-[11px] text-zinc-400">Entry/Exit Logging</div>
            </div>
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded">
              <div className="text-xl font-bold text-white">Hierarchy</div>
              <div className="text-[11px] text-zinc-400">Multi-Tier Vendors</div>
            </div>
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded">
              <div className="text-xl font-bold text-white">Shuttle Grid</div>
              <div className="text-[11px] text-zinc-400">Driver Shift Matrix</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Modules Section */}
      <section id="modules" className="py-16 max-w-6xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-1">
          <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Core Capabilities</h2>
          <p className="text-2xl font-bold text-white">Three Functional Modules</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Module 1 */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4">
            <div className="p-2 bg-zinc-800 text-white rounded w-fit">
              <Users className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">1. Visitor Management</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Pre-register visitors with host assignment, host approval workflow, and 1-click Security Gate Check-In/Check-Out with timestamps.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-zinc-300 border-t border-zinc-800 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Pre-approval badges for today's visits</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Exact gate check-in/out timestamps</span>
              </li>
            </ul>
          </div>

          {/* Module 2 */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4">
            <div className="p-2 bg-zinc-800 text-white rounded w-fit">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">2. Vendor & Fleet Operations</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Multi-level vendor hierarchy (Super → Regional → City), parent node re-assignment, fleet delegation switches, and document expiry flags.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-zinc-300 border-t border-zinc-800 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Adjacency list parent-child tree</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Document expiry status (RC, DL, PUC)</span>
              </li>
            </ul>
          </div>

          {/* Module 3 */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4">
            <div className="p-2 bg-zinc-800 text-white rounded w-fit">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">3. Shuttle Management</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Fixed route configuration, employee shuttle seat bookings, and an interactive hourly timeline matrix visualizing driver duty and break shifts.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-zinc-300 border-t border-zinc-800 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Pickup and Drop route schedule manager</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Hourly shift and break schedule grid</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 border-t border-zinc-800 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-1">
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Technical Highlights</h2>
            <p className="text-2xl font-bold text-white">Built for Simplicity & Clean Architecture</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-zinc-900 border border-zinc-800 rounded space-y-2">
              <Lock className="w-5 h-5 text-zinc-300" />
              <h4 className="font-bold text-sm text-white">JWT Role Security</h4>
              <p className="text-xs text-zinc-400">
                6 user roles enforced via JWT tokens and Express middleware guards.
              </p>
            </div>

            <div className="p-5 bg-zinc-900 border border-zinc-800 rounded space-y-2">
              <FileCheck className="w-5 h-5 text-zinc-300" />
              <h4 className="font-bold text-sm text-white">Document Compliance</h4>
              <p className="text-xs text-zinc-400">
                Date comparison flags expired driver licenses, permits, and pollution certificates.
              </p>
            </div>

            <div className="p-5 bg-zinc-900 border border-zinc-800 rounded space-y-2">
              <Layers className="w-5 h-5 text-zinc-300" />
              <h4 className="font-bold text-sm text-white">O(1) Hierarchy Reorg</h4>
              <p className="text-xs text-zinc-400">
                Updates parent vendor ObjectIds dynamically without heavy database overhead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="border-t border-zinc-800 py-6 text-center text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-zinc-300" />
            <span className="font-bold text-zinc-300">DriveHub</span>
          </div>
          <p>© {new Date().getFullYear()} DriveHub Management Dashboard.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
