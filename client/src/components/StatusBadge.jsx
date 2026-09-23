import React from 'react';

const StatusBadge = ({ status }) => {
  const getBadgeStyle = (s) => {
    switch (s) {
      case 'APPROVED':
      case 'CONFIRMED':
      case 'ACTIVE':
      case 'Valid':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'PENDING':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'REJECTED':
      case 'CANCELLED':
      case 'INACTIVE':
      case 'Expired':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'CHECKED_IN':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CHECKED_OUT':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'COMPLETED':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'MAINTENANCE':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle(status)}`}>
      {status ? status.replace('_', ' ') : 'N/A'}
    </span>
  );
};

export default StatusBadge;
