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
import { supabase } from './lib/supabaseClient';
import type { User, Session } from '@supabase/supabase-js';

interface Todo {
  id: string;
  name: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // Auth
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, session: Session | null) => {
      setUser(session?.user ?? null);
    });

    // Fetch todos
    async function getTodos() {
      const { data, error } = await supabase.from('todos').select();
      if (error) console.log(error);
      if (data) setTodos(data);
    }

    getTodos();

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

          {/* Test Data */}
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.name}</li>
            ))}
          </ul>

        </Layout>
      </CartProvider>
    </ThemeProvider>
  );
}