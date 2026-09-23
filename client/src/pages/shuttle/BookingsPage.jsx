import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';
import { Plus, Calendar, Ban, Trash2 } from 'lucide-react';

const BookingsPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    route: '',
    driver: '',
    date: new Date().toISOString().split('T')[0],
    time: '08:30',
  });

  const fetchData = async () => {
    try {
      const [bRes, rRes, dRes] = await Promise.all([
        API.get('/bookings'),
        API.get('/routes'),
        API.get('/drivers'),
      ]);
      setBookings(bRes.data);
      setRoutes(rRes.data);
      setDrivers(dRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/bookings', {
        ...formData,
        driver: formData.driver || null,
      });
      setIsAddModalOpen(false);
      setFormData({
        route: routes[0]?._id || '',
        driver: '',
        date: new Date().toISOString().split('T')[0],
        time: '08:30',
      });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking');
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      await API.put(`/bookings/${id}/cancel`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Delete booking record?')) return;
    try {
      await API.delete(`/bookings/${id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete booking');
    }
  };

  const canBook = user?.role === 'ADMIN' || user?.role === 'EMPLOYEE';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Shuttle Bookings</h1>
          <p className="text-slate-500 text-sm">Reserve shuttle seats and view employee booking schedules.</p>
        </div>
        {canBook && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Booking</span>
          </button>
        )}
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-xs uppercase">
              <tr>
                <th className="px-6 py-3.5">Booking ID</th>
                <th className="px-6 py-3.5">Employee</th>
                <th className="px-6 py-3.5">Route</th>
                <th className="px-6 py-3.5">Driver</th>
                <th className="px-6 py-3.5">Date & Time</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-slate-400">Loading bookings...</td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-slate-400">No shuttle bookings registered yet.</td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">#{booking._id.slice(-6)}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{booking.employee?.name || 'N/A'}</div>
                      <div className="text-xs text-slate-400">{booking.employee?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{booking.route?.name || 'N/A'}</div>
                      <div className="text-xs text-slate-400">
                        {booking.route?.pickupPoint} → {booking.route?.dropPoint}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {booking.driver ? (
                        <div>
                          <div className="font-medium text-slate-900">{booking.driver.name}</div>
                          <div className="text-xs text-slate-400">{booking.driver.phone}</div>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs italic">Auto Assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <div className="font-semibold text-slate-800">{booking.date}</div>
                      <div className="text-slate-400">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {canBook && booking.status !== 'CANCELLED' && (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="px-2.5 py-1 text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 rounded border border-rose-200 inline-flex items-center gap-1"
                        >
                          <Ban className="w-3 h-3" /> Cancel
                        </button>
                      )}
                      {user?.role === 'ADMIN' && (
                        <button
                          onClick={() => handleDeleteBooking(booking._id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Booking Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create Shuttle Booking">
        {error && <div className="mb-4 p-3 bg-rose-50 text-rose-700 text-sm rounded">{error}</div>}
        <form onSubmit={handleCreateBooking} className="space-y-4 text-sm">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Select Route</label>
            <select
              required
              value={formData.route}
              onChange={(e) => setFormData({ ...formData, route: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Select Shuttle Route</option>
              {routes.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name} ({r.pickupPoint} to {r.dropPoint})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Assign Driver (Optional)</label>
            <select
              value={formData.driver}
              onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Auto Assign Default Driver</option>
              {drivers.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name} ({d.phone})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Booking Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Pickup Time</label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BookingsPage;
