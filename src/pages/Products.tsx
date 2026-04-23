import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Search, Filter } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Securus',
  'Coreprix',
  'Accessories',
  'Online Support Services',
  'Development',
  'Others'
];

const SUBCATEGORIES: Record<string, string[]> = {
  'Securus': ['All', 'DVR', 'NVR', 'IP Camera', 'Analog Cameras', 'Power Supply', 'Accessories'],
  'Coreprix': ['All', 'DVR', 'NVR', 'IP Camera', 'Analog Cameras', 'Power Supply', 'Accessories'],
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Reset subcategory when category changes
  useEffect(() => {
    setSelectedSubcategory('All');
  }, [selectedCategory]);

  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.item_code.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'All' || p.subcategory === selectedSubcategory;
    
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  const hasSubcategories = ['Securus', 'Coreprix'].includes(selectedCategory);

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Products & Solutions</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-3xl">
          Browse our extensive catalog of security systems, hardware, and digital services.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="card p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search products or item codes..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat 
                  ? 'bg-[#ff0000] text-white' 
                  : 'bg-gray-100 dark:bg-[#2a2a2a] hover:bg-gray-200 dark:hover:bg-[#333]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {hasSubcategories && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-light)] dark:border-[var(--border-dark)]">
            <div className="w-full text-sm font-medium text-gray-500 flex items-center gap-2 mb-1">
              <Filter size={14} /> Subcategories
            </div>
            {SUBCATEGORIES[selectedCategory]?.map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedSubcategory === sub 
                    ? 'bg-gray-800 text-white dark:bg-gray-200 dark:text-black' 
                    : 'bg-gray-100 dark:bg-[#2a2a2a] hover:bg-gray-200 dark:hover:bg-[#333]'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff0000]"></div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 card">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your filters or search query.</p>
          <button 
            onClick={() => { setSearch(''); setSelectedCategory('All'); }}
            className="mt-4 text-[#ff0000] font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
import { Package } from 'lucide-react';
