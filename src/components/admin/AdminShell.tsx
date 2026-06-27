'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { getInitials, getStoredUser } from '@/lib/auth';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<ReturnType<typeof getStoredUser>>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar desktop */}
      <div className="hidden lg:flex lg:w-64 lg:fixed lg:inset-y-0 lg:z-30">
        <AdminSidebar />
      </div>

      {/* Sidebar mobile overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-64 z-50">
            <AdminSidebar onNavigate={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 sm:px-6 h-16 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Abrir menú"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-base font-semibold text-slate-900">Administración</h1>
              <p className="text-xs text-slate-500 hidden sm:block">Gestiona el catálogo de productos</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <div className="hidden sm:flex items-center gap-2.5 pr-3 border-r border-slate-200">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                  {getInitials(user.nombre)}
                </div>
                <div className="text-right leading-tight">
                  <p className="text-sm font-semibold text-slate-900">{user.nombre}</p>
                  <p className="text-[11px] text-slate-500">{user.email}</p>
                </div>
              </div>
            )}
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 bg-indigo-50 rounded-full border border-indigo-200">
              Admin
            </span>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
