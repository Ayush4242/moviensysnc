import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';
import { Plus, Check, X, LogIn, LogOut, Eye, ShieldCheck } from 'lucide-react';

const VisitorsPage = () => {
  const { user } = useAuth();
  const [visitors, setVisitors] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    purpose: '',
    host: '',
    visitDate: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '17:00',
    photo: '',
  });

  const fetchVisitors = async () => {
    try {
      const [vRes, uRes] = await Promise.all([
        API.get('/visitors'),
        API.get('/auth/users'),
      ]);
      setVisitors(vRes.data);
      setHosts(uRes.data.filter((u) => u.role === 'EMPLOYEE' || u.role === 'ADMIN'));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateVisitor = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/visitors', formData);
      setIsAddModalOpen(false);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        company: '',
        purpose: '',
        host: hosts[0]?._id || '',
        visitDate: new Date().toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '17:00',
        photo: '',
      });
      fetchVisitors();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create visitor');
    }
  };

  const handleApprove = async (id) => {
    try {
      await API.put(`/visitors/${id}/approve`);
      fetchVisitors();
    } catch (err) {
      alert(err.response?.data?.message || 'Approval failed');
    }
  };

  const handleReject = async (id) => {
    try {
      await API.put(`/visitors/${id}/reject`);
      fetchVisitors();
    } catch (err) {
      alert(err.response?.data?.message || 'Rejection failed');
    }
  };

  const handleCheckIn = async (id) => {
    try {
      await API.put(`/visitors/${id}/check-in`);
      fetchVisitors();
    } catch (err) {
      alert(err.response?.data?.message || 'Check-in failed');
    }
  };

  const handleCheckOut = async (id) => {
    try {
      await API.put(`/visitors/${id}/check-out`);
      fetchVisitors();
    } catch (err) {
      alert(err.response?.data?.message || 'Check-out failed');
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  const canApprove = user?.role === 'ADMIN' || user?.role === 'EMPLOYEE';
  const canCheckIn = user?.role === 'ADMIN' || user?.role === 'SECURITY';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Visitor Management</h1>
          <p className="text-slate-500 text-sm">Register, approve, and track workplace visitors.</p>
        </div>
        {(user?.role === 'ADMIN' || user?.role === 'EMPLOYEE') && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Visitor</span>
          </button>
        )}
      </div>

      {/* Visitors Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-xs uppercase">
              <tr>
                <th className="px-6 py-3.5">Visitor</th>
                <th className="px-6 py-3.5">Company</th>
                <th className="px-6 py-3.5">Host</th>
                <th className="px-6 py-3.5">Purpose</th>
                <th className="px-6 py-3.5">Date & Time</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-slate-400">
                    Loading visitors list...
                  </td>
                </tr>
              ) : visitors.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-slate-400">
                    No visitor records found. Click 'Add Visitor' to register one.
                  </td>
                </tr>
              ) : (
                visitors.map((visitor) => {
                  const isPreApproved =
                    visitor.status === 'APPROVED' && visitor.visitDate === todayStr;

                  return (
                    <tr key={visitor._id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {visitor.photo ? (
                            <img
                              src={visitor.photo}
                              alt={visitor.fullName}
                              className="w-8 h-8 rounded-full object-cover border"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                              {visitor.fullName.charAt(0)}
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-slate-900">{visitor.fullName}</div>
                            <div className="text-xs text-slate-400">{visitor.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">{visitor.company}</td>
                      <td className="px-6 py-4 text-slate-700">{visitor.host?.name || 'N/A'}</td>
                      <td className="px-6 py-4 text-slate-600">{visitor.purpose}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        <div>{visitor.visitDate}</div>
                        <div className="text-slate-400">{visitor.startTime} - {visitor.endTime}</div>
                      </td>
                      <td className="px-6 py-4 space-y-1">
                        <div>
                          <StatusBadge status={visitor.status} />
                        </div>
                        {isPreApproved && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <ShieldCheck className="w-3 h-3" /> Pre-approved
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {/* View details */}
                          <button
                            onClick={() => setSelectedVisitor(visitor)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Approval Actions */}
                          {canApprove && visitor.status === 'PENDING' && (
                            <>
                              <button
                                onClick={() => handleApprove(visitor._id)}
                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                                title="Approve Visitor"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleReject(visitor._id)}
                                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition-colors"
                                title="Reject Visitor"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}

                          {/* Security Actions */}
                          {canCheckIn && visitor.status === 'APPROVED' && (
                            <button
                              onClick={() => handleCheckIn(visitor._id)}
                              className="px-2.5 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-1 transition-colors"
                              title="Check In"
                            >
                              <LogIn className="w-3 h-3" /> Check In
                            </button>
                          )}

                          {canCheckIn && visitor.status === 'CHECKED_IN' && (
                            <button
                              onClick={() => handleCheckOut(visitor._id)}
                              className="px-2.5 py-1 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded flex items-center gap-1 transition-colors"
                              title="Check Out"
                            >
                              <LogOut className="w-3 h-3" /> Check Out
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Visitor Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register New Visitor">
        {error && <div className="mb-4 p-3 bg-rose-50 text-rose-700 text-sm rounded">{error}</div>}
        <form onSubmit={handleCreateVisitor} className="space-y-4 text-sm">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Company / Org</label>
              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Host Employee</label>
              <select
                name="host"
                required
                value={formData.host}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">Select Host</option>
                {hosts.map((h) => (
                  <option key={h._id} value={h._id}>
                    {h.name} ({h.email})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Purpose of Visit</label>
            <input
              type="text"
              name="purpose"
              required
              value={formData.purpose}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Visit Date</label>
              <input
                type="date"
                name="visitDate"
                required
                value={formData.visitDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Start Time</label>
              <input
                type="time"
                name="startTime"
                required
                value={formData.startTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">End Time</label>
              <input
                type="time"
                name="endTime"
                required
                value={formData.endTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Photo Reference (Optional Mock URL)</label>
            <input
              type="text"
              name="photo"
              placeholder="e.g. https://images.unsplash.com/photo-..."
              value={formData.photo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-xs"
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
              Register Visitor
            </button>
          </div>
        </form>
      </Modal>

      {/* Visitor Details Modal */}
      {selectedVisitor && (
        <Modal isOpen={!!selectedVisitor} onClose={() => setSelectedVisitor(null)} title="Visitor Details">
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-4 border-b pb-4">
              {selectedVisitor.photo ? (
                <img src={selectedVisitor.photo} alt={selectedVisitor.fullName} className="w-16 h-16 rounded-full object-cover border" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xl flex items-center justify-center">
                  {selectedVisitor.fullName.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedVisitor.fullName}</h3>
                <p className="text-slate-500">{selectedVisitor.company}</p>
                <div className="mt-1">
                  <StatusBadge status={selectedVisitor.status} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">Phone</span>
                <p className="font-medium text-slate-800">{selectedVisitor.phone}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">Email</span>
                <p className="font-medium text-slate-800">{selectedVisitor.email}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">Host Employee</span>
                <p className="font-medium text-slate-800">{selectedVisitor.host?.name || 'N/A'}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">Purpose</span>
                <p className="font-medium text-slate-800">{selectedVisitor.purpose}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">Scheduled Date</span>
                <p className="font-medium text-slate-800">{selectedVisitor.visitDate}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">Window</span>
                <p className="font-medium text-slate-800">{selectedVisitor.startTime} - {selectedVisitor.endTime}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">Check-in Time</span>
                <p className="font-medium text-slate-800">
                  {selectedVisitor.checkInTime ? new Date(selectedVisitor.checkInTime).toLocaleString() : 'Not checked in yet'}
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">Check-out Time</span>
                <p className="font-medium text-slate-800">
                  {selectedVisitor.checkOutTime ? new Date(selectedVisitor.checkOutTime).toLocaleString() : 'Not checked out yet'}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button
                onClick={() => setSelectedVisitor(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium"
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

export default VisitorsPage;
