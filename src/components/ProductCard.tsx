import React, { useState } from 'react';
import { ShoppingCart, Plus, Eye } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import ProductModal from './ProductModal';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  item_code: string;
  image_url: string;
  category: string;
  subcategory?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="card group flex flex-col h-full relative cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <button 
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          className="absolute top-3 left-3 z-10 w-8 h-8 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 hover:scale-110 transition-all"
          title="Add to Cart"
        >
          <Plus size={18} />
        </button>
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
        {product.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-mono px-2 py-1 rounded-md">
          {product.item_code}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 dark:bg-[#222] text-gray-600 dark:text-gray-300 rounded-md">
            {product.category}
          </span>
          {product.subcategory && (
            <span className="text-xs font-medium px-2.5 py-1 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-md">
              {product.subcategory}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border-light)] dark:border-[var(--border-dark)]">
          <div className="font-bold text-xl text-red-600 dark:text-red-500">
            ₹{product.price.toLocaleString('en-IN')}
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className="btn-primary py-2 px-4 text-sm rounded-lg"
          >
            <ShoppingCart size={16} /> Add
          </button>
        </div>
      </div>
    </div>
    <ProductModal 
      product={product} 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
    />
    </>
  );
}
