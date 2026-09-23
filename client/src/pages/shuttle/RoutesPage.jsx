import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/Modal';
import { Plus, MapPin, Trash2, Clock } from 'lucide-react';

const RoutesPage = () => {
  const { user } = useAuth();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    pickupPoint: '',
    dropPoint: '',
    startTime: '08:30',
    endTime: '09:15',
  });

  const fetchRoutes = async () => {
    try {
      const { data } = await API.get('/routes');
      setRoutes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleCreateRoute = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/routes', formData);
      setIsAddModalOpen(false);
      setFormData({
        name: '',
        pickupPoint: '',
        dropPoint: '',
        startTime: '08:30',
        endTime: '09:15',
      });
      fetchRoutes();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create route');
    }
  };

  const handleDeleteRoute = async (id) => {
    if (!window.confirm('Delete this shuttle route?')) return;
    try {
      await API.delete(`/routes/${id}`);
      fetchRoutes();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete route');
    }
  };

  const canManage = user?.role === 'ADMIN' || user?.role === 'EMPLOYEE';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Shuttle Routes</h1>
          <p className="text-slate-500 text-sm">Configure fixed workplace shuttle pickup and drop routes.</p>
        </div>
        {canManage && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Route</span>
          </button>
        )}
      </div>

      {/* Routes Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p className="text-slate-400 text-sm col-span-3">Loading shuttle routes...</p>
        ) : routes.length === 0 ? (
          <p className="text-slate-400 text-sm col-span-3">No shuttle routes configured yet.</p>
        ) : (
          routes.map((route) => (
            <div key={route._id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  {route.name}
                </div>
                {user?.role === 'ADMIN' && (
                  <button
                    onClick={() => handleDeleteRoute(route._id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                    title="Delete Route"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 bg-slate-50 p-2 rounded border border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1" />
                  <div>
                    <span className="text-slate-400 font-semibold uppercase">Pickup</span>
                    <p className="font-medium text-slate-800">{route.pickupPoint}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-slate-50 p-2 rounded border border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1" />
                  <div>
                    <span className="text-slate-400 font-semibold uppercase">Drop</span>
                    <p className="font-medium text-slate-800">{route.dropPoint}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Schedule
                </span>
                <span className="text-slate-900 font-semibold">
                  {route.startTime} - {route.endTime}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Route Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create Shuttle Route">
        {error && <div className="mb-4 p-3 bg-rose-50 text-rose-700 text-sm rounded">{error}</div>}
        <form onSubmit={handleCreateRoute} className="space-y-4 text-sm">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Route Name</label>
            <input
              type="text"
              required
              placeholder="e.g. North Campus Shuttle"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Pickup Point</label>
            <input
              type="text"
              required
              placeholder="e.g. Metro Station Gate 2"
              value={formData.pickupPoint}
              onChange={(e) => setFormData({ ...formData, pickupPoint: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Drop Point</label>
            <input
              type="text"
              required
              placeholder="e.g. MovieSync HQ Main Building"
              value={formData.dropPoint}
              onChange={(e) => setFormData({ ...formData, dropPoint: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Start Time</label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">End Time</label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
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
              Create Route
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RoutesPage;
