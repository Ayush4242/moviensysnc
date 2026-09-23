import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';
import { Plus, Truck, Trash2 } from 'lucide-react';

const VehiclesPage = () => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    registrationNumber: '',
    model: '',
    seatingCapacity: 14,
    fuelType: 'DIESEL',
    vendor: '',
    driver: '',
    status: 'ACTIVE',
  });

  const fetchData = async () => {
    try {
      const [vhRes, vRes, dRes] = await Promise.all([
        API.get('/vehicles'),
        API.get('/vendors'),
        API.get('/drivers'),
      ]);
      setVehicles(vhRes.data);
      setVendors(vRes.data);
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

  const handleCreateVehicle = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/vehicles', {
        ...formData,
        driver: formData.driver || null,
      });
      setIsAddModalOpen(false);
      setFormData({
        registrationNumber: '',
        model: '',
        seatingCapacity: 14,
        fuelType: 'DIESEL',
        vendor: vendors[0]?._id || '',
        driver: '',
        status: 'ACTIVE',
      });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add vehicle');
    }
  };

  const handleDeleteVehicle = async (id) => {
    if (!window.confirm('Delete this vehicle?')) return;
    try {
      await API.delete(`/vehicles/${id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete vehicle');
    }
  };

  const canManage = user?.role === 'ADMIN' || user?.role === 'SUPER_VENDOR' || user?.role === 'SUB_VENDOR';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vehicle Management</h1>
          <p className="text-slate-500 text-sm">Track fleet vehicles, seating capacity, fuel type, and assigned drivers.</p>
        </div>
        {canManage && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vehicle</span>
          </button>
        )}
      </div>

      {/* Vehicles Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-xs uppercase">
              <tr>
                <th className="px-6 py-3.5">Registration</th>
                <th className="px-6 py-3.5">Model</th>
                <th className="px-6 py-3.5">Seats</th>
                <th className="px-6 py-3.5">Fuel</th>
                <th className="px-6 py-3.5">Vendor</th>
                <th className="px-6 py-3.5">Assigned Driver</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-slate-400">Loading vehicles...</td>
                </tr>
              ) : vehicles.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-slate-400">No vehicles added yet.</td>
                </tr>
              ) : (
                vehicles.map((vehicle) => (
                  <tr key={vehicle._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                          <Truck className="w-4 h-4" />
                        </div>
                        <span className="font-bold font-mono text-slate-900">{vehicle.registrationNumber}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">{vehicle.model}</td>
                    <td className="px-6 py-4 text-slate-700">{vehicle.seatingCapacity} Seater</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-xs text-slate-700">
                        {vehicle.fuelType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{vehicle.vendor?.name || 'Unassigned'}</td>
                    <td className="px-6 py-4 text-slate-700">
                      {vehicle.driver ? (
                        <div>
                          <div className="font-semibold text-slate-900">{vehicle.driver.name}</div>
                          <div className="text-xs text-slate-400">{vehicle.driver.phone}</div>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs italic">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={vehicle.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      {canManage && (
                        <button
                          onClick={() => handleDeleteVehicle(vehicle._id)}
                          className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors"
                          title="Delete Vehicle"
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

      {/* Add Vehicle Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Vehicle">
        {error && <div className="mb-4 p-3 bg-rose-50 text-rose-700 text-sm rounded">{error}</div>}
        <form onSubmit={handleCreateVehicle} className="space-y-4 text-sm">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Registration Number</label>
            <input
              type="text"
              required
              placeholder="e.g. PB-10-AB-1234"
              value={formData.registrationNumber}
              onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value.toUpperCase() })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono uppercase"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Vehicle Model</label>
              <input
                type="text"
                required
                placeholder="e.g. Force Traveller"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Seating Capacity</label>
              <input
                type="number"
                required
                min="1"
                value={formData.seatingCapacity}
                onChange={(e) => setFormData({ ...formData, seatingCapacity: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Fuel Type</label>
              <select
                value={formData.fuelType}
                onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="DIESEL">Diesel</option>
                <option value="PETROL">Petrol</option>
                <option value="CNG">CNG</option>
                <option value="ELECTRIC">Electric</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Assign Vendor</label>
              <select
                required
                value={formData.vendor}
                onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">Select Vendor</option>
                {vendors.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.name} ({v.type})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Assign Driver (Optional)</label>
            <select
              value={formData.driver}
              onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">None</option>
              {drivers.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name} ({d.phone})
                </option>
              ))}
            </select>
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
              Add Vehicle
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default VehiclesPage;
