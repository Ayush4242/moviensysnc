import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import StatCard from '../../components/StatCard';
import StatusBadge from '../../components/StatusBadge';
import { Users, Clock, UserCheck, Truck, Calendar } from 'lucide-react';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    pendingVisitors: 0,
    activeDrivers: 0,
    activeVehicles: 0,
    todayBookings: 0,
  });
  const [recentVisitors, setRecentVisitors] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [visitorsRes, driversRes, vehiclesRes, bookingsRes] = await Promise.all([
          API.get('/visitors'),
          API.get('/drivers'),
          API.get('/vehicles'),
          API.get('/bookings'),
        ]);

        const visitors = visitorsRes.data || [];
        const drivers = driversRes.data || [];
        const vehicles = vehiclesRes.data || [];
        const bookings = bookingsRes.data || [];

        setStats({
          totalVisitors: visitors.length,
          pendingVisitors: visitors.filter((v) => v.status === 'PENDING').length,
          activeDrivers: drivers.filter((d) => d.status === 'ACTIVE').length,
          activeVehicles: vehicles.filter((vh) => vh.status === 'ACTIVE').length,
          todayBookings: bookings.length,
        });

        setRecentVisitors(visitors.slice(0, 5));
        setRecentBookings(bookings.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        Loading dashboard metrics...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm">Welcome back to MovieSync Transport & Visitor Hub.</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard title="Total Visitors" value={stats.totalVisitors} icon={Users} color="blue" />
        <StatCard title="Pending Approvals" value={stats.pendingVisitors} icon={Clock} color="amber" />
        <StatCard title="Active Drivers" value={stats.activeDrivers} icon={UserCheck} color="emerald" />
        <StatCard title="Active Vehicles" value={stats.activeVehicles} icon={Truck} color="purple" />
        <StatCard title="Today's Bookings" value={stats.todayBookings} icon={Calendar} color="indigo" />
      </div>

      {/* Grid Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Visitors */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Recent Visitors</h2>
            <span className="text-xs font-medium text-slate-500">Latest 5</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-medium text-xs uppercase">
                <tr>
                  <th className="px-6 py-3">Visitor</th>
                  <th className="px-6 py-3">Host</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentVisitors.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-slate-400">No visitors recorded yet</td>
                  </tr>
                ) : (
                  recentVisitors.map((v) => (
                    <tr key={v._id} className="hover:bg-slate-50">
                      <td className="px-6 py-3.5">
                        <div className="font-medium text-slate-900">{v.fullName}</div>
                        <div className="text-xs text-slate-400">{v.company}</div>
                      </td>
                      <td className="px-6 py-3.5 text-slate-700">{v.host?.name || 'N/A'}</td>
                      <td className="px-6 py-3.5">
                        <StatusBadge status={v.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Shuttle Bookings */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Recent Shuttle Bookings</h2>
            <span className="text-xs font-medium text-slate-500">Latest 5</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-medium text-xs uppercase">
                <tr>
                  <th className="px-6 py-3">Employee</th>
                  <th className="px-6 py-3">Route</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentBookings.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-slate-400">No shuttle bookings yet</td>
                  </tr>
                ) : (
                  recentBookings.map((b) => (
                    <tr key={b._id} className="hover:bg-slate-50">
                      <td className="px-6 py-3.5">
                        <div className="font-medium text-slate-900">{b.employee?.name || 'N/A'}</div>
                        <div className="text-xs text-slate-400">{b.date} at {b.time}</div>
                      </td>
                      <td className="px-6 py-3.5 text-slate-700">{b.route?.name || 'N/A'}</td>
                      <td className="px-6 py-3.5">
                        <StatusBadge status={b.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
