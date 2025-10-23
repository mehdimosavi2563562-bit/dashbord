import React from 'react';
import { BellIcon, UserCircleIcon, SearchIcon } from './icons';

const TopBar: React.FC = () => {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6 lg:px-8 flex-shrink-0">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-slate-900">داشبورد</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-slate-500 hover:text-slate-700">
          <SearchIcon className="w-5 h-5" />
        </button>
        <button className="text-slate-500 hover:text-slate-700 relative">
          <BellIcon />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </button>
        <div className="flex items-center gap-2">
           <UserCircleIcon />
           <span className="hidden sm:inline text-sm font-medium text-slate-700">کاربر تست</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
