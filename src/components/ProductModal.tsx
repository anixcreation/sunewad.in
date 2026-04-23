import React from 'react';
import { X, ShoppingCart, ShieldCheck, Truck, Clock } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface ProductModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#111] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] border border-gray-200 dark:border-[#333] animate-in fade-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
        >
          <X size={18} className="text-gray-900 dark:text-white" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-gray-100 dark:bg-[#0a0a0a] relative min-h-[300px]">
          {product.image_url ? (
            <img 
              src={product.image_url} 
              alt={product.name} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-xs font-mono px-3 py-1.5 rounded-lg shadow-lg">
            {product.item_code}
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col h-full overflow-hidden">
          <div className="flex items-center gap-2 mb-4 shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-gray-100 dark:bg-[#222] text-gray-600 dark:text-gray-300 rounded-md">
              {product.category}
            </span>
            {product.subcategory && (
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-md">
                {product.subcategory}
              </span>
            )}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white leading-tight shrink-0">
            {product.name}
          </h2>
          
          <div className="text-3xl font-bold text-red-600 dark:text-red-500 mb-6 shrink-0">
            ₹{product.price.toLocaleString('en-IN')}
          </div>

          {/* Scrollable Description Area */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar mb-6">
            <div className="prose prose-sm dark:prose-invert text-gray-600 dark:text-gray-400">
              <p className="whitespace-pre-line leading-relaxed">{product.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 shrink-0">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#222]">
              <ShieldCheck className="text-red-500" size={24} />
              <div className="text-sm font-medium">1 Year<br/><span className="text-gray-500 text-xs">Warranty</span></div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#222]">
              <Truck className="text-red-500" size={24} />
              <div className="text-sm font-medium">Fast<br/><span className="text-gray-500 text-xs">Delivery</span></div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100 dark:border-[#222] flex gap-4 shrink-0">
            <button 
              onClick={() => {
                addToCart(product);
                onClose();
              }}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-red-600/20"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}