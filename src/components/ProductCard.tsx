import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative h-52 w-full bg-gradient-to-br from-indigo-50 to-slate-100 overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.nombre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-indigo-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {product.category && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold bg-white/90 backdrop-blur-sm text-indigo-700 rounded-full shadow-sm">
            {product.category.nombre}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h2 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {product.nombre}
        </h2>

        {product.descripcion && (
          <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">
            {product.descripcion}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          <span className="text-2xl font-bold text-slate-900">
            S/ {Number(product.precio).toFixed(2)}
          </span>
          <span className="text-sm font-medium text-indigo-600 group-hover:translate-x-0.5 transition-transform">
            Ver detalle →
          </span>
        </div>
      </div>
    </Link>
  );
}
