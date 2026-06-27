import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Product, ApiResponse } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data: ApiResponse<Product> = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 mb-8 transition-colors group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Volver al catálogo
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-72 lg:h-auto lg:min-h-[480px] bg-gradient-to-br from-indigo-50 to-slate-100">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.nombre}
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-24 h-24 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          <div className="p-8 lg:p-10 flex flex-col">
            {product.category && (
              <span className="inline-flex self-start px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-full mb-4">
                {product.category.nombre}
              </span>
            )}

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              {product.nombre}
            </h1>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-bold text-slate-900">
                S/ {Number(product.precio).toFixed(2)}
              </span>
              <span className="text-sm text-slate-400">PEN</span>
            </div>

            {product.descripcion && (
              <div className="mb-8 flex-1">
                <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
                  Descripción
                </h2>
                <p className="text-slate-600 leading-relaxed">{product.descripcion}</p>
              </div>
            )}

            <div className="mt-auto pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                </svg>
                SKU: #{product.id}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
