'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { clearAuth, getInitials, getStoredUser } from '@/lib/auth';
import { useMounted } from '@/hooks/useMounted';

export default function Navbar() {
  const mounted = useMounted();
  const [user, setUser] = useState<ReturnType<typeof getStoredUser>>(null);

  useEffect(() => {
    if (mounted) {
      setUser(getStoredUser());
    }
  }, [mounted]);

  const handleLogout = () => {
    clearAuth();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200 group-hover:bg-indigo-700 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Product<span className="text-indigo-600">Store</span>
            </span>
          </Link>

          <div className="flex gap-2 sm:gap-3 items-center min-h-[36px]">
            <Link
              href="/"
              className="hidden sm:inline-flex px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              Productos
            </Link>

            {!mounted && (
              <div className="h-9 w-28 rounded-xl bg-slate-100 animate-pulse" aria-hidden />
            )}

            {mounted && !user && (
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all hover:shadow-md"
                >
                  Registrarse
                </Link>
              </>
            )}

            {mounted && user && user.role !== 'ADMIN' && (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2.5 pl-1 pr-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0">
                    {getInitials(user.nombre)}
                  </div>
                  <div className="hidden sm:block text-left leading-tight">
                    <p className="text-sm font-semibold text-slate-900 max-w-[120px] truncate">
                      {user.nombre}
                    </p>
                    <p className="text-[11px] text-slate-500 max-w-[120px] truncate">
                      {user.email}
                    </p>
                  </div>
                  <span className="hidden md:inline-flex px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
                    {user.role}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Cerrar sesión"
                >
                  <span className="hidden sm:inline">Salir</span>
                  <svg className="w-5 h-5 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
