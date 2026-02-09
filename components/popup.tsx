'use client';

import { useEffect, useState } from 'react';

export default function PartnerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    termsAccepted: false,
  });

  useEffect(() => {
    // Check if modal has been shown before
    const hasSeenModal = localStorage.getItem('hasSeenPartnerModal');
    
    if (!hasSeenModal) {
      // Small delay before showing modal for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
        setIsAnimating(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsOpen(false);
      // Mark modal as seen
      localStorage.setItem('hasSeenPartnerModal', 'true');
    }, 300);
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Logic to send data to your backend goes here
    console.log('Form Submitted:', formData);
    
    // Close modal and reset form
    setFormData({ fullName: '', email: '', phone: '', termsAccepted: false });
    alert('Cererea a fost trimisă cu succes!');
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black p-4 transition-opacity duration-300 mt-20 ${
          isAnimating ? 'bg-black/70' : 'bg-transparent'
        }`}
        onClick={closeModal}
      >
        {/* Modal Content */}
        <div 
          className={`bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden transform transition-all duration-300 ${
            isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative amber accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"></div>
          
          {/* Header */}
          <div className="px-6 pt-6 pb-4 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200 rounded-full p-1 hover:bg-gray-100"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Devino Partener
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Alătură-te echipei noastre de parteneri
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
            
            {/* Full Name */}
            <div className="animate-slideIn" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                Nume Complet
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 hover:border-gray-300"
                placeholder="Ion Popescu"
              />
            </div>

            {/* Email */}
            <div className="animate-slideIn" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 hover:border-gray-300"
                placeholder="exemplu@email.com"
              />
            </div>

            {/* Phone */}
            <div className="animate-slideIn" style={{ animationDelay: '0.3s' }}>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Număr de Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 hover:border-gray-300"
                placeholder="07xx xxx xxx"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start pt-2 animate-slideIn" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center h-5 mt-1">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  required
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="w-5 h-5 border-2 border-gray-300 rounded bg-white focus:ring-2 focus:ring-amber-500 text-amber-600 cursor-pointer transition-all"
                />
              </div>
              <label htmlFor="termsAccepted" className="ml-3 text-sm text-gray-700 cursor-pointer">
                Sunt de acord cu{' '}
                <a href="#" className="text-amber-600 hover:text-amber-700 font-semibold hover:underline transition-colors">
                  termenii și condițiile
                </a>
                .
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-bold rounded-xl text-base px-6 py-3.5 text-center mt-6 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 animate-slideIn"
              style={{ animationDelay: '0.5s' }}
            >
              Trimite Cererea
            </button>

            {/* Close text link */}
            <button
              type="button"
              onClick={closeModal}
              className="w-full text-gray-500 hover:text-gray-700 text-sm font-medium mt-3 transition-colors animate-slideIn"
              style={{ animationDelay: '0.6s' }}
            >
              Nu acum, mulțumesc
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
}