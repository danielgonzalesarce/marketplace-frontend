export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">ProductStore</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Tu marketplace de confianza para productos de tecnología, electrónica y computación.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-indigo-400 transition-colors">
                  Catálogo de productos
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-indigo-400 transition-colors">
                  Iniciar sesión
                </a>
              </li>
              <li>
                <a href="/register" className="hover:text-indigo-400 transition-colors">
                  Crear cuenta
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Categorías
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-400">Electrónica</li>
              <li className="text-slate-400">Accesorios</li>
              <li className="text-slate-400">Computación</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} ProductStore. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
