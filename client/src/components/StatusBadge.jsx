import React from 'react';

const StatusBadge = ({ status }) => {
  const getBadgeStyle = (s) => {
    switch (s) {
      case 'APPROVED':
      case 'CONFIRMED':
      case 'ACTIVE':
      case 'Valid':
        return 'bg-zinc-900 text-white border-zinc-900';
      case 'PENDING':
        return 'bg-zinc-100 text-zinc-700 border-zinc-300';
      case 'REJECTED':
      case 'CANCELLED':
      case 'INACTIVE':
      case 'Expired':
        return 'bg-zinc-200 text-zinc-900 border-zinc-400 font-bold';
      case 'CHECKED_IN':
        return 'bg-zinc-800 text-zinc-100 border-zinc-700';
      case 'CHECKED_OUT':
        return 'bg-zinc-100 text-zinc-600 border-zinc-200';
      case 'COMPLETED':
        return 'bg-black text-white border-black';
      case 'MAINTENANCE':
        return 'bg-zinc-100 text-zinc-800 border-zinc-300';
      default:
        return 'bg-zinc-100 text-zinc-800 border-zinc-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${getBadgeStyle(status)}`}>
      {status ? status.replace('_', ' ') : 'N/A'}
    </span>
  );
};

export default StatusBadge;
