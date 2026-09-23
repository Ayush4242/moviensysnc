import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/Modal';
import { Plus, Clock, Trash2, Calendar } from 'lucide-react';

const DriverSchedulePage = () => {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter Date
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    driver: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '17:00',
    breakStart: '13:00',
    breakEnd: '14:00',
  });

  const fetchData = async () => {
    try {
      const [sRes, dRes] = await Promise.all([
        API.get('/schedules'),
        API.get('/drivers'),
      ]);
      setSchedules(sRes.data);
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

  const handleCreateSchedule = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/schedules', formData);
      setIsAddModalOpen(false);
      setFormData({
        driver: drivers[0]?._id || '',
        date: selectedDate,
        startTime: '09:00',
        endTime: '17:00',
        breakStart: '13:00',
        breakEnd: '14:00',
      });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add driver schedule');
    }
  };

  const handleDeleteSchedule = async (id) => {
    if (!window.confirm('Delete this schedule?')) return;
    try {
      await API.delete(`/schedules/${id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete schedule');
    }
  };

  // Hours array for matrix column headers (8 AM to 6 PM)
  const hours = [
    { label: '8 AM', val: 8 },
    { label: '9 AM', val: 9 },
    { label: '10 AM', val: 10 },
    { label: '11 AM', val: 11 },
    { label: '12 PM', val: 12 },
    { label: '1 PM', val: 13 },
    { label: '2 PM', val: 14 },
    { label: '3 PM', val: 15 },
    { label: '4 PM', val: 16 },
    { label: '5 PM', val: 17 },
  ];

  // Helper to determine status at an hour for a given schedule
  const getSlotStatus = (schedule, hourVal) => {
    const parseHour = (timeStr) => parseInt(timeStr.split(':')[0], 10);
    const startH = parseHour(schedule.startTime);
    const endH = parseHour(schedule.endTime);
    const breakStartH = parseHour(schedule.breakStart);
    const breakEndH = parseHour(schedule.breakEnd);

    if (hourVal >= breakStartH && hourVal < breakEndH) {
      return 'BREAK';
    }
    if (hourVal >= startH && hourVal < endH) {
      return 'DUTY';
    }
    return 'OFF';
  };

  const filteredSchedules = schedules.filter((s) => s.date === selectedDate);
  const canManage = user?.role === 'ADMIN' || user?.role === 'SUPER_VENDOR' || user?.role === 'SUB_VENDOR';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Driver Schedule Timeline</h1>
          <p className="text-slate-500 text-sm">Visual duty shifts, breaks, and hourly driver availability matrix.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-sm">
            <Calendar className="w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="outline-none text-slate-700 font-medium bg-transparent"
            />
          </div>
          {canManage && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Schedule</span>
            </button>
          )}
        </div>
      </div>

      {/* Timeline Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Shift Matrix for {selectedDate}</h2>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              <span className="w-3 h-3 rounded bg-indigo-500 inline-block" /> On Duty
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              <span className="w-3 h-3 rounded bg-amber-400 inline-block" /> Break
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              <span className="w-3 h-3 rounded bg-slate-200 inline-block" /> Off Duty
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-xs border-b">
              <tr>
                <th className="px-6 py-3.5 min-w-[180px]">Driver</th>
                {hours.map((h) => (
                  <th key={h.val} className="px-2 py-3.5 text-center min-w-[70px]">
                    {h.label}
                  </th>
                ))}
                <th className="px-4 py-3.5 text-right min-w-[80px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={hours.length + 2} className="px-6 py-8 text-center text-slate-400">
                    Loading schedules...
                  </td>
                </tr>
              ) : filteredSchedules.length === 0 ? (
                <tr>
                  <td colSpan={hours.length + 2} className="px-6 py-8 text-center text-slate-400">
                    No schedules found for date {selectedDate}. Click 'Add Schedule' to create one.
                  </td>
                </tr>
              ) : (
                filteredSchedules.map((schedule) => (
                  <tr key={schedule._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{schedule.driver?.name || 'N/A'}</div>
                      <div className="text-xs text-slate-400 font-mono">
                        {schedule.startTime} - {schedule.endTime}
                      </div>
                    </td>
                    {hours.map((h) => {
                      const status = getSlotStatus(schedule, h.val);
                      return (
                        <td key={h.val} className="px-1 py-4 text-center">
                          {status === 'DUTY' && (
                            <span className="inline-block w-full py-1 rounded bg-indigo-100 text-indigo-800 text-[11px] font-bold">
                              Duty
                            </span>
                          )}
                          {status === 'BREAK' && (
                            <span className="inline-block w-full py-1 rounded bg-amber-100 text-amber-800 text-[11px] font-bold">
                              Break
                            </span>
                          )}
                          {status === 'OFF' && (
                            <span className="inline-block w-full py-1 rounded bg-slate-100 text-slate-400 text-[11px]">
                              -
                            </span>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-4 py-4 text-right">
                      {canManage && (
                        <button
                          onClick={() => handleDeleteSchedule(schedule._id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                          title="Delete Schedule"
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

      {/* Add Schedule Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Driver Schedule">
        {error && <div className="mb-4 p-3 bg-rose-50 text-rose-700 text-sm rounded">{error}</div>}
        <form onSubmit={handleCreateSchedule} className="space-y-4 text-sm">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Select Driver</label>
            <select
              required
              value={formData.driver}
              onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Select Driver</option>
              {drivers.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name} ({d.phone})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Schedule Date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Duty Start Time</label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Duty End Time</label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Break Start Time</label>
              <input
                type="time"
                required
                value={formData.breakStart}
                onChange={(e) => setFormData({ ...formData, breakStart: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Break End Time</label>
              <input
                type="time"
                required
                value={formData.breakEnd}
                onChange={(e) => setFormData({ ...formData, breakEnd: e.target.value })}
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
              Add Schedule
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DriverSchedulePage;
