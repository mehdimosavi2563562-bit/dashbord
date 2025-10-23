import React from 'react';
import { LayoutDashboardIcon } from './icons';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white shadow-md hidden lg:flex flex-col">
      <div className="h-16 flex items-center justify-center border-b">
        <h2 className="text-2xl font-bold text-slate-800">پنل مدیریت</h2>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul>
          <li>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-slate-700 bg-slate-100 rounded-lg font-semibold">
              <LayoutDashboardIcon />
              <span>داشبورد</span>
            </a>
          </li>
          {/* Add more navigation links here */}
        </ul>
      </nav>
      <div className="px-4 py-4 border-t">
        <p className="text-xs text-slate-400 text-center">نسخه ۱.۰.۰</p>
      </div>
    </aside>
  );
};

export default Sidebar;
