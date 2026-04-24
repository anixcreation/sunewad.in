import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) throw new Error('Failed to send message');
      
      setStatus('success');
      setFormData({ name: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Get in touch with Sunewad Multiservices for inquiries, support, or custom quotes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card p-6 space-y-6">
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-[#ff0000] rounded-lg">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold">Address</h4>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Sunewad Multiservices<br />
                  Udgir, Maharashtra<br />
                  India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-[#ff0000] rounded-lg">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold">Phone</h4>
                <p className="text-gray-500 dark:text-gray-400 mt-1">+91 9420047039</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-[#ff0000] rounded-lg">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold">Email</h4>
                <p className="text-gray-500 dark:text-gray-400 mt-1">anishsunewad@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-[#ff0000] rounded-lg">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold">Business Hours</h4>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Mon - Sat: 10:00 AM - 5:00 PM<br />
                  Friday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="card p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="input-field"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea 
                  required
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="input-field resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="btn-primary w-full md:w-auto px-8"
              >
                {status === 'submitting' ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <><Send size={18} /> Send Message</>
                )}
              </button>

              {status === 'success' && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg text-sm">
                  Thank you! Your message has been sent successfully. We will get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                  Failed to send message. Please try again or contact us directly via phone.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
