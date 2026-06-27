'use client';

import { useRouter } from 'next/navigation';
import { Category } from '@/types/product';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId?: string;
}

export default function CategoryFilter({
  categories,
  selectedCategoryId,
}: CategoryFilterProps) {
  const router = useRouter();

  const handleSelect = (categoryId: string) => {
    if (categoryId) {
      router.push(`/?categoryId=${categoryId}`);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="mb-10">
      <p className="text-sm font-medium text-slate-500 mb-3">Filtrar por categoría</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleSelect('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            !selectedCategoryId
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
          }`}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleSelect(String(category.id))}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategoryId === String(category.id)
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
            }`}
          >
            {category.nombre}
          </button>
        ))}
      </div>
    </div>
  );
}
