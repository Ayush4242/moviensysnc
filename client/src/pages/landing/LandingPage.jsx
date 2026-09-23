import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Car,
  ShieldCheck,
  Users,
  Building2,
  Calendar,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Lock,
  Layers,
  ChevronRight,
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-sm">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-wider text-white">DriveHub</span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 ml-2">
                Enterprise
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Key Offerings</a>
            <a href="#modules" className="hover:text-emerald-400 transition-colors">Operational Modules</a>
            <a href="#architecture" className="hover:text-emerald-400 transition-colors">Architecture</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePortalAccess}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{user ? 'Go to Dashboard' : 'Access Portal'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 border-b border-slate-800/80 text-center">
        <div className="max-w-5xl mx-auto px-4 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Enterprise Workplace & Fleet Operations Hub
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Centralized Management for <br />
            <span className="text-emerald-400">Visitors, Fleets & Shuttles</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Eliminate fragmented paper registers. DriveHub unifies verified gate visitor check-ins, multi-tiered vendor hierarchy management, driver compliance document tracking, and shuttle shift scheduling into one operational dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={handlePortalAccess}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-7 py-3 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{user ? 'Launch Dashboard' : 'Sign In to Portal'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <a
              href="#modules"
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs px-7 py-3 rounded-lg border border-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore 3 Modules</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-2xl font-black text-emerald-400">6 Roles</div>
              <div className="text-xs text-slate-400 font-medium">Role-Based Access Control</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-2xl font-black text-emerald-400">100% Audit</div>
              <div className="text-xs text-slate-400 font-medium">Gate Entry Timestamps</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-2xl font-black text-emerald-400">Multi-Tier</div>
              <div className="text-xs text-slate-400 font-medium">Vendor Hierarchy Tree</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-2xl font-black text-emerald-400">Live Grid</div>
              <div className="text-xs text-slate-400 font-medium">Driver Shift Schedule</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Modules Showcase */}
      <section id="modules" className="py-20 max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Operational Modules</h2>
          <p className="text-3xl font-extrabold text-white">Three Pillars of Operations</p>
          <p className="text-slate-400 text-xs max-w-lg mx-auto">
            Integrated capabilities designed to streamline campus security, third-party fleets, and employee transport.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Module 1 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 hover:border-slate-700 transition-colors">
            <div className="p-3 bg-emerald-950 text-emerald-400 rounded-xl w-fit border border-emerald-800">
              <Users className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Module 1</span>
              <h3 className="text-lg font-bold text-white">Visitor Management</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pre-register visitors with host employee assignment, approval workflows, and 1-click Security Gate Check-In / Check-Out with exact timestamp auditing.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pre-approval badges for today's visits</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Security gate entry/exit timestamp logging</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Host employee approval/rejection controls</span>
              </li>
            </ul>
          </div>

          {/* Module 2 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 hover:border-slate-700 transition-colors">
            <div className="p-3 bg-emerald-950 text-emerald-400 rounded-xl w-fit border border-emerald-800">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Module 2</span>
              <h3 className="text-lg font-bold text-white">Vendor & Fleet Operations</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Multi-level vendor hierarchy (Super → Regional → City Vendors), parent node reorganization, fleet delegation switches, and document expiry flags.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Adjacency list parent-child tree visualizer</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated document expiry flags (RC, DL, PUC)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1-to-1 Vehicle & Driver allocation sync</span>
              </li>
            </ul>
          </div>

          {/* Module 3 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 hover:border-slate-700 transition-colors">
            <div className="p-3 bg-emerald-950 text-emerald-400 rounded-xl w-fit border border-emerald-800">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Module 3</span>
              <h3 className="text-lg font-bold text-white">Shuttle & Dispatch Hub</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Configurable fixed routes, employee seat booking, and an interactive hourly timeline matrix visualizing driver duty shifts and break periods.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pickup & Drop route schedule manager</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Employee shuttle reservation system</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Visual hourly shift & break matrix grid</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feature Value Proposition Grid */}
      <section id="features" className="py-16 border-t border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Architecture Highlights</h2>
            <p className="text-2xl font-extrabold text-white">Built for Security & Compliance</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
              <Lock className="w-6 h-6 text-emerald-400" />
              <h4 className="font-bold text-white text-sm">Role-Based Security</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                6 distinct user roles (Admin, Employee, Security, Super Vendor, Sub Vendor, Driver) enforced via JWT bearer tokens and Express middleware guards.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
              <FileCheck className="w-6 h-6 text-emerald-400" />
              <h4 className="font-bold text-white text-sm">Document Compliance</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatic date comparison highlights expired driving licenses, permits, and pollution certificates to prevent non-compliant driver assignment.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
              <Layers className="w-6 h-6 text-emerald-400" />
              <h4 className="font-bold text-white text-sm">Tree Hierarchy Reorganization</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Super Vendors can dynamically update parent vendor IDs in O(1) time without restructuring database schemas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-300">DriveHub Operations Hub</span>
          </div>
          <p>© {new Date().getFullYear()} DriveHub Management Dashboard.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
