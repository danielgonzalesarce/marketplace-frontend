'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product, Category, ApiResponse } from '@/types/product';
import { API_URL, getAuthHeaders } from '@/lib/auth';

const inputClass =
  'w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm';

const emptyForm = {
  nombre: '',
  precio: '',
  descripcion: '',
  categoryId: '',
  imageUrl: '',
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`${API_URL}/products`),
        fetch(`${API_URL}/categories`),
      ]);

      const productsData: ApiResponse<Product[]> = await productsRes.json();
      const categoriesData: ApiResponse<Category[]> = await categoriesRes.json();

      if (productsData.success) setProducts(productsData.data);
      if (categoriesData.success) setCategories(categoriesData.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId
      ? `${API_URL}/products/${editingId}`
      : `${API_URL}/products`;
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify({
          nombre: formData.nombre,
          precio: parseFloat(formData.precio),
          descripcion: formData.descripcion || undefined,
          categoryId: formData.categoryId
            ? parseInt(formData.categoryId, 10)
            : undefined,
          imageUrl: formData.imageUrl || undefined,
        }),
      });

      if (res.ok) {
        setFormData(emptyForm);
        setEditingId(null);
        setShowForm(false);
        fetchData();
      } else {
        const data = await res.json();
        alert(data.message || 'Error al guardar producto');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      nombre: product.nombre,
      precio: product.precio.toString(),
      descripcion: product.descripcion || '',
      categoryId: product.categoryId?.toString() || '',
      imageUrl: product.imageUrl || '',
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) fetchData();
      else {
        const data = await res.json();
        alert(data.message || 'Error al eliminar');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="inline-flex items-center gap-3 text-slate-500">
          <svg className="animate-spin w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Cargando inventario...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Total productos</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Categorías</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{categories.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Acción rápida</p>
            <p className="text-sm font-medium text-slate-700 mt-1">Agregar producto</p>
          </div>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData(emptyForm);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            + Nuevo
          </button>
        </div>
      </div>

      {/* Form modal / panel */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-900">
              {editingId ? 'Editar producto' : 'Nuevo producto'}
            </h2>
            <button
              onClick={handleCancel}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre</label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Precio (S/)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.precio}
                      onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Categoría</label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className={inputClass}
                    >
                      <option value="">Sin categoría</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">URL de imagen</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className={inputClass}
                  />
                  <p className="text-xs text-slate-400 mt-1">Pega una URL pública de imagen (Unsplash, etc.)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Descripción</label>
                  <textarea
                    rows={3}
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all text-sm"
                  >
                    {editingId ? 'Guardar cambios' : 'Crear producto'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-5 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 text-sm font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </div>

              {/* Image preview */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Vista previa</label>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  {formData.imageUrl ? (
                    <Image
                      src={formData.imageUrl}
                      alt="Vista previa"
                      fill
                      className="object-cover"
                      unoptimized
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                      <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">Sin imagen</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Product grid */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Inventario de productos</h2>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 text-center py-16 px-6">
            <p className="text-slate-600 font-medium">No hay productos en el catálogo</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700"
            >
              Crear primer producto
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-xl border overflow-hidden transition-shadow hover:shadow-md ${
                  editingId === product.id ? 'border-indigo-400 ring-2 ring-indigo-100' : 'border-slate-200'
                }`}
              >
                <div className="relative h-40 bg-slate-100">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.nombre}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {product.category && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-medium bg-white/90 text-indigo-700 rounded-full">
                      {product.category.nombre}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 truncate">{product.nombre}</h3>
                  <p className="text-indigo-600 font-bold mt-1">
                    S/ {Number(product.precio).toFixed(2)}
                  </p>
                  {product.descripcion && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.descripcion}</p>
                  )}

                  <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
