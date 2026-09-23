import React from 'react';

const StatusBadge = ({ status }) => {
  const getBadgeStyle = (s) => {
    switch (s) {
      case 'APPROVED':
      case 'CONFIRMED':
      case 'ACTIVE':
      case 'Valid':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold';
      case 'PENDING':
        return 'bg-amber-50 text-amber-800 border-amber-200 font-semibold';
      case 'REJECTED':
      case 'CANCELLED':
      case 'INACTIVE':
      case 'Expired':
        return 'bg-rose-50 text-rose-800 border-rose-200 font-semibold';
      case 'CHECKED_IN':
        return 'bg-blue-50 text-blue-800 border-blue-200 font-semibold';
      case 'CHECKED_OUT':
        return 'bg-purple-50 text-purple-800 border-purple-200 font-semibold';
      case 'COMPLETED':
        return 'bg-teal-50 text-teal-800 border-teal-200 font-semibold';
      case 'MAINTENANCE':
        return 'bg-orange-50 text-orange-800 border-orange-200 font-semibold';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200 font-semibold';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border ${getBadgeStyle(status)}`}>
      {status ? status.replace('_', ' ') : 'N/A'}
    </span>
  );
};

export default StatusBadge;
