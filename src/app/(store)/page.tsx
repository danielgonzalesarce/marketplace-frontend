import CategoryFilter from '@/components/CategoryFilter';
import ProductCard from '@/components/ProductCard';
import { Product, Category, ApiResponse } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/categories`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data: ApiResponse<Category[]> = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

async function getProducts(categoryId?: string): Promise<Product[]> {
  try {
    const url = categoryId
      ? `${API_URL}/products?categoryId=${categoryId}`
      : `${API_URL}/products`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    const data: ApiResponse<Product[]> = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ categoryId?: string }>;
}) {
  const { categoryId } = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(categoryId),
    getCategories(),
  ]);

  const selectedCategory = categories.find(
    (c) => String(c.id) === categoryId
  );

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-sm rounded-full">
              Marketplace de tecnología
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Encuentra los mejores productos
            </h1>
            <p className="text-lg text-indigo-100 leading-relaxed">
              Explora nuestro catálogo de electrónica, accesorios y equipos de computación con los mejores precios.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter
          categories={categories}
          selectedCategoryId={categoryId}
        />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {selectedCategory ? selectedCategory.nombre : 'Todos los productos'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {products.length} producto{products.length !== 1 ? 's' : ''} disponible{products.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-slate-600 font-medium mb-1">No hay productos disponibles</p>
            <p className="text-slate-400 text-sm">
              {categoryId
                ? 'Prueba seleccionando otra categoría'
                : 'Vuelve pronto para ver novedades'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
