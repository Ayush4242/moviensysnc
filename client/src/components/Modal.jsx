import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-lg border border-zinc-200 shadow-lg w-full max-w-lg overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-200 bg-zinc-50">
          <h3 className="text-base font-bold text-zinc-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto text-zinc-800">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
