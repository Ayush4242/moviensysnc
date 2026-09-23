import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';
import { Plus, UserCheck, Trash2, FileText, AlertCircle } from 'lucide-react';

const DriversPage = () => {
  const { user } = useAuth();
  const [drivers, setDrivers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDriverDocs, setSelectedDriverDocs] = useState(null);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    licenseNumber: '',
    vendor: '',
    vehicle: '',
    licenseExpiry: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
  });

  const fetchData = async () => {
    try {
      const [dRes, vRes, vhRes] = await Promise.all([
        API.get('/drivers'),
        API.get('/vendors'),
        API.get('/vehicles'),
      ]);
      setDrivers(dRes.data);
      setVendors(vRes.data);
      setVehicles(vhRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateDriver = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/drivers', {
        ...formData,
        vehicle: formData.vehicle || null,
      });
      setIsAddModalOpen(false);
      setFormData({
        name: '',
        phone: '',
        licenseNumber: '',
        vendor: vendors[0]?._id || '',
        vehicle: '',
        licenseExpiry: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
      });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add driver');
    }
  };

  const handleDeleteDriver = async (id) => {
    if (!window.confirm('Delete this driver?')) return;
    try {
      await API.delete(`/drivers/${id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete driver');
    }
  };

  const canManage = user?.role === 'ADMIN' || user?.role === 'SUPER_VENDOR' || user?.role === 'SUB_VENDOR';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Driver Management</h1>
          <p className="text-slate-500 text-sm">Manage registered drivers, assigned vehicles, and document validity.</p>
        </div>
        {canManage && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Driver</span>
          </button>
        )}
      </div>

      {/* Driver List Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-xs uppercase">
              <tr>
                <th className="px-6 py-3.5">Driver</th>
                <th className="px-6 py-3.5">License No.</th>
                <th className="px-6 py-3.5">Vendor</th>
                <th className="px-6 py-3.5">Assigned Vehicle</th>
                <th className="px-6 py-3.5">License Expiry</th>
                <th className="px-6 py-3.5">Doc Status</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-slate-400">Loading drivers...</td>
                </tr>
              ) : drivers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-slate-400">No drivers added yet.</td>
                </tr>
              ) : (
                drivers.map((driver) => {
                  const isLicenseExpired = new Date(driver.licenseExpiry) < new Date();
                  const hasAnyExpiredDoc = driver.documents?.some((doc) => new Date(doc.expiryDate) < new Date());

                  return (
                    <tr key={driver._id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <UserCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{driver.name}</div>
                            <div className="text-xs text-slate-400">{driver.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-700">{driver.licenseNumber}</td>
                      <td className="px-6 py-4 text-slate-700">{driver.vendor?.name || 'Unassigned'}</td>
                      <td className="px-6 py-4 text-slate-700">
                        {driver.vehicle ? (
                          <span className="font-medium text-slate-900">{driver.vehicle.registrationNumber}</span>
                        ) : (
                          <span className="text-slate-400 text-xs italic">None</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <span className={isLicenseExpired ? 'text-rose-600 font-semibold' : 'text-slate-600'}>
                          {new Date(driver.licenseExpiry).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedDriverDocs(driver)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold border ${
                            hasAnyExpiredDoc
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          <FileText className="w-3 h-3" />
                          {hasAnyExpiredDoc ? 'Has Expired Docs' : 'All Docs Valid'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={driver.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        {canManage && (
                          <button
                            onClick={() => handleDeleteDriver(driver._id)}
                            className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors"
                            title="Delete Driver"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Driver Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register New Driver">
        {error && <div className="mb-4 p-3 bg-rose-50 text-rose-700 text-sm rounded">{error}</div>}
        <form onSubmit={handleCreateDriver} className="space-y-4 text-sm">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Driver Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">License Number</label>
              <input
                type="text"
                required
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
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
            <div>
              <label className="block font-medium text-slate-700 mb-1">Assign Vehicle (Optional)</label>
              <select
                value={formData.vehicle}
                onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">None</option>
                {vehicles.map((vh) => (
                  <option key={vh._id} value={vh._id}>
                    {vh.registrationNumber} ({vh.model})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Driving License Expiry Date</label>
            <input
              type="date"
              required
              value={formData.licenseExpiry}
              onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
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
              Add Driver
            </button>
          </div>
        </form>
      </Modal>

      {/* Driver Documents Modal */}
      {selectedDriverDocs && (
        <Modal isOpen={!!selectedDriverDocs} onClose={() => setSelectedDriverDocs(null)} title={`Documents - ${selectedDriverDocs.name}`}>
          <div className="space-y-4 text-sm">
            <p className="text-xs text-slate-500">Compliance & Regulatory Documents status for this driver:</p>
            <div className="space-y-2">
              {selectedDriverDocs.documents?.map((doc, idx) => {
                const isExpired = new Date(doc.expiryDate) < new Date();
                return (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg border bg-slate-50">
                    <div>
                      <div className="font-semibold text-slate-800">{doc.docType}</div>
                      <div className="text-xs text-slate-500 font-mono">No: {doc.documentNumber}</div>
                      <div className="text-[11px] text-slate-400">
                        Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      {isExpired ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                          <AlertCircle className="w-3 h-3" /> Expired
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Valid
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end pt-3">
              <button
                onClick={() => setSelectedDriverDocs(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DriversPage;
