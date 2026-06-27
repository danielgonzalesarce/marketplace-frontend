'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { clearAuth, getRole } from '@/lib/auth';

export default function Navbar() {
  const [role, setRole] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRole(getRole());
    setMounted(true);
  }, []);

  const handleLogout = () => {
    clearAuth();
    setRole(null);
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

          <div className="flex gap-2 sm:gap-4 items-center">
            <Link
              href="/"
              className="hidden sm:inline-flex px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              Productos
            </Link>

            {mounted && role && role !== 'ADMIN' && (
              <span className="hidden md:inline-flex px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
                {role}
              </span>
            )}

            {mounted && !role && (
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

            {mounted && role && role !== 'ADMIN' && (
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Salir
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
