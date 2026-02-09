'use client'
import { motion } from 'framer-motion';
import { CheckCircle, Mail, MapPin, MessageSquare, Phone, User } from 'lucide-react';
import { useState } from "react";

interface Form{ 
    nume: string,
    email: string,
    telefon: string,
    mesaj: string,
    termeni: boolean
}
type FormErrors = Partial<Record<keyof Form, string>>;

export default function Contact() {
    const fadeInUp: any = {
      hidden: { opacity: 0, y: 60 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    };

    const fadeInLeft: any = {
      hidden: { opacity: 0, x: -60 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    };

    const fadeInRight: any = {
      hidden: { opacity: 0, x: 60 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    };

    const staggerContainer: any = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2
        }
      }
    };

    const scaleIn: any = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    };

    const [formData, setFormData] = useState<Form>({
        nume: '',
        email: '',
        telefon: '',
        mesaj: '',
        termeni: false
    });
 
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);

    const validateForm = () => {
        const newErrors: FormErrors = {};

        if (!formData.nume.trim()) {
            newErrors.nume = 'Numele este obligatoriu';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {
            newErrors.email = 'Email-ul este obligatoriu';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Email invalid';
        }

        const phoneRegex = /^[0-9]{10}$/;

        if (!formData.telefon.trim()) {
            newErrors.telefon = 'Telefonul este obligatoriu';
        } else if (!phoneRegex.test(formData.telefon.replace(/\s/g, ''))) {
            newErrors.telefon = 'Telefon invalid (10 cifre)';
        }

        if (!formData.mesaj.trim()) {
            newErrors.mesaj = 'Mesajul este obligatoriu';
        }

        if (!formData.termeni) {
            newErrors.termeni = 'Trebuie să acceptați termenii și condițiile';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitted(true);
      
      setTimeout(() => {
        setFormData({
          nume: '',
          email: '',
          telefon: '',
          mesaj: '',
          termeni: false
        });
        setSubmitted(false);
      }, 3000);
    }
  };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target;
        const name = target.name as keyof Form;
        const value =
            target instanceof HTMLInputElement && target.type === "checkbox"
            ? target.checked
            : target.value;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
            ...prev,
            [name]: '', 
            }));
        }
    };

    return(
        <>
          <svg className="w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0 C300,80 600,80 900,40 C1050,20 1150,0 1200,0 L1200,120 L0,120 Z"
              fill="#fcefdf"
            />
          </svg>

          <section className="py-12 sm:py-16 lg:py-20 bg-[#fcefdf]">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className='flex justify-center flex-col items-center px-4 sm:px-6'
            >
              <motion.h1 
                variants={fadeInUp}
                className='text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6 text-center'
              >
                Cum te putem ajuta?
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className='mb-6 sm:mb-8 text-center max-w-2xl text-sm sm:text-base '
              >
                Indiferent dacă ai nevoie de asistență tehnică, informații despre produsele noastre sau de o consultanță personalizată, echipa noastră este pregătită să-ți răspundă
              </motion.p>
           
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 lg:mt-20">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"> 
                {/* Form Section */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInLeft}
                  className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 order-2 lg:order-1"
                >
                  {submitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                    >
                      <CheckCircle className="text-green-600 w-5 h-5 flex-shrink-0" />
                      <p className="text-green-800 font-medium text-sm sm:text-base">Mesajul a fost trimis cu succes!</p>
                    </motion.div>
                  )}

                  <div className="space-y-5 sm:space-y-6">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label htmlFor="nume" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4" />
                        Nume complet
                      </label>
                      <input
                        type="text"
                        id="nume"
                        name="nume"
                        value={formData.nume}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base ${
                          errors.nume ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Ion Popescu"
                      />
                      {errors.nume && <p className="mt-1 text-sm text-red-600">{errors.nume}</p>}
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="ion.popescu@email.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label htmlFor="telefon" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4" />
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="telefon"
                        name="telefon"
                        value={formData.telefon}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base ${
                          errors.telefon ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="0712345678"
                      />
                      {errors.telefon && <p className="mt-1 text-sm text-red-600">{errors.telefon}</p>}
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label htmlFor="mesaj" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <MessageSquare className="w-4 h-4" />
                        Mesaj
                      </label>
                      <textarea
                        id="mesaj"
                        name="mesaj"
                        value={formData.mesaj}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none text-sm sm:text-base ${
                          errors.mesaj ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Scrie-ne mesajul tău..."
                      />
                      {errors.mesaj && <p className="mt-1 text-sm text-red-600">{errors.mesaj}</p>}
                    </motion.div>

                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="termeni"
                          checked={formData.termeni}
                          onChange={handleChange}
                          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                        />
                        <span className="text-sm text-gray-700">
                          Sunt de acord cu{' '}
                          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium underline">
                            termenii și condițiile
                          </a>{' '}
                          site-ului
                        </span>
                      </label>
                      {errors.termeni && <p className="mt-1 text-sm text-red-600">{errors.termeni}</p>}
                    </div>

                    <motion.button 
                      onClick={handleSubmit}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative inline-flex items-center justify-center w-full py-4 sm:py-5 text-lg sm:text-xl font-bold text-white bg-[#e06251] rounded-lg overflow-hidden shadow-2xl hover:shadow-[#e06251]/50 transition-all duration-300"
                    >
                      <span className="relative z-10">Trimite mesajul</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#e06251] via-[#ff7d6b] to-[#e06251] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <svg
                        className="ml-3 w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Contact Info Section */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInRight}
                  className="order-1 lg:order-2 lg:sticky lg:top-8"
                >
                  <motion.div
                    variants={staggerContainer}
                    className="flex flex-col gap-6 sm:gap-8"
                  >
                    {[
                      { icon: Phone, title: "Telefon", info: "0740 123 456", href: "tel:0740123456" },
                      { icon: Mail, title: "Email", info: "contact@gratarul-dragomir.ro", href: "mailto:contact@gratarul-dragomir.ro" },
                      { icon: MapPin, title: "Locație", info: "Galați, România", href: "#" }
                    ].map((contact, idx) => (
                      <motion.a
                        key={idx}
                        href={contact.href}
                        variants={fadeInUp}
                        whileHover={{ y: -8, scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-center block group"
                      >
                        <motion.div 
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="bg-[#e06251] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:shadow-lg group-hover:shadow-[#e06251]/50 transition-shadow"
                        >
                          <contact.icon size={28} className="text-white sm:w-8 sm:h-8" />
                        </motion.div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#05140f] mb-2">{contact.title}</h3>
                        <p className="text-gray-700 text-sm sm:text-base break-words">{contact.info}</p>
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          <svg className="w-full h-12 sm:h-16 mb-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,120 C300,40 600,40 900,80 C1050,100 1150,120 1200,120 L1200,0 L0,0 Z"
              fill="#fcefdf"
            />
          </svg>
        </>
    )
}