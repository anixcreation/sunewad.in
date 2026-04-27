import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Configurator from './pages/Configurator';
import HddCalculator from './pages/HddCalculator';
import supabase from './lib/supabase';

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <ThemeProvider>
      <CartProvider>
        <Layout user={user}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/configurator" element={<Configurator />} />
            <Route path="/hdd-calculator" element={<HddCalculator />} />
            <Route path="/terms" element={<Terms />} />
          
          </Routes>
        </Layout>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
