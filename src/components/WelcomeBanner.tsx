'use client';

import { useEffect, useState } from 'react';
import { getStoredUser } from '@/lib/auth';
import { useMounted } from '@/hooks/useMounted';

export default function WelcomeBanner() {
  const mounted = useMounted();
  const [user, setUser] = useState<ReturnType<typeof getStoredUser>>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (mounted) {
      setUser(getStoredUser());
    }
  }, [mounted]);

  if (!mounted || !user || user.role === 'ADMIN' || !visible) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm text-emerald-800 truncate">
            <span className="font-semibold">¡Hola, {user.nombre}!</span>
            {' '}Has iniciado sesión correctamente.
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="p-1 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100 rounded-lg transition-colors shrink-0"
          aria-label="Cerrar mensaje"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
