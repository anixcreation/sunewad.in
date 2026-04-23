import React from 'react';
import { Shield, Code, Headset, Monitor, Wifi, Database } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Shield,
      title: 'Security System Installation',
      description: 'Professional installation and configuration of CCTV, DVR, NVR, and IP Camera systems for residential and commercial spaces.',
      category: 'Physical Infrastructure'
    },
    {
      icon: Code,
      title: 'Web & App Development',
      description: 'Custom software solutions, e-commerce platforms, and mobile applications tailored to your business needs.',
      category: 'Digital Solutions'
    },
    {
      icon: Headset,
      title: 'Online Tech Support',
      description: 'Remote troubleshooting, system optimization, and technical support for your IT infrastructure.',
      category: 'Support'
    },
    {
      icon: Monitor,
      title: 'Hardware Setup & Maintenance',
      description: 'Assembly, installation, and regular maintenance of desktop computers, servers, and networking equipment.',
      category: 'Physical Infrastructure'
    },
    {
      icon: Wifi,
      title: 'Network Infrastructure',
      description: 'Design and implementation of robust local area networks (LAN), Wi-Fi setups, and secure routing solutions.',
      category: 'Physical Infrastructure'
    },
    {
      icon: Database,
      title: 'Data Recovery & Backup',
      description: 'Secure data backup solutions and recovery services for failed storage devices to protect your critical information.',
      category: 'Digital Solutions'
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold">Our Services</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Comprehensive technology solutions spanning from physical security installations to custom software development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="card p-8 group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 text-[#ff0000] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <service.icon size={28} />
            </div>
            <div className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">
              {service.category}
            </div>
            <h3 className="text-xl font-bold mb-4">{service.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <div className="card bg-gradient-to-br from-gray-900 to-black text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mt-12 border-none">
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold">Need a Custom Solution?</h2>
          <p className="text-gray-400">
            Don't see exactly what you're looking for? Contact us to discuss your specific requirements. Our team of experts is ready to architect a solution tailored to your needs.
          </p>
        </div>
        <a href="/contact" className="btn-primary whitespace-nowrap px-8 py-4 text-lg">
          Get in Touch
        </a>
      </div>
    </div>
  );
}
