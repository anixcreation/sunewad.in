import React from 'react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Terms & Conditions</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="card p-8 space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">1. Introduction</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Welcome to Sunewad Multiservices. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">2. Service Policy</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
            <li>All physical installations require an initial site survey and advance payment.</li>
            <li>Development services are subject to a separate milestone-based agreement.</li>
            <li>Online support services are billed on a per-incident or subscription basis.</li>
            <li>We reserve the right to refuse service to anyone for any reason at any time.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">3. Pricing and Payments</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">4. No Refund Policy</h2>
          <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-[#ff0000] p-4 rounded-r-lg">
            <p className="text-gray-700 dark:text-gray-200 font-medium">
              Sunewad Multiservices operates on a strict NO REFUND policy for all digital services, software development, and online support services once work has commenced or access has been granted.
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
            Physical hardware returns are subject to the original manufacturer's warranty and return policies. Any defective hardware must be reported within 48 hours of installation or delivery.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">5. Warranty</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Hardware warranties are provided directly by the respective manufacturers (e.g., Securus, Coreprix). Sunewad Multiservices acts only as an integrator/reseller and our installation warranty covers workmanship for 30 days from the date of completion.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">6. Contact Support</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            For any questions regarding these Terms & Conditions or to request support, please contact us at:
          </p>
          <div className="bg-gray-50 dark:bg-[#2a2a2a] p-4 rounded-lg mt-2 inline-block">
            <p className="font-medium">Anish Sunewad</p>
            <p>Email: anishsunewad@gmail.com</p>
            <p>Location: Sunewad Multiservices, Udgir, Maharashtra</p>
          </div>
        </section>
      </div>
    </div>
  );
}
