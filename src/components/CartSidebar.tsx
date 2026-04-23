import React from 'react';
import { X, Minus, Plus, ShoppingBag, Send } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalItems, totalPrice } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    const phoneNumber = "919999999999";
    let message = "Hello, I would like to order the following items:\n\n";
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.item_code})\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n\n`;
    });
    
    message += `*Total Amount: ₹${totalPrice.toLocaleString('en-IN')}*`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed inset-y-0 right-0 z-50 w-full md:w-96 bg-[var(--bg-light)] dark:bg-[var(--sidebar-dark)] shadow-2xl flex flex-col transform transition-transform duration-300 border-l border-[var(--border-light)] dark:border-[#222]">
        <div className="p-4 border-b border-[var(--border-light)] dark:border-[#222] flex items-center justify-between bg-white dark:bg-[#111]">
          <div className="flex items-center gap-2 font-bold text-lg">
            <ShoppingBag size={20} className="text-red-600" />
            Your Cart ({totalItems})
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-[#222] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 space-y-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p>Your cart is empty</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 p-3 bg-white dark:bg-[#1a1a1a] rounded-xl border border-[var(--border-light)] dark:border-[#333]">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-[#222] flex-shrink-0">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                      {item.item_code}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="font-bold text-red-600 dark:text-red-500">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#222] rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white dark:hover:bg-[#333] text-gray-600 dark:text-gray-300"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white dark:hover:bg-[#333] text-gray-600 dark:text-gray-300"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-[var(--border-light)] dark:border-[#222] bg-white dark:bg-[#111] space-y-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-red-600 dark:text-red-500">₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="btn-primary w-full py-3 text-base"
            >
              <Send size={18} /> Send Order via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}