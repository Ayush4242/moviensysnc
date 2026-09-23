import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Car, LogIn, Key, Mail } from 'lucide-react';

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
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-lg border border-zinc-200 p-8 space-y-6 shadow-xs">
        <div className="text-center space-y-1">
          <div className="inline-flex p-3 bg-black text-white rounded-lg mb-2">
            <Car className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">DriveHub</h1>
          <p className="text-xs text-zinc-500">Sign in to access your portal</p>
        </div>

        {error && (
          <div className="p-3 rounded bg-zinc-100 border border-zinc-300 text-zinc-900 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@drivehub.com"
                className="w-full pl-9 pr-3 py-2 border border-zinc-300 rounded text-xs focus:outline-none focus:border-black text-zinc-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 border border-zinc-300 rounded text-xs focus:outline-none focus:border-black text-zinc-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-zinc-800 text-white font-semibold py-2.5 px-4 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-xs"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Demo Logins */}
        <div className="border-t border-zinc-200 pt-4 space-y-2">
          <p className="text-[11px] text-center font-medium text-zinc-400 uppercase tracking-wider">
            Demo Accounts:
          </p>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            <button
              onClick={() => setDemoUser('admin@drivehub.com')}
              className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded font-medium text-center border border-zinc-200"
            >
              Admin
            </button>
            <button
              onClick={() => setDemoUser('employee@drivehub.com')}
              className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded font-medium text-center border border-zinc-200"
            >
              Employee
            </button>
            <button
              onClick={() => setDemoUser('security@drivehub.com')}
              className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded font-medium text-center border border-zinc-200"
            >
              Security
            </button>
            <button
              onClick={() => setDemoUser('vendor@drivehub.com')}
              className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded font-medium text-center border border-zinc-200"
            >
              Super Vendor
            </button>
            <button
              onClick={() => setDemoUser('subvendor@drivehub.com')}
              className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded font-medium text-center border border-zinc-200"
            >
              Sub Vendor
            </button>
            <button
              onClick={() => setDemoUser('driver@drivehub.com')}
              className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded font-medium text-center border border-zinc-200"
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
