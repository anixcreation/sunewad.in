import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Monitor, PenTool as Tool, Code, Headset, Zap, PlayCircle, Tag, CheckCircle2, Users, Trophy, Calculator, HardDrive } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts } from '../lib/product';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Direct Supabase call
        const data = await getFeaturedProducts();
        setFeaturedProducts(data || []);
      } catch (err) {
        console.error('Failed to fetch featured products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  
  const features = [
    { icon: Shield, title: 'Securus Cctv', desc: 'Advanced security & surveillance solutions' },
    { icon: Monitor, title: 'Coreprix Surveillance', desc: 'High-performance computing & networking' },
    { icon: Code, title: 'Development', desc: 'Custom software & website development' },
    { icon: Headset, title: 'Online Support', desc: 'Dedicated online tech support services' },
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative rounded-[2rem] overflow-hidden bg-[#111111] text-white p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-2xl border border-[#222] min-h-[600px]">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-30"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/80 to-transparent"></div>
        </div>

        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-900/20 rounded-full blur-[80px]"></div>
        </div>

        <div className="flex-1 space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Premium Security Solutions
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
            Protect What <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Matters Most</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
            Professional CCTV security systems, IT hardware, and dedicated support services for homes and businesses.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/products" className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center gap-2">
              Browse Catalog <ArrowRight size={20} />
            </Link>
            <Link to="/contact" className="bg-[#222] text-white border border-[#333] px-8 py-4 rounded-xl font-bold hover:bg-[#333] transition-colors">
              Get a Quote
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center z-10 w-full relative">
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-[#333] group">
            <img 
              src="/hero-camera.jpg" 
              alt="Security Camera" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <div className="text-white font-bold text-xl">Securus 5MP Series</div>
                <div className="text-gray-300 text-sm">Night Vision • Weatherproof</div>
              </div>
              <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">New</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Our Expertise</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">We deliver top-tier products and services across multiple technology domains.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="card p-6 flex flex-col items-center text-center space-y-4 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-900/10 transition-all duration-300">
              <div className="w-16 h-16 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-2xl flex items-center justify-center">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Configurator & Tools Banner */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* System Configurator Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-red-900 via-black to-[#111] text-white p-8 shadow-2xl border border-red-900/30 flex flex-col justify-between group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/20 rounded-full blur-3xl pointer-events-none group-hover:bg-red-600/30 transition-all"></div>
          
          <div className="relative z-10 flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/40 shrink-0">
              <Calculator size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold mb-2">System Configurator</h3>
              <p className="text-gray-300 text-sm">Build your custom CCTV requirements step-by-step and get instant quotes.</p>
            </div>
          </div>
          
          <Link to="/configurator" className="relative z-10 inline-flex items-center justify-center gap-2 bg-white text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all w-full">
            Open Configurator <ArrowRight size={18} />
          </Link>
        </div>

        {/* HDD Calculator Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#111] via-black to-gray-900 text-white p-8 shadow-2xl border border-gray-800 flex flex-col justify-between group">
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-600/20 transition-all"></div>
          
          <div className="relative z-10 flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
              <HardDrive size={32} className="text-gray-300" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold mb-2">HDD Backup Calculator</h3>
              <p className="text-gray-400 text-sm">Calculate exact storage requirements and backup days for your cameras.</p>
            </div>
          </div>
          
          <Link to="/hdd-calculator" className="relative z-10 inline-flex items-center justify-center gap-2 bg-[#222] border border-[#444] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#333] transition-all w-full">
            Calculate Storage <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* First Time Buyer Offer */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white p-8 md:p-12 shadow-2xl border border-[#333] flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-900/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex-1 space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm font-bold uppercase tracking-wider border border-red-500/20">
            <Tag size={14} /> New Customer Exclusive
          </div>
          <h3 className="text-3xl md:text-4xl font-extrabold">First Time Buyer?</h3>
          <p className="text-gray-400 text-lg max-w-xl">
            Get <span className="text-white font-bold">₹1,000 OFF</span> on your first complete CCTV installation package. Includes free site survey and 1-year maintenance!
          </p>
        </div>
        
        <div className="relative z-10 w-full md:w-auto flex flex-col items-center gap-3">
          <div className="bg-[#222] border border-[#444] px-6 py-3 rounded-xl font-mono text-xl font-bold tracking-widest text-white shadow-inner flex items-center justify-between w-full md:w-64">
            <span>SUNEWAD1K</span>
            <button 
              onClick={() => {
                navigator.clipboard.writeText('SUNEWAD1K');
                alert('Coupon code copied to clipboard!');
              }}
              className="text-gray-400 hover:text-white transition-colors"
              title="Copy Code"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </button>
          </div>
          <p className="text-sm text-gray-500">Apply code when contacting us on WhatsApp</p>
        </div>
      </section>

      {/* Offer Banner */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-red-600 to-red-800 text-white p-8 md:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-black/10 rounded-full blur-xl"></div>
        
        <div className="relative z-10 flex items-center gap-6">
          <div className="hidden md:flex w-20 h-20 bg-white/10 rounded-full items-center justify-center backdrop-blur-sm border border-white/20">
            <Tag size={40} className="text-white" />
          </div>
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-3xl font-bold">Special Festive Offer!</h3>
            <p className="text-red-100 text-lg">Get up to 20% off on complete Securus CCTV installation packages.</p>
          </div>
        </div>
        
        <div className="relative z-10 w-full md:w-auto text-center">
          <Link to="/contact" className="inline-block bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-1">
            Claim Offer Now
          </Link>
          <p className="text-xs text-red-200 mt-3">*Valid till end of the month. T&C apply.</p>
        </div>
      </section>

      {/* Demo Video Banner */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">See Our Systems in Action</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Watch demonstrations of our high-definition Securus cameras and professional installations.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Video 1 */}
          <div className="relative rounded-2xl overflow-hidden bg-black shadow-xl border border-[#222] group aspect-video">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
            >
              <source src="/demo-video.mp4" type="video/mp4" />
            </video>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col items-center justify-end p-6 text-center opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
              <h3 className="text-xl font-bold text-white mt-auto">Night Vision Demo</h3>
              <p className="text-gray-300 text-sm mt-1">Securus 5MP IP Camera</p>
            </div>
          </div>

          {/* Video 2 */}
          <div className="relative rounded-2xl overflow-hidden bg-black shadow-xl border border-[#222] group aspect-video">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
            >
              <source src="/hero-bg.mp4" type="video/mp4" />
            </video>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col items-center justify-end p-6 text-center opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
              <h3 className="text-xl font-bold text-white mt-auto">Professional Installation</h3>
              <p className="text-gray-300 text-sm mt-1">Commercial Setup Timelapse</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-red-600 font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">No featured products available at the moment.</p>
        )}
      </section>

      {/* Why Choose Us Section */}
      <section className="relative rounded-3xl overflow-hidden bg-[#111] text-white border border-[#222]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 md:p-16 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Why Choose Sunewad Multiservices?</h2>
              <p className="text-gray-400 text-lg">We don't just sell equipment; we provide complete peace of mind through professional implementation and dedicated support.</p>
            </div>
            
            <div className="space-y-6">
              {[
                { icon: Shield, title: 'Certified Equipment', desc: 'We only supply authentic, warranty-backed hardware from top brands.' },
                { icon: Users, title: 'Expert Technicians', desc: 'Our installation team is highly trained in modern security infrastructure.' },
                { icon: Headset, title: 'Priority Support', desc: 'Get fast resolution with our dedicated online and offline tech support.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center shrink-0 border border-red-500/30">
                    <item.icon size={20} className="text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[400px] hidden lg:block overflow-hidden group">
            <img 
              src="/why-us-camera.jpg" 
              alt="Smart Security Camera" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/80 to-transparent"></div>
            
            {/* Animated Scanning Line Effect */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="w-full h-1 bg-red-500/50 blur-[2px] animate-[scan_3s_ease-in-out_infinite]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-red-500/30 rounded-full animate-ping opacity-20"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-red-500/50 rounded-full animate-pulse opacity-40"></div>
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-md border border-[#333] p-6 rounded-2xl shadow-2xl max-w-xs">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <Trophy size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">1000+</div>
                  <div className="text-sm text-gray-400">Installations Completed</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-400 font-medium bg-green-400/10 px-3 py-1.5 rounded-lg w-fit">
                <CheckCircle2 size={16} /> 100% Client Satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
