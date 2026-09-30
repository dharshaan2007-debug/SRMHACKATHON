import React from 'react';
import { Sidebar } from './Sidebar';
import { X } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-72 max-w-[85vw] bg-[#071522] h-full flex flex-col z-10 shadow-2xl border-r border-slate-800">
        <div className="p-4 flex items-center justify-between border-b border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Navigation Menu
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Sidebar onCloseMobile={onClose} />
        </div>
      </div>
    </div>
  );
};
