import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Car, LogIn, Key, Mail, Shield } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('admin@drivehub.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  const setDemoUser = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-slate-100">
        <div className="text-center space-y-1.5">
          <div className="inline-flex p-3 bg-emerald-600 text-white rounded-xl mb-1 shadow-sm">
            <Car className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-wider">DriveHub</h1>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">
            Workplace Fleet & Visitor Management
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@drivehub.com"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-xs"
          >
            <LogIn className="w-3.5 h-3.5 text-emerald-400" />
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Quick Demo Credentials */}
        <div className="border-t border-slate-100 pt-4 space-y-2">
          <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <Shield className="w-3 h-3 text-emerald-600" />
            <span>Select Demo Account</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            <button
              onClick={() => setDemoUser('admin@drivehub.com')}
              className="px-2 py-1 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 rounded font-semibold text-center transition-colors"
            >
              Admin
            </button>
            <button
              onClick={() => setDemoUser('employee@drivehub.com')}
              className="px-2 py-1 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 rounded font-semibold text-center transition-colors"
            >
              Employee
            </button>
            <button
              onClick={() => setDemoUser('security@drivehub.com')}
              className="px-2 py-1 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 rounded font-semibold text-center transition-colors"
            >
              Security
            </button>
            <button
              onClick={() => setDemoUser('vendor@drivehub.com')}
              className="px-2 py-1 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 rounded font-semibold text-center transition-colors"
            >
              Super Vendor
            </button>
            <button
              onClick={() => setDemoUser('subvendor@drivehub.com')}
              className="px-2 py-1 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 rounded font-semibold text-center transition-colors"
            >
              Sub Vendor
            </button>
            <button
              onClick={() => setDemoUser('driver@drivehub.com')}
              className="px-2 py-1 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 rounded font-semibold text-center transition-colors"
            >
              Driver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
