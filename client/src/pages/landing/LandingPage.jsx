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
  Clock,
  MapPin,
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Header Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-gradient-to-tr from-emerald-500 to-teal-400 p-2.5 rounded-xl text-white shadow-lg shadow-emerald-900/30">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-wider text-white">DriveHub</span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-800/80 ml-2">
                Enterprise Hub
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Key Offerings</a>
            <a href="#modules" className="hover:text-emerald-400 transition-colors">Operational Modules</a>
            <a href="#architecture" className="hover:text-emerald-400 transition-colors">Architecture</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePortalAccess}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-900/40 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{user ? 'Go to Dashboard' : 'Access Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden border-b border-slate-800/50">
        {/* Glowing Background Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-emerald-800/60 text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            Next-Gen Enterprise Workplace & Transport Platform
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Centralized Operations for <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Visitors, Fleets & Shuttles
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Eliminate fragmented manual logs. DriveHub delivers verified gate visitor check-ins, multi-tiered vendor tree hierarchy management, driver compliance document tracking, and hourly shuttle shift scheduling.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handlePortalAccess}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{user ? 'Launch Dashboard' : 'Sign In to Demo Portal'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <a
              href="#modules"
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm px-8 py-3.5 rounded-xl border border-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore 3 Modules</span>
            </a>
          </div>

          {/* Highlights Bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-2xl font-black text-emerald-400">6 Roles</div>
              <div className="text-xs text-slate-400 font-medium">Role-Based Access Control</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-2xl font-black text-emerald-400">100% Audit</div>
              <div className="text-xs text-slate-400 font-medium">Gate Entry Timestamps</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-2xl font-black text-emerald-400">Multi-Tier</div>
              <div className="text-xs text-slate-400 font-medium">Vendor Hierarchy Tree</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-2xl font-black text-emerald-400">Live Grid</div>
              <div className="text-xs text-slate-400 font-medium">Driver Shift Schedule</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Modules Showcase */}
      <section id="modules" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Unified Operational Suite</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">Three Core Modules in One Platform</p>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Everything your campus or enterprise needs to streamline security, transport vendors, and employee mobility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Module 1 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6 hover:border-emerald-500/50 transition-all group">
            <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-2xl w-fit group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase">Module 1</div>
              <h3 className="text-xl font-bold text-white">Visitor Management</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Pre-register visitors with host assignment, host employee approval workflow, and 1-click Security Gate Check-In / Check-Out with exact timestamp auditing.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pre-approval badges for today's visitors</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Security gate entry/exit timestamp logging</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Host employee approval/rejection buttons</span>
              </li>
            </ul>
          </div>

          {/* Module 2 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6 hover:border-teal-500/50 transition-all group">
            <div className="p-3.5 bg-teal-500/10 text-teal-400 rounded-2xl w-fit group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold text-teal-400 uppercase">Module 2</div>
              <h3 className="text-xl font-bold text-white">Vendor & Fleet Operations</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Multi-level vendor hierarchy (Super → Regional → City Vendors), dynamic parent node reorganization, fleet delegation switches, and driver document expiry flags.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Adjacency list parent-child tree visualizer</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Automated document expiry flags (RC, DL, PUC)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>1-to-1 Vehicle & Driver allocation sync</span>
              </li>
            </ul>
          </div>

          {/* Module 3 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6 hover:border-cyan-500/50 transition-all group">
            <div className="p-3.5 bg-cyan-500/10 text-cyan-400 rounded-2xl w-fit group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold text-cyan-400 uppercase">Module 3</div>
              <h3 className="text-xl font-bold text-white">Shuttle & Dispatch Hub</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Configurable fixed routes, employee seat booking, and an interactive hourly timeline matrix visualizing driver duty shifts and break periods.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Pickup & Drop route schedule manager</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Employee shuttle reservation system</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Visual hourly shift & break matrix grid</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feature Value Proposition Grid */}
      <section id="features" className="py-20 border-t border-slate-800/60 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Enterprise Architecture</h2>
            <p className="text-3xl font-extrabold text-white">Built for Reliability & Audit Compliance</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
              <Lock className="w-6 h-6 text-emerald-400" />
              <h4 className="font-bold text-white">Role-Based JWT Security</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                6 distinct user roles (Admin, Employee, Security, Super Vendor, Sub Vendor, Driver) enforced via JWT bearer tokens and middleware.
              </p>
            </div>

            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
              <FileCheck className="w-6 h-6 text-emerald-400" />
              <h4 className="font-bold text-white">Compliance Assurance</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatic date comparison highlights expired driving licenses, permits, and pollution certificates to prevent non-compliant driver assignment.
              </p>
            </div>

            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
              <Layers className="w-6 h-6 text-emerald-400" />
              <h4 className="font-bold text-white">Flexible Hierarchy Reorganization</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Super Vendors can dynamically update parent vendor IDs in O(1) time without restructuring database schemas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/60 rounded-3xl p-10 md:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Ready to Experience DriveHub?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Access the live demo portal pre-populated with evaluation users across all 6 roles.
          </p>
          <div className="pt-2">
            <button
              onClick={handlePortalAccess}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-xl shadow-emerald-500/30 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Launch Live Demo Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-300">DriveHub Operations Hub</span>
          </div>
          <p>© {new Date().getFullYear()} DriveHub. Built for Enterprise Placement Review.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
