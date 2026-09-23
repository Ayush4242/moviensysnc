import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Car, LogIn, Key, Mail, ShieldCheck } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 space-y-6 border border-slate-100">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3.5 bg-emerald-100 text-emerald-700 rounded-2xl mb-1 shadow-inner">
            <Car className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-wider">DriveHub</h1>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">
            Workplace Fleet & Visitor Operations
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Workplace Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@drivehub.com"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-slate-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
          >
            <LogIn className="w-4 h-4 text-emerald-400" />
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
          </button>
        </form>

        {/* Demo Quick Logins for Evaluators */}
        <div className="border-t border-slate-100 pt-5 space-y-2.5">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Quick Demo Credentials</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => setDemoUser('admin@drivehub.com')}
              className="px-2.5 py-1.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 rounded-lg font-semibold text-center transition-colors"
            >
              Admin
            </button>
            <button
              onClick={() => setDemoUser('employee@drivehub.com')}
              className="px-2.5 py-1.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 rounded-lg font-semibold text-center transition-colors"
            >
              Employee
            </button>
            <button
              onClick={() => setDemoUser('security@drivehub.com')}
              className="px-2.5 py-1.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 rounded-lg font-semibold text-center transition-colors"
            >
              Security
            </button>
            <button
              onClick={() => setDemoUser('vendor@drivehub.com')}
              className="px-2.5 py-1.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 rounded-lg font-semibold text-center transition-colors"
            >
              Super Vendor
            </button>
            <button
              onClick={() => setDemoUser('subvendor@drivehub.com')}
              className="px-2.5 py-1.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 rounded-lg font-semibold text-center transition-colors"
            >
              Sub Vendor
            </button>
            <button
              onClick={() => setDemoUser('driver@drivehub.com')}
              className="px-2.5 py-1.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 rounded-lg font-semibold text-center transition-colors"
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
