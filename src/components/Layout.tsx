import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Briefcase, Phone, FileText, Menu, X, Moon, Sun, LogIn, LogOut, User, ShoppingBag, ChevronDown, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { signInWithGoogle } from '../lib/googleAuth';
import supabase from '../lib/supabase';
import CartSidebar from './CartSidebar';

interface LayoutProps {
  children: React.ReactNode;
  user: any;
}

export default function Layout({ children, user }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Products', 
      href: '/products',
      dropdown: [
        { name: 'Securus', href: '/products?category=Securus' },
        { name: 'Coreprix', href: '/products?category=Coreprix' },
        { name: 'Accessories', href: '/products?category=Accessories' },
      ]
    },
    { 
      name: 'Services', 
      href: '/services',
      dropdown: [
        { name: 'Online Support', href: '/services#support' },
        { name: 'Development', href: '/services#development' },
        { name: 'Installation', href: '/services#installation' },
      ]
    },
    { 
      name: 'Tools', 
      href: '#',
      dropdown: [
        { name: 'System Configurator', href: '/configurator' },
        { name: 'HDD Backup Calculator', href: '/hdd-calculator' },
      ]
    },
    { name: 'Contact', href: '/contact' },
    { name: 'Terms', href: '/terms' },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const Header = () => (
    <>
      {/* Top Contact Bar */}
      <div className="bg-black text-gray-300 text-xs py-2 px-4 border-b border-[#222]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="tel:9420047039" className="flex items-center gap-1.5 hover:text-red-500 transition-colors font-medium">
              <Phone size={12} /> +91 9420047039
            </a>
            <a href="mailto:anishsunewad@gmail.com" className="flex items-center gap-1.5 hover:text-red-500 transition-colors font-medium">
              <Mail size={12} /> anishsunewad@gmail.com
            </a>
          </div>
          <div className="hidden sm:block text-red-500 font-bold tracking-wide">Professional CCTV Security Solutions</div>
        </div>
      </div>

      {/* Festival Offer Banner */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-white px-4 py-2 text-center text-sm font-medium relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
        <div className="relative z-10 flex items-center justify-center gap-2">
          <span className="animate-pulse">🎉</span>
          <span><strong>Special Offers:</strong> Get up to 20% off on all Securus CCTV Installation Packages!</span>
          <Link to="/contact" className="underline font-bold hover:text-red-200 transition-colors ml-2">Claim Now</Link>
        </div>
      </div>
      
      <header className="sticky top-0 z-50 w-full border-b border-[#222] bg-[#111111]/80 backdrop-blur-md text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-red-900/50 border border-red-500/30">
              S
            </div>
            <span className="font-bold tracking-tight text-lg hidden sm:block">Sunewad Multiservices</span>
            <span className="font-bold tracking-tight text-lg sm:hidden">Sunewad</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
              
              if (item.dropdown) {
                return (
                  <div key={item.name} className="relative group">
                    <Link
                      to={item.href}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive 
                          ? 'bg-red-600/10 text-red-500' 
                          : 'text-gray-300 hover:bg-[#222] hover:text-white'
                      }`}
                    >
                      {item.name}
                      <ChevronDown size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <div className="absolute top-full left-0 mt-1 w-48 bg-[#111] border border-[#333] rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                      <div className="py-2">
                        {item.dropdown.map(dropItem => (
                          <Link
                            key={dropItem.name}
                            to={dropItem.href}
                            className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#222] transition-colors"
                          >
                            {dropItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-red-600/10 text-red-500' 
                      : 'text-gray-300 hover:bg-[#222] hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg text-gray-400 hover:bg-[#222] hover:text-white transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-400 hover:bg-[#222] hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-[#333]">
                <div className="flex items-center gap-2">
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-7 h-7 rounded-full border border-[#444]" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#222] flex items-center justify-center">
                      <User size={14} className="text-gray-400" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-300 hidden lg:block">
                    {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-lg text-red-400 hover:bg-red-950/30 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => signInWithGoogle('Sunewad Multiservices')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors border border-white/10"
              >
                <LogIn size={16} />
                Sign in
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg text-gray-400 hover:bg-[#222] hover:text-white transition-colors"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-400 hover:bg-[#222] hover:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:bg-[#222] hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#222] bg-[#111] max-h-[80vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
              
              if (item.dropdown) {
                return (
                  <div key={item.name} className="space-y-1">
                    <div className="px-3 py-2 text-base font-medium text-gray-400 border-b border-[#222] mb-1">
                      {item.name}
                    </div>
                    {item.dropdown.map(dropItem => (
                      <Link
                        key={dropItem.name}
                        to={dropItem.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block pl-6 pr-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-[#222] hover:text-white"
                      >
                        {dropItem.name}
                      </Link>
                    ))}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive 
                      ? 'bg-red-600/10 text-red-500' 
                      : 'text-gray-300 hover:bg-[#222] hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="pt-4 pb-4 border-t border-[#222] px-4">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full border border-[#444]" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center">
                      <User size={16} className="text-gray-400" />
                    </div>
                  )}
                  <div className="text-sm font-medium text-white">
                    {user.user_metadata?.full_name || user.email}
                  </div>
                </div>
                <button
                  onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-red-950/30"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => { signInWithGoogle('Sunewad Multiservices'); setIsMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md bg-white/10 hover:bg-white/15 text-white font-medium border border-white/10"
              >
                <LogIn size={18} />
                Sign in with Google
              </button>
            )}
          </div>
        </div>
      )}
    </header>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-light)] dark:bg-[var(--bg-dark)]">
      <Header />
      <CartSidebar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-light)] dark:border-[var(--border-dark)] bg-[var(--card-light)] dark:bg-[#111] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
  <div className="flex items-center gap-2 font-bold text-lg">
    {/* Logo Container */}
    <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white overflow-hidden">
      <img 
        src="/favicon.svg" 
        alt="Sunewad Logo"
        className="w-full h-full object-contain p-1" 
      />
    </div>
    <span className="dark:text-white">Sunewad Multiservices</span>
  </div>
  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
    Premium security systems, IT hardware, and professional development services.
  </p>
</div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li><Link to="/products" className="hover:text-red-500 transition-colors">Products</Link></li>
                <li><Link to="/services" className="hover:text-red-500 transition-colors">Services</Link></li>
                <li><Link to="/contact" className="hover:text-red-500 transition-colors">Contact</Link></li>
                <li><Link to="/terms" className="hover:text-red-500 transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>Sunewad Multiservices</li>
                <li>Udgir, Maharashtra, India</li>
                <li>anishsunewad@gmail.com</li>
                <li>+91 9420047039</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[var(--border-light)] dark:border-[var(--border-dark)] text-sm text-gray-500 dark:text-gray-400 text-center">
            © {new Date().getFullYear()} Sunewad Multiservices. All rights reserved.
          </div>
           <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-right">
  powered by{" "}
  <a 
    href="https://www.instagram.com/anix.ac" 
    target="_blank" 
    rel="noopener noreferrer"
    className="hover:text-blue-500 transition-colors duration-200"
  >
    @anix.ac
  </a>
</div>
        </div>
      </footer>
    </div>
  );
}
