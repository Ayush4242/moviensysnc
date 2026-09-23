import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';
import { Plus, Move, Shield, Building2, Trash2 } from 'lucide-react';

const VendorsPage = () => {
  const { user } = useAuth();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [moveModalVendor, setMoveModalVendor] = useState(null);
  const [newParentId, setNewParentId] = useState('');
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'SUPER',
    parentVendor: '',
  });

  const fetchVendors = async () => {
    try {
      const { data } = await API.get('/vendors');
      setVendors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleCreateVendor = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/vendors', {
        ...formData,
        parentVendor: formData.parentVendor || null,
      });
      setIsAddModalOpen(false);
      setFormData({ name: '', email: '', phone: '', type: 'SUPER', parentVendor: '' });
      fetchVendors();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create vendor');
    }
  };

  const handleMoveVendor = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/vendors/${moveModalVendor._id}/move`, { newParentId: newParentId || null });
      setMoveModalVendor(null);
      setNewParentId('');
      fetchVendors();
    } catch (err) {
      alert(err.response?.data?.message || 'Move vendor failed');
    }
  };

  const handleToggleDelegation = async (vendorId, currentVal) => {
    try {
      await API.put(`/vendors/${vendorId}/delegation`, { canManageFleet: !currentVal });
      fetchVendors();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to toggle delegation');
    }
  };

  const handleDeleteVendor = async (vendorId) => {
    if (!window.confirm('Are you sure you want to delete this vendor?')) return;
    try {
      await API.delete(`/vendors/${vendorId}`);
      fetchVendors();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete vendor');
    }
  };

  // Hierarchy Tree builder
  const buildHierarchy = () => {
    const rootVendors = vendors.filter((v) => !v.parentVendor);

    const renderChildren = (parentId) => {
      const children = vendors.filter((v) => v.parentVendor && (v.parentVendor._id === parentId || v.parentVendor === parentId));
      if (children.length === 0) return null;

      return (
        <ul className="pl-6 border-l-2 border-slate-200 mt-2 space-y-2">
          {children.map((child) => (
            <li key={child._id} className="relative">
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 w-fit">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span className="font-semibold text-slate-800 text-sm">{child.name}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">{child.type}</span>
              </div>
              {renderChildren(child._id)}
            </li>
          ))}
        </ul>
      );
    };

    return (
      <div className="space-y-4">
        {rootVendors.length === 0 ? (
          <p className="text-sm text-slate-400">No top-level vendors available.</p>
        ) : (
          rootVendors.map((root) => (
            <div key={root._id} className="space-y-2">
              <div className="flex items-center gap-2 bg-indigo-50 p-3 rounded-lg border border-indigo-200 w-fit">
                <Building2 className="w-5 h-5 text-indigo-700" />
                <span className="font-bold text-slate-900 text-base">{root.name}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-200 text-indigo-800 font-semibold">{root.type}</span>
              </div>
              {renderChildren(root._id)}
            </div>
          ))
        )}
      </div>
    );
  };

  const isSuperVendorOrAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_VENDOR';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vendor Management</h1>
          <p className="text-slate-500 text-sm">Manage vendor hierarchy, fleet delegation, and assignments.</p>
        </div>
        {isSuperVendorOrAdmin && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vendor</span>
          </button>
        )}
      </div>

      {/* Visual Hierarchy */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-indigo-600" />
          Vendor Organization Hierarchy
        </h2>
        {loading ? <p className="text-slate-400 text-sm">Loading hierarchy...</p> : buildHierarchy()}
      </div>

      {/* Vendors Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h2 className="font-semibold text-slate-800">All Registered Vendors</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-xs uppercase">
              <tr>
                <th className="px-6 py-3.5">Vendor Name</th>
                <th className="px-6 py-3.5">Type</th>
                <th className="px-6 py-3.5">Parent Vendor</th>
                <th className="px-6 py-3.5">Fleet Delegation</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-400">Loading vendors...</td>
                </tr>
              ) : vendors.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-400">No vendors registered yet.</td>
                </tr>
              ) : (
                vendors.map((vendor) => (
                  <tr key={vendor._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{vendor.name}</div>
                      <div className="text-xs text-slate-400">{vendor.email} • {vendor.phone}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">{vendor.type}</td>
                    <td className="px-6 py-4 text-slate-700">
                      {vendor.parentVendor ? vendor.parentVendor.name : <span className="text-slate-400 text-xs italic">Top Level</span>}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        disabled={!isSuperVendorOrAdmin}
                        onClick={() => handleToggleDelegation(vendor._id, vendor.canManageFleet)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold border transition-colors ${
                          vendor.canManageFleet
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                      >
                        <Shield className="w-3.5 h-3.5" />
                        {vendor.canManageFleet ? 'Can Manage Fleet' : 'Restricted'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={vendor.status} />
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {isSuperVendorOrAdmin && (
                        <>
                          <button
                            onClick={() => {
                              setMoveModalVendor(vendor);
                              setNewParentId(vendor.parentVendor?._id || '');
                            }}
                            className="px-2.5 py-1 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded border border-indigo-200 inline-flex items-center gap-1"
                          >
                            <Move className="w-3 h-3" /> Move
                          </button>
                          <button
                            onClick={() => handleDeleteVendor(vendor._id)}
                            className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Vendor Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Vendor">
        {error && <div className="mb-4 p-3 bg-rose-50 text-rose-700 text-sm rounded">{error}</div>}
        <form onSubmit={handleCreateVendor} className="space-y-4 text-sm">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Vendor Name</label>
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
              <label className="block font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Phone</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Vendor Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="SUPER">Super Vendor</option>
                <option value="REGIONAL">Regional Vendor</option>
                <option value="CITY">City Vendor</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Parent Vendor (Optional)</label>
              <select
                value={formData.parentVendor}
                onChange={(e) => setFormData({ ...formData, parentVendor: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">None (Top Level)</option>
                {vendors.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.name} ({v.type})
                  </option>
                ))}
              </select>
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
              Create Vendor
            </button>
          </div>
        </form>
      </Modal>

      {/* Move Vendor Modal */}
      {moveModalVendor && (
        <Modal isOpen={!!moveModalVendor} onClose={() => setMoveModalVendor(null)} title="Move Vendor Hierarchy">
          <form onSubmit={handleMoveVendor} className="space-y-4 text-sm">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Target Vendor</label>
              <input
                type="text"
                disabled
                value={moveModalVendor.name}
                className="w-full px-3 py-2 border bg-slate-100 rounded-lg text-slate-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">New Parent Vendor</label>
              <select
                value={newParentId}
                onChange={(e) => setNewParentId(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">None (Make Top Level)</option>
                {vendors
                  .filter((v) => v._id !== moveModalVendor._id)
                  .map((v) => (
                    <option key={v._id} value={v._id}>
                      {v.name} ({v.type})
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setMoveModalVendor(null)}
                className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium"
              >
                Move Vendor
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default VendorsPage;
