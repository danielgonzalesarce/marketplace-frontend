'use client';

import { useState } from 'react';
import AdminSidebar from './AdminSidebar';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 bg-indigo-50 rounded-full border border-indigo-200">
            Admin
          </span>
        </header>

        <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
